import React, { useEffect, useState, useRef } from "react";
import displaySlice from "../../../features/Display/displaySlice";
import { useDispatch, useSelector } from "react-redux";
import { PackageShipment, ShipmentReject } from "../../../components";
import packageSlice from "../../../features/order/packageSlice";
import { packageSelector } from "../../../selectors/consumerSelector";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { CaretCircleLeft, Upload } from "phosphor-react";
import { ICON_SIZE_EXTRA_LARGE } from "../../../utils/constraint";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useToken from "../../../hooks/useToken";
import { handleInsertHistoryDelivery } from "../../../services/HistoryServices";

function PackageShipmentDetail(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pkgSlice = useSelector(packageSelector);
  const [showShipmentReceive, setShipmentReceive] = useState(false);
  const [showShipmentReject, setShipmentReject] = useState(false);
  const { userPayload } = useToken();
  const [reasonReject, setReasonReject] = useState("Cannot contact");

  /* MAP */
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8",
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return "";
  } else {
    dispatch(displaySlice.actions.displaySidebar(false));
    dispatch(displaySlice.actions.displayHeader(false));
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  const handleNavigateShipper = () => {
    navigate("/shipper");
  };

  const center = {
    lat: 59.95,
    lng: 30.33,
  };

  const handleConfirmDelivery = async (action) => {
    const formData = {
      order_id: pkgSlice.packageDetails.orders.order_id,
      branch_id: userPayload.branch.branch_id,
      input_by: userPayload.userID,
      state: "",
      image: "",
      shipper_code: userPayload.userID,
      money_collect: pkgSlice.packageDetails.orders.total_cost,
      reason_reject: reasonReject,
    };

    if (action == "confirm") {
      formData.state = "confirm";
      formData.reason_reject = null;
    } else {
      formData.state = "Reject";
      formData.money_collect = 0;
      formData.reason_reject = reasonReject;
    }

    try {
      const checkInsert = await handleInsertHistoryDelivery(formData);
      if (checkInsert.status == 200) {
        toast.success("Action success");
        navigate("/shipper");
      } else {
        toast.error("Action failed");
      }
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <>
      <div className="package_shipment_detail">
        <div className="receive_procedure_container">
          {showShipmentReceive && !showShipmentReject && (
            <section>
              <button className="button_go_back">
                <CaretCircleLeft
                  onClick={() => setShipmentReceive(false)}
                  size={35}
                />
              </button>
              <h5>Please take a evidence photo</h5>
              <dd>
                Please take a photo with customer to evident that they received
              </dd>
              <div className="evident_photo_container flex-center-center">
                <label htmlFor="evident_photo">
                  <Upload size={ICON_SIZE_EXTRA_LARGE} />
                </label>
                <input
                  id="evident_photo"
                  type="file"
                  hidden
                  accept=".jpg,.jpeg,.png"
                />
              </div>
              <button
                onClick={() => handleConfirmDelivery("confirm")}
                className="shipment_confirm_button button button_primary"
              >
                CONFIRM
              </button>
            </section>
          )}
          {!showShipmentReceive && showShipmentReject && (
            <ShipmentReject
              setReasonReject={setReasonReject}
              reasonReject={reasonReject}
              callback={() => handleConfirmDelivery("reject")}
              setShipmentReceive={setShipmentReceive}
              setShipmentReject={setShipmentReject}
            />
          )}
        </div>
        {!showShipmentReceive && !showShipmentReject && (
          <>
            <div className="map_container">
              <CaretCircleLeft
                onClick={handleNavigateShipper}
                className="map_container_icon button_go_back"
                size={35}
              />
              <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
                onLoad={(map) => setMap(map)}
              >
                <Marker position={center} />
                {directionsResponse && (
                  <DirectionsRenderer directions={directionsResponse} />
                )}
              </GoogleMap>
            </div>
            <div className="info_package">
              <PackageShipment
                hideLocation={true}
                packageInfo={pkgSlice.packageDetails}
              />
            </div>
            <div className="action_button">
              <button
                onClick={() => setShipmentReject(true)}
                className="button"
              >
                Reject
              </button>
              <button
                onClick={() => setShipmentReceive(true)}
                className="button button_primary"
              >
                Receive
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PackageShipmentDetail;

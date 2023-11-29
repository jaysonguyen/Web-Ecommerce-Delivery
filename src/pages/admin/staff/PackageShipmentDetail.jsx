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

function PackageShipmentDetail(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pkgSlice = useSelector(packageSelector);
  const [showShipmentReceive, setShipmentReceive] = useState(false);
  const [showShipmentReject, setShipmentReject] = useState(false);

  const [formData, setFormData] = useState({
    order_id: pkgSlice.packageDetails.orders.order_id,
    branch_id: "",
    data_time: "",
    input_by: pkgSlice.packageDetails.orders.shipper_code,
    state: "",
    image: null,
    shipper_code: pkgSlice.packageDetails.orders.shipper_code,
    money_collect: pkgSlice.packageDetails.orders.collect_money || 0,
  });

  const handleNavigateShipper = () => {
    navigate("/shipper");
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleConfirmReceive = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const checkInsert = await axios.post(
        "http://localhost:8080/api/history/delivery",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(checkInsert);

      if (checkInsert.status == 200) {
        await toast.success("Received!");
        await navigate("/shipper");
      }

      console.log("Delivery history created successfully.");
    } catch (error) {
      console.error("Error creating delivery history:", error);
    }
  };

  useEffect(() => {
    dispatch(displaySlice.actions.displaySidebar(false));
    dispatch(displaySlice.actions.displayHeader(false));
  }, []);

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
                  onChange={handleImageChange}
                  accept=".jpg,.jpeg,.png"
                />
              </div>
              <button
                onClick={handleConfirmReceive}
                className="shipment_confirm_button button button_primary"
              >
                CONFIRM
              </button>
            </section>
          )}
          {!showShipmentReceive && showShipmentReject && (
            <ShipmentReject
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
              {/* <GoogleMap
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
              </GoogleMap> */}
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

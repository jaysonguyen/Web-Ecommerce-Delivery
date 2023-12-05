import React, { useEffect } from "react";
import { MapPin, Phone, PaperPlaneTilt } from "phosphor-react";

import {
  ICON_SIZE_BIG,
  ICON_SIZE_EXTRA_LARGE,
} from "../../../utils/constraint";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import packageSlice from "../../../features/order/packageSlice";

function PackageShipment({ packageInfo = {}, hideLocation }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoDetails = async () => {
    await dispatch(packageSlice.actions.setPackageDetail({ ...packageInfo }));
    navigate("/shipper/order/detail");
  };

  return (
    <div className="package_item row">
      <div className="col col-9">
        <span className="flex-center-between">
          <span className="shipper_page_package_id">
            ID: {packageInfo?.orders?.order_code || "Default Value"}
          </span>
          <span
            className={
              (packageInfo?.orders?.action_code == 0 &&
                "shipper_page_package_status status_shipping") ||
              (packageInfo?.orders?.action_code == 1 &&
                "shipper_page_package_status status_shipping") ||
              (packageInfo?.orders?.action_code == 2 &&
                "shipper_page_package_status status_receive")
            }
          >
            {(packageInfo?.orders?.action_code == 0 && "Shipping") ||
              (packageInfo?.orders?.action_code == 1 && "Reject") ||
              (packageInfo?.orders?.action_code == 2 && "Receive")}
          </span>
        </span>
        <h6 className="font-weight-b">{packageInfo.customerName}</h6>
        <span className="shipper_page_address">
          <MapPin size={ICON_SIZE_BIG} weight="fill" />
        </span>
        <h6 className="font-weight-b shipper_page_cost">
          Cost:
          <span>
            {packageInfo ? packageInfo?.orders?.total_cost : "No collect"}$
          </span>
        </h6>
      </div>
      <div className="col col-3">
        <a
          href="tel:0348393928"
          className="shipper_detail_icon shipper_detail_icon_call flex-center-center"
        >
          <Phone size={ICON_SIZE_EXTRA_LARGE} />
        </a>
        {!hideLocation && (
          <div
            onClick={handleGoDetails}
            className="shipper_detail_icon flex-center-center"
          >
            <PaperPlaneTilt size={ICON_SIZE_EXTRA_LARGE} weight="fill" />
          </div>
        )}
      </div>
    </div>
  );
}

export default PackageShipment;

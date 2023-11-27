import { CaretCircleLeft } from "phosphor-react";
import React from "react";

function ShipmentReject({ setShipmentReceive, setShipmentReject }) {
  const handleSetCloseReject = () => {
    setShipmentReceive(false);
    setShipmentReject(false);
  };
  return (
    <div className="shipmentReject_container">
      <button className="button_go_back">
        <CaretCircleLeft onClick={handleSetCloseReject} size={35} />
      </button>
      <h3>Please enter reason reject</h3>
      <ul>
        <li>
          <input type="checkbox" />
          <label>Cannot contact</label>
        </li>
        <li>
          <input type="checkbox" />
          <label>Make another date</label>
        </li>
      </ul>

      <button className="button button_primary action_button">Submit</button>
    </div>
  );
}

export default ShipmentReject;

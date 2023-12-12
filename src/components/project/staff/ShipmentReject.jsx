import { CaretCircleLeft } from "phosphor-react";
import React, { useState } from "react";

function ShipmentReject({
  setShipmentReceive,
  setShipmentReject,
  callback,
  setReasonReject,
  reasonReject,
}) {
  const [checked, setChecked] = useState([true, false]);

  const handleSetCloseReject = () => {
    setShipmentReceive(false);
    setShipmentReject(false);
  };

  const handleOnchangeCheckReasonReject = (reason) => {
    if (reason == "cannot contact") {
      setChecked([true, false]);
    } else {
      setChecked([false, true]);
    }
    setReasonReject(reason);
  };

  const handleSubmitReject = async () => {
    await callback();
  };

  return (
    <div className="shipmentReject_container">
      <button className="button_go_back">
        <CaretCircleLeft onClick={handleSetCloseReject} size={35} />
      </button>
      <h3>Please enter reason reject</h3>
      <ul>
        <li>
          <input
            onChange={() => handleOnchangeCheckReasonReject("cannot contact")}
            value={"Cannot contact"}
            checked={checked[0]}
            type="checkbox"
          />
          <label>Cannot contact</label>
        </li>
        <li>
          <input
            onChange={() =>
              handleOnchangeCheckReasonReject("Make another date")
            }
            checked={checked[1]}
            value={"Make another date"}
            type="checkbox"
          />
          <label>Make another date</label>
        </li>
      </ul>

      <button
        onClick={handleSubmitReject}
        className="button button_primary action_button"
      >
        Submit
      </button>
    </div>
  );
}

export default ShipmentReject;

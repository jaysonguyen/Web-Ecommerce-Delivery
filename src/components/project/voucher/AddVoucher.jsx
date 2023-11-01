import React, { useState } from "react";
import Input from "../../template/Input/Input";
import toast from "react-hot-toast";
import { createVoucher, insertVoucher } from "../../../services/VoucherService";

function AddVoucher(props) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [status, setStatus] = useState("");
  const [quantity, setQuantity] = useState("");
  const [period, setPeriod] = useState("");
  const [used, setUsed] = useState("");
  const handleNameOnChange = (e) => {
    setName(e.target.value);
  };

  const handleCostChange = (e) => {
    setCost(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const handleUsedChange = (e) => {
    setUsed(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleInsertVoucher = async () => {
    try {
      const insertInfor = {
        name: name,
        cost: cost,
        status: status,
        quantity: quantity,
        period: period,
        used: used,
      };

      const checkInsert = await insertVoucher(insertInfor);
      if (checkInsert != 200) {
        toast.error("insert failed");
      } else {
        toast.success("Insert success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add_staff_container">
      <div className="row">
        <div className="col col-6">
          <Input onChange={handleNameOnChange} label={"Voucher name"} />
        </div>
        <div className="col col-6">
          <Input onChange={handleCostChange} label={"Cost"} />
        </div>
        <div className="col col-6">
          <Input onChange={handleQuantityChange} label={"Quantity"}  type="number"/>
        </div>
        <div className="col col-6">
          <Input onChange={handlePeriodChange} label={"Period"} />
        </div>
        <div className="col col-6">
          <Input onChange={handleUsedChange} label={"Used"} />
        </div>
        <div className="col col-6">
          <Input onChange={handleStatusChange} label={"Status"} />
        </div>
      </div>
      <button onClick={handleInsertVoucher} className="btnAdd">
        Add
      </button>
    </div>
  );
}

export default AddVoucher;

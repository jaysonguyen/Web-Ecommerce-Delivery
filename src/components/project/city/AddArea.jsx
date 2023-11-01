import React, { useState } from "react";
import "../../../assets/css/Pages/customer.css";
import Input from "../../template/Input/Input";
import { Radio, X, PlusCircle } from "phosphor-react";
import toast from "react-hot-toast";
import { insertArea } from "../../../services/AreaService";
function AddArea({ showAdd = (v) => {}, cityId = "" }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  const handleSubmit = async () => {
    try {
      let res = await insertArea({
        code: code,
        name: name,
        des: des,
        city: cityId,
      });
      if (res === 200) {
        toast.success("Create area successfully");
        showAdd(false);
      } else {
        toast.error("Please try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("Please try again");
    }
  };

  return (
    <div className="">
      <div className="full_add_customer_page">
        <div className="header_add_customer_page">
          <button className="btnClose" onClick={() => showAdd(false)}>
            <X size={32} />
          </button>
          <div className="title_add_cus">
            <h3>Add a new area</h3>
          </div>
          <button className="btnSave" onClick={handleSubmit}>
            Save
          </button>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col-10">
            <div className="basic_info_cus">
              <h4 className="title_info_frame">Basic info</h4>
              <div className="name_cus">
                <div className="row">
                  <div className="col-6">
                    <Input
                      label={"Code"}
                      placeholder={"Enter area's code"}
                      onChange={(v) => setCode(v.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      label={"Area Name"}
                      placeholder={"Enter area's name"}
                      onChange={(v) => setName(v.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="info_phone_emailaddress">
                <div className="row">
                  <div className="col">
                    <Input
                      label={"Area Description"}
                      placeholder={"Enter area's description"}
                      onChange={(v) => setDes(v.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default AddArea;

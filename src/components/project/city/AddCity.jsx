import React, { useState } from "react";
import "../../../assets/css/Pages/customer.css";
import Input from "../../template/Input/Input";
import { Radio, X, PlusCircle } from "phosphor-react";
import { Link } from "react-router-dom";
import { Dropdown } from "../../index";
import { createCity, insertCity } from "../../../services/CityService";
import toast from "react-hot-toast";
function AddCity({ showAdd = (v) => {} }) {
  const itemDropDown = [
    {
      content: "Male",
    },
    {
      content: "Female",
    },
    {
      content: "None-binary",
    },
    {
      content: "Frefer not to say",
    },
  ];
  const itemBank = [
    {
      content: "Vietcombank",
    },
    {
      content: "Techcombank",
    },
    {
      content: "CB Bank",
    },
    {
      content: "VietTinBank",
    },
  ];

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  const handleSubmit = async () => {
    try {
      let res = await insertCity({
        code: code,
        name: name,
        des: des,
      });
      if (res === 200) {
        toast.success("Create city successfully");
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
            <h3>Add a new city</h3>
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
                      placeholder={"Enter city's code"}
                      onChange={(v) => setCode(v.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      label={"City Name"}
                      placeholder={"Enter city's name"}
                      onChange={(v) => setName(v.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="info_phone_emailaddress">
                <div className="row">
                  <div className="col">
                    <Input
                      label={"City Description"}
                      placeholder={"Enter city's description"}
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

export default AddCity;

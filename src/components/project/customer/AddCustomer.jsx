import React, { useState } from "react";
import "../../../assets/css/Pages/customer.css";
import Input from "../../template/Input/Input";
import { Radio, X, PlusCircle } from "phosphor-react";
import { Link } from "react-router-dom";
import { Dropdown } from "../../index";
import { createUser, insertUser } from "../../../services/UserService";
import toast from "react-hot-toast";
function AddCustomer({ showAdd = (v) => {} }) {
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

  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [phone, setPhone] = useState("");
  const [des, setDes] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      let res = await insertUser({
        fullName: name,
        account: account,
        email: email,
        phone: phone,
        des: des,
        password: password,
        role: "2",
      });
      if (res) {
        toast.success("Create user successfully");
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
            <h3>Add a new client</h3>
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
                      label={"Name"}
                      placeholder={"Enter client's first name"}
                      onChange={(v) => setName(v.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      label={"Account"}
                      placeholder={"Enter client's last name"}
                      onChange={(v) => setAccount(v.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="info_phone_emailaddress">
                <div className="row">
                  <div className="col-6">
                    <Input
                      type="tel"
                      label={"Phone number"}
                      placeholder={"Enter client's phone number"}
                      onChange={(v) => setPhone(v.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      type="email"
                      label={"Email address"}
                      placeholder={"Enter client's email address   "}
                      onChange={(v) => setEmail(v.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="info_phone_emailaddress">
                <div className="row">
                  <div className="col-6">
                    <Input
                      type="password"
                      label={"Password"}
                      placeholder={"Enter client's phone number"}
                      onChange={(v) => setPassword(v.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      type="password"
                      label={"Confirm Password"}
                      placeholder={"Enter client's email address   "}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <Dropdown
                    placeholder="Select an option"
                    label="Gender"
                    item={itemDropDown}
                  />
                </div>
                <div className="col-6">
                  <Input
                    label={"Date of birth"}
                    placeholder={"Day and Month"}
                    type={"date"}
                  />
                </div>
              </div>
              <Dropdown
                placeholder="Choose a bank"
                label="Bank"
                item={itemBank}
              />
              <div>
                <h4 className="title_info_frame">Address</h4>

                <Link className="add_new_address">
                  <p className="icon_add_new">
                    <PlusCircle size={32} />
                  </p>
                  <p className="text_add_new">Add new address</p>{" "}
                </Link>
              </div>
              <div></div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default AddCustomer;

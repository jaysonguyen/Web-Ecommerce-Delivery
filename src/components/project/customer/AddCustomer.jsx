import React, { useState } from "react";
import "../../../assets/css/Pages/customer.css";
import Input from "../../template/input/Input";
import { Radio, X, PlusCircle } from "phosphor-react";
import { Link } from "react-router-dom";
import { Dropdown } from "../../index";
function AddCustomer(props) {
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
  const [des, setDes] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const user = {
      fullName: name,
      des: des,
      email: email,
      password: password,
      role: "2",
    };
  };

  return (
    <div className="padding-body">
      <div className="full_add_customer_page">
        <div className="header_add_customer_page">
          <Link
            to="/customer/account"
            className="go_back_login text_decoration_none"
          >
            <button className="btnClose">
              <X size={32} />
            </button>
          </Link>
          <div className="title_add_cus">
            <h3>Add a new client</h3>
          </div>
          <button className="btnSave">Save</button>
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
                      label={"First name"}
                      placeholder={"Enter client's first name"}
                      onChange={setName}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      label={"Last name"}
                      placeholder={"Enter client's last name"}
                    />
                  </div>
                </div>
              </div>
              <div className="info_phone_emailaddress">
                <div className="row">
                  <div className="col-6">
                    <Input
                      label={"Phone number"}
                      placeholder={"Enter client's phone number"}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      label={"Email address"}
                      placeholder={"Enter client's email address   "}
                      onChange={setEmail}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col -6">
                  <Dropdown
                    placeholder="Select an option"
                    label="Gender"
                    item={itemDropDown}
                  />
                </div>
                <div className="col -6">
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
              <div>
              
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default AddCustomer;

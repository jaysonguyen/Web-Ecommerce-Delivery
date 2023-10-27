import React, { useState } from "react";
import { MyTable } from "../../components/template/table/MyTable/MyTable";
import { Dropdown, DetailCustomer } from "../../components/index";
import { Link } from "react-router-dom";
import "../../assets/css/Pages/customer.css";

function Customer(props) {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [userSelected, setUserSelected] = useState({});

  const handleShowDetail = async (data) => {
    await setUserSelected(data);
    await setIsShowDetail(true);
  };
  const handleCloseDetail = () => {
    setIsShowDetail(false);
  };

  const items = [
    {
      name: "Nguyễn Ngọc Thảo My",
      phone: "0902637839",
      email: "thaomy@gmail.com",
      reviews: "okela",
      sales: 8000000,
    },
  ];

  const itemOptions = [
    {
      content: "Export as Excel",
    },
    {
      content: "Import clients",
    },
  ];

  return (
    <div className="padding-body">
      {!isShowDetail && (
        <>
          <div className="header_of_customer">
            <div className="row">
              <div className="col-8">
                <div className="header_bar_left_Cus ">
                  <div className="title_total_number_Cus">
                    <h3 className="title_Cus">Clients list </h3>
                    <p className="total_number_Cus">{items.length}</p>
                  </div>
                  <p className="introduce_Cus">
                    View, add, edit and delete your client's details.{" "}
                  </p>
                </div>
              </div>

              <div className="col-4">
                <div className="feature_of_customer">
                  <div className="option_dropdown">
                    <Dropdown placeholder="Options" item={itemOptions} />
                  </div>
                  <Link to="/customer/add">
                    <button className="btnAdd">Add client</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <MyTable
            list={items}
            showCheckBox={true}
            callback={handleShowDetail}
          />
        </>
      )}

      {isShowDetail && (
        
          <DetailCustomer
            closeDetail={handleCloseDetail}
            userSelected={userSelected}
          />
        
      )}
    </div>
  );
}

export default Customer;

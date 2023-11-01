import React, { useEffect, useState } from "react";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import { getProductTypeList } from "../../../services/ProductType";
import { CaretLeft } from "phosphor-react";
import AddProductType from "../../../components/project/order/AddProductType";
import { ICON_SIZE_BIG } from "../../../utils/constraint";

function ProductType(props) {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [typeList, setTypeList] = useState([]);
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  const getTypeList = async () => {
    try {
      const data = await getProductTypeList();
      if (data != null) {
        console.log(data);
        console.log(data.data);
        setTypeList(data.data);
      }
    } catch (error) {
      return error;
    }
  };

  const handleClearInput = () => {
    setDes("");
    setName("");
  };
  const handleDisplayInsertProductType = () => {
    getTypeList();
    setIsShowAdd(false);
    handleClearInput();
  };
  useEffect(() => {
    getTypeList();
  }, [isShowAdd]);
  return (
    <div className="padding-body">
      {!isShowAdd && (
        <>
          <div className="header_of_customer">
            <div className="row">
              <div className="col-8">
                <div className="header_bar_left_Cus ">
                  <div className="title_total_number_Cus">
                    <h3 className="title_Cus">Product Type List </h3>
                    <p className="total_number_Cus">{typeList.length}</p>
                  </div>
                  <p className="introduce_Cus">
                    View, add, edit and delete your client's details.{" "}
                  </p>
                </div>
              </div>

              <div className="col-4">
                <div className="feature_of_customer">
                  <button className="btnAdd" onClick={() => setIsShowAdd(true)}>
                    Add product type
                  </button>
                </div>
              </div>
            </div>
          </div>
          <MyTable showCheckBox={true} list={typeList} hideDetails={true} />
        </>
      )}
        {isShowAdd && (
        <div className="add_branch_container">
          <div
            className="go_back_button_container"
            onClick={handleDisplayInsertProductType}
          >
            <CaretLeft size={ICON_SIZE_BIG} />
          </div>
          <h3>Add Product Type</h3>
          <AddProductType
            clearInput={handleDisplayInsertProductType}
            setName={setName}
            name={name}
            setDes={setDes}
            des={des}
          />
        </div>
      )}

    </div>
  );
}

export default ProductType;

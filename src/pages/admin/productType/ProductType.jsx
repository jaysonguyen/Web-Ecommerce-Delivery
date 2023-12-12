import React, { useEffect, useState } from "react";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import { getProductTypeList, uploadFile } from "../../../services/ProductType";
import { CaretLeft, Plus } from "phosphor-react";
import AddProductType from "../../../components/project/order/AddProductType";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import { tableSelector } from "../../../selectors/consumerSelector";
import { useDispatch, useSelector } from "react-redux";
import tableSlice from "../../../features/table/tableSlice";
import { deleteProductType } from "../../../services/ProductType";
import toast from "react-hot-toast";
import { UploadFileButton } from "../../../components/template/button/upload_file_button";
import { MyButton } from "../../../components";

function ProductType(props) {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [typeList, setTypeList] = useState([]);
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const tableData = useSelector(tableSelector);
  const dispatch = useDispatch();

  const getTypeList = async () => {
    try {
      const data = await getProductTypeList();
      if (data != null) {
        setTypeList(data.data);
      }
    } catch (error) {
      return error;
    }
  };

  const handleFormSubmit = async (e, file) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadFile(formData);

      // Handle the response as needed
      if (res.status === 200) {
        toast.success("Upload file successfully");
        getTypeList();
      } else {
        toast.error("Upload file failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
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
    dispatch(tableSlice.actions.handleSelected([]));
    getTypeList();
  }, [isShowAdd]);

  const handleDelete = async () => {
    let list = [...tableData.selectList];
    if (list.length === 0) {
      toast.error("Choose item to delete");
      return;
    }
    for (let i = 0; i < list.length; i++) {
      let res = await deleteProductType(list[i].id);
      if (!res) {
        toast.error("Something went wrong");
        return;
      }
    }
    toast.success("Deleted successfully");
    dispatch(tableSlice.actions.handleSelected([]));
    getTypeList().then(
      (r) => r === null && toast.error("Something went wrong!"),
    );
  };

  return (
    <div className="">
      {!isShowAdd && (
        <>
          <div className="header_of_customer">
            <div className="row">
              <div className="col">
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
                <UploadFileButton handleSubmit={handleFormSubmit} />
              </div>
              <div className="col-4">
                <div className="feature_of_customer">
                  <MyButton
                    prefix={<Plus size={26} color="#ffffff" weight="fill" />}
                    callback={() => setIsShowAdd(true)}
                    bgColor={"var(--primary-color)"}
                    borderRadius={"5px"}
                  />
                </div>
              </div>
            </div>
          </div>
          <MyTable
            showCheckBox={true}
            list={typeList}
            hideDetails={true}
            deleteCallback={handleDelete}
          />
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

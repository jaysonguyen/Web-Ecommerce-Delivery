import React, { useEffect, useState } from "react";
import {
  DetailCustomer,
  Dropdown,
  MyButton,
  MyTable,
} from "../../../components";
import "../../../assets/css/Pages/customer.css";
import {
  deleteVoucher,
  getVoucherById,
  getVoucherList,
  uploadVoucherFile,
} from "../../../services/VoucherService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import { CaretLeft, Plus } from "phosphor-react";
import AddVoucher from "../../../components/project/voucher/AddVoucher";
import { tableSelector } from "../../../selectors/consumerSelector";
import tableSlice from "../../../features/table/tableSlice";
import { VoucherTableFromJson } from "../../../utils/modelHandle";
import useToken from "../../../hooks/useToken";
import { Drawer } from "../../../components/project/drawer/Drawer";
import DetailsVoucher from "../../../components/project/voucher/DetailsVoucher";
import { uploadFile } from "../../../services/ProductType";
import { UploadFileButton } from "../../../components/template/button/upload_file_button";

function VoucherPage(props) {
  const [voucherSelected, setVoucherSelected] = useState({});
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [voucherList, setVoucherList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedList, setSelectedList] = useState([]);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const tableData = useSelector(tableSelector);
  const dispatch = useDispatch();
  const { userPayload } = useToken();

  const initData = async () => {
    if (isLoading) {
      // If a request is already in progress, don't make another one
      return -1;
    }

    setIsLoading(true);
    try {
      const data = await getVoucherList();
      setVoucherList([]);
      if (data.status === 200) {
        for (let i = 0; i < data.data.length; i++) {
          setVoucherList((voucherList) => [
            ...voucherList,
            VoucherTableFromJson(data.data[i]),
          ]);
        }
      }
      return data;
    } catch (error) {
      // Handle the error here
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    let list = [...tableData.selectList];
    if (list.length === 0) {
      toast.error("Choose item to delete");
      return;
    }

    for (let i = 0; i < list.length; i++) {
      let res = await deleteVoucher(list[i].ID);
      if (res.status !== 200) {
        toast.error("Something went wrong");
        return;
      }
    }
    toast.success("Deleted successfully");
    dispatch(tableSlice.actions.handleSelected([]));
    initData().then((r) => r === null && toast.error("Something went wrong!"));
  };

  useEffect(() => {
    dispatch(tableSlice.actions.handleSelected([]));
    initData().then((r) => r === null && toast.error("Something went wrong!"));
  }, [isShowAdd]);

  const handleShowDetail = async (data) => {
    setVoucherSelected(data);
    setIsShowDetail(true);
  };

  const handleFormSubmit = async (e, file) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadVoucherFile(formData);

      // Handle the response as needed
      if (res.status === 200) {
        toast.success("Upload file successfully");
        initData();
      } else {
        toast.error("Upload file failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleCloseDetail = () => {
    setIsShowDetail(false);
  };

  const itemOptions = [
    {
      content: "Export as Excel",
    },
    {
      content: "Import vouchers",
    },
  ];

  const detailsModal = (
    <>
      <div className="go_back_button_container">
        <CaretLeft
          onClick={() => setIsShowDetail(false)}
          size={ICON_SIZE_BIG}
        />
      </div>
      <DetailsVoucher isOpen={isShowDetail} dataSelected={voucherSelected} />
    </>
  );

  return (
    <>
      <div className="">
        {!isShowAdd && (
          <>
            <div className="header_of_customer">
              <div className="row">
                <div className="col">
                  <div className="header_bar_left_Cus ">
                    <div className="title_total_number_Cus">
                      <h3 className="title_Cus">Voucher list </h3>
                      <p className="total_number_Cus">{voucherList.length}</p>
                    </div>
                    <p className="introduce_Cus">
                      View, add, edit and delete your voucher's details.{" "}
                    </p>
                  </div>
                </div>

                <div className="col">
                  <div className="feature_of_customer d-flex">
                    <div className={""}>
                      <UploadFileButton handleSubmit={handleFormSubmit} />
                    </div>
                    <div className="option_dropdown ">
                      <Dropdown placeholder="Options" item={itemOptions} />
                    </div>
                    <div className="feature_of_customer ms-3">
                      <MyButton
                        prefix={
                          <Plus size={26} color="#ffffff" weight="fill" />
                        }
                        callback={() => setIsShowAdd(true)}
                        bgColor={"var(--primary-color)"}
                        borderRadius={"5px"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <MyTable
              hideDelete={userPayload.role !== "admin"}
              list={voucherList}
              showCheckBox={!(userPayload.role !== "admin")}
              callback={handleShowDetail}
              deleteCallback={handleDelete}
            />
          </>
        )}

        {isShowAdd && (
          <div className="add_employee_container">
            <div className="go_back_button_container">
              <CaretLeft
                size={ICON_SIZE_BIG}
                onClick={() => setIsShowAdd(false)}
              />
            </div>
            <h3>Add Voucher</h3>
            <AddVoucher />
          </div>
        )}
      </div>
      <div className="w-100">
        <Drawer
          anchor="right"
          open={isShowDetail}
          onClose={() => setIsShowDetail(false)}
          child={detailsModal}
        />
      </div>
    </>
  );
}

export default VoucherPage;

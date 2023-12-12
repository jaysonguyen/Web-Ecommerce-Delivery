import React, { useEffect, useState } from "react";
import "../../../assets/css/Pages/addOrder.css";
import voucherImg from "../../../assets/img/dashboard/win.png";
import totalImg from "../../../assets/img/dashboard/list.png";
import { Input, Dropdown, MyButton } from "../../index";
import { MyTable } from "../../template/table/MyTable/MyTable";
import toast from "react-hot-toast";
import tableSlice from "../../../features/table/tableSlice";
import { useDispatch, useSelector } from "react-redux";
import { tableSelector } from "../../../selectors/consumerSelector";
import {
  getCityDropdownList,
  getCityList,
  insertOrder,
} from "../../../services/OrderService";
import { JsonToString } from "../../../utils/modelHandle";
import useToken from "../../../hooks/useToken";
import { getProductTypeDropdownList } from "../../../services/ProductType";
import { getAreaDropdownList } from "../../../services/AreaService";
import { getValidVoucherList } from "../../../services/VoucherService";

function AddOrder({
  handleClose,
  data = {},
  getNewsListByAction = function () {},
}) {
  const [isError, setIsError] = useState({
    packageTotalCost: false,
    packageHeight: false,
    packageWidth: false,
    packageLength: false,
    packageCOD: false,
  });
  const tableData = useSelector(tableSelector);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [voucherUsed, setVoucherUsed] = useState([]);
  const { token, userPayload } = useToken();

  const handleImage = async (e) => {
    // console.log(URL.createObjectURL(e.target.files[0]));
    // await setImage(() => URL.createObjectURL(e.target.files[0]));
  };

  const handleSelect = async (e, selected, checkValid) => {
    if (!checkValid) {
      setLoading(true);
      let list = [...tableData.selectList];
      let ids = list.map((ele) => ele.voucherId);

      if (e.target.checked) {
        setDiscount((e) => e + selected.cost);
        list.push(selected);
      } else {
        setDiscount((e) => e - selected.cost);
        let index = ids.indexOf(selected.voucherId);
        list.splice(index, 1);
      }
      setVoucherUsed(list);
      dispatch(tableSlice.actions.handleSelected(list));
      setLoading(false);
    } else {
      toast.error("Not enough points");
    }
  };

  const [cityList, setCityList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [voucherList, setVoucherList] = useState([]);
  const getCityData = async () => {
    try {
      let res = await getCityDropdownList();
      if (res.status === 200) {
        setCityList(res.data);
      } else {
        toast.error("Cannot get city data, please try again");
      }
    } catch (e) {
      console.log("Error from get city data: " + e.message);
      toast.error("Check your network");
    }
  };
  const getAreaData = async (cityCode) => {
    try {
      let res = await getAreaDropdownList(cityCode);
      if (res.status === 200) {
        setAreaList(res.data);
      } else {
        // toast.error("Cannot get area data, please try again");
      }
    } catch (e) {
      console.log("Error from get area data: " + e.message);
      toast.error("Check your network");
    }
  };
  const getProductTypeData = async () => {
    try {
      let res = await getProductTypeDropdownList();
      if (res.status === 200) {
        setProductTypeList(res.data);
      } else {
        toast.error("Cannot get product type data, please try again");
      }
    } catch (e) {
      console.log("Error from get product type data: " + e.message);
      toast.error("Check your network");
    }
  };
  const getValidVoucherData = async () => {
    try {
      let res = await getValidVoucherList();
      if (res.status === 200) {
        setVoucherList(res.data);
      } else {
        toast.error("Cannot get voucher data, please try again");
      }
    } catch (e) {
      console.log("Error from get voucher data: " + e.message);
      toast.error("Check your network");
    }
  };

  const [orderCode, setOrderCode] = useState("");

  const [productList, setProductList] = useState([]);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productType, setProductType] = useState("");
  const [productTypeList, setProductTypeList] = useState([]);

  const clearProData = () => {
    setProductCode("");
    setProductName("");
    setProductWeight("");
    setProductQuantity("");
  };
  const addProductToList = () => {
    if (
      productCode.trim() == "" ||
      productName.trim() == "" ||
      productWeight.trim() == "" ||
      productQuantity.trim() == ""
    ) {
      toast.error("Please enter product's information");
      return;
    }

    const data = {
      id: productList.length + 1,
      code: productCode,
      name: productName,
      weight: productWeight,
      quantity: productQuantity,
      "product type": productType,
    };

    for (let i = 0; i < productList.length; i++) {
      if (productList[i].code === data.code) {
        toast.error("Product exists already");
        return;
      }
    }

    setProductList([...productList, data]);
    toast.success("Add product to list successfully");
    clearProData();
  };
  const handleDelete = async () => {
    let list = [...tableData.selectList];
    if (list.length === 0) {
      toast.error("Choose item to delete");
      return;
    }

    for (let i = 0; i < list.length; i++) {
      let index = productList.indexOf(list[i]);
      productList.splice(index, 1);
    }
    dispatch(tableSlice.actions.handleSelected([]));
    toast.success("Deleted successfully");
  };

  const [packageTotalWeight, setPackageTotalWeight] = useState("");
  const [packageHeight, setPackageHeight] = useState("");
  const [packageLength, setPackageLength] = useState("");
  const [packageWidth, setPackageWidth] = useState("");
  const [packageCOD, setPackageCOD] = useState("0");
  const [packageCostFailed, setPackageCostFailed] = useState("0");
  const [packageCost, setPackageCost] = useState("0");

  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverStreet, setReceiverStreet] = useState("");
  const [receiverWard, setReceiverWard] = useState("");
  const [receiverCity, setReceiverCity] = useState("");
  const [receiverArea, setReceiverArea] = useState("");

  useEffect(() => {
    getCityData();
    getProductTypeData();
    getValidVoucherData();
    dispatch(tableSlice.actions.handleSelected([]));
  }, []);

  const handleSubmitPost = async () => {
    if (orderCode === "") {
      toast.error("Please enter order code ");
      return;
    }

    if (productList.length === 0) {
      toast.error("Please add product to product list ");
      return;
    }

    if (packageTotalWeight === "") {
      setIsError({ ...isError, title: false, sum: true });
    }
    if (packageLength === "") {
      setIsError({ ...isError, title: false, sum: true });
    }
    if (packageHeight === "") {
      setIsError({ ...isError, title: false, sum: true });
    }
    if (packageWidth === "") {
      setIsError({ ...isError, title: false, sum: true });
    }
    if (packageCostFailed === "" && parseInt(packageCost) >= 1000) {
      setIsError({ ...isError, title: false, sum: true });
    }
    if (packageCost === "" && parseInt(packageCost) >= 1000) {
      setIsError({ ...isError, title: false, sum: true });
    }

    let packageData = JsonToString({
      total_weight: packageTotalWeight,
      width: packageWidth,
      height: packageHeight,
      length: packageLength,
      cod: packageCOD,
      cost: packageCost,
      cost_failed: packageCostFailed,
    });

    let productData = JsonToString(productList);
    let receiverData = JsonToString({
      name: receiverName,
      phone: receiverPhone,
    });
    let addressData = JsonToString({
      ap_number: receiverAddress,
      street: receiverStreet,
      ward: receiverWard,
    });

    console.log(parseInt(packageCost) + parseInt(packageCostFailed) - discount);

    const checkAddOrders = await insertOrder({
      user_id: token,
      order_code: orderCode,
      action_code: "0",
      receiver: receiverData,
      collect_money: false,
      product: productData,
      package_order: packageData,
      address: addressData,
      city_code: receiverCity,
      area_code: receiverArea,
      cost: packageCost,
      total_cost:
        parseInt(packageCost) + parseInt(packageCostFailed) - discount,
      voucher_discount: discount,
      voucher_used_list: voucherUsed,
    });
    if (checkAddOrders.status === 200) {
      // await getNewsListByAction();
      toast.success("Submit success");
      handleClose();
    } else {
      toast.error("Submit failed");
    }
  };

  return (
    <div className="add_post_container">
      <div className="add_post_header">
        <div className="add_post_header_title_box">
          <p
            className={
              isError.title
                ? "warning_empty header_content_title"
                : "header_content_title"
            }
          >
            Order Code<span className="required">*</span>
          </p>
          <input
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            placeholder="Please enter a order code..."
          />
        </div>
      </div>
      <div
        className="add_post_header sender_info row "
        style={{ backgroundColor: "var(--bg-card-1)" }}
      >
        <div className="add_post_header_title_box col">
          <p
            className={
              isError.title
                ? "warning_empty header_content_title"
                : "header_content_title"
            }
          >
            Sender<span className="required">*</span>
          </p>
          <p className={isError.title ? "warning_empty" : ""}>
            Sender Code<span className="required">*</span>
          </p>
          <h4 className="me-5">{userPayload && userPayload.userCode}</h4>
        </div>
        <div className="add_subtitle_box w-100 col">
          <p className={isError.sum ? "warning_empty" : ""}>Note</p>
          <textarea
            // value={sum}
            // onChange={(e) => setSum(e.target.value)}
            className="input_summary"
            id="text"
            name="text"
            rows="3"
            cols="50"
          ></textarea>
        </div>
      </div>
      <div
        className="add_post_body receiver_info"
        style={{ backgroundColor: "var(--bg-card-2)" }}
      >
        <p
          className={
            isError.title
              ? "warning_empty header_content_title"
              : "header_content_title"
          }
        >
          Receiver<span className="required">*</span>
        </p>
        <div className="row">
          <div className="col">
            <OrderInput
              title="Phone"
              isRequired={true}
              isError={isError.title}
              value={receiverPhone}
              onChange={(v) => setReceiverPhone(v.target.value)}
              placeholder="Enter receiver's phone number"
            />
            <OrderInput
              title="Full Name"
              isRequired={true}
              isError={isError.title}
              value={receiverName}
              onChange={(v) => setReceiverName(v.target.value)}
              placeholder="Enter receiver's full name"
            />
            <p className={isError.type ? "warning_empty" : ""}>
              City <span className="required">*</span>
            </p>
            <Dropdown
              item={cityList}
              value={receiverCity}
              bgColor="var(--text-white)"
              onValue={(v) => {}}
              onChange={async (v) => {
                await getAreaData(v);
                setReceiverArea("");
                setReceiverCity(v);
              }}
              placeholder="Choose city"
            />
            <p className={isError.type ? "warning_empty" : ""}>
              Area <span className="required">*</span>
            </p>
            <Dropdown
              // setValue={setType}
              item={areaList}
              value={receiverArea}
              bgColor="var(--text-white)"
              onChange={(v) => setReceiverArea(v)}
              placeholder="Choose area"
            />
          </div>
          <div className="col">
            <OrderInput
              title="Address Number"
              isRequired={true}
              isError={isError.title}
              value={receiverAddress}
              onChange={(v) => setReceiverAddress(v.target.value)}
              placeholder="Enter receiver's address"
            />
            <OrderInput
              title="Street"
              isRequired={true}
              isError={isError.title}
              value={receiverStreet}
              onChange={(v) => setReceiverStreet(v.target.value)}
              placeholder="Enter receiver's street"
            />
            <OrderInput
              title="Ward"
              isRequired={true}
              isError={isError.title}
              value={receiverWard}
              onChange={(v) => setReceiverWard(v.target.value)}
              placeholder="Enter receiver's ward"
            />
          </div>
        </div>
      </div>
      <div
        className="add_post_body product_info"
        style={{ backgroundColor: "var(--bg-card-3)" }}
      >
        <p
          className={
            isError.title
              ? "warning_empty header_content_title"
              : "header_content_title"
          }
        >
          Product<span className="required">*</span>
        </p>
        <div className="product_item">
          <div className="product_img"></div>
          <div className="row">
            <div className="col product_form">
              <OrderInput
                value={productCode}
                title="Code"
                isRequired={true}
                isError={isError.title}
                onChange={(v) => setProductCode(v.target.value)}
                placeholder="Enter product's code"
              />
              <OrderInput
                value={productName}
                title="Name"
                isRequired={true}
                isError={isError.title}
                onChange={(v) => setProductName(v.target.value)}
                placeholder="Enter product's name"
              />
              <p className={isError.type ? "warning_empty" : ""}>
                Product type <span className="required">*</span>
              </p>
              <Dropdown
                item={productTypeList}
                value={productType}
                bgColor="var(--text-white)"
                onValue={(v) => setProductType(v)}
                placeholder="Choose product type"
              />
              <div className="row">
                <div className="col">
                  <OrderInput
                    value={productWeight}
                    title="Weight (Gam)"
                    isRequired={true}
                    isError={isError.title}
                    onChange={(v) => setProductWeight(v.target.value)}
                    placeholder="Enter product's weight"
                  />
                </div>
                <div className="col">
                  <OrderInput
                    value={productQuantity}
                    title="Quantity"
                    isRequired={true}
                    isError={isError.title}
                    onChange={(v) => setProductQuantity(v.target.value)}
                    placeholder="Enter product's quantity"
                  />
                </div>
              </div>
              <MyButton
                width="100%"
                text="Add To List"
                bgColor="var(--primary-color)"
                fontColor="var(--text-white)"
                callback={addProductToList}
              />
            </div>
            <div className="col product_table">
              <MyTable
                hideToolkit={true}
                hideDetails={true}
                showCheckBox={true}
                list={productList}
              />
              {tableData.selectList.length > 0 && (
                <MyButton
                  width="100%"
                  text="Remove From List"
                  bgColor="var(--color-error)"
                  fontColor="var(--text-white)"
                  callback={handleDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="add_post_body package_info"
        style={{ backgroundColor: "var(--bg-card-4)" }}
      >
        <p
          className={
            isError.title
              ? "warning_empty header_content_title"
              : "header_content_title"
          }
        >
          Package<span className="required">*</span>
        </p>
        <div className="package_item">
          <div className="package_img"></div>
          <div className="row">
            <div className="col-4">
              <OrderInput
                value={packageTotalWeight}
                title="Total Weight"
                isRequired={true}
                isError={isError.title}
                onChange={(v) => setPackageTotalWeight(v.target.value)}
                placeholder="Enter package's total weight"
              />
            </div>
            <div className="col">
              <OrderInput
                value={packageHeight}
                title="Height"
                isRequired={true}
                isError={isError.title}
                onChange={(v) => setPackageHeight(v.target.value)}
                placeholder="Enter package's height"
              />
            </div>
            <div className="col">
              <OrderInput
                value={packageLength}
                title="Length"
                isRequired={true}
                isError={isError.title}
                onChange={(v) => setPackageLength(v.target.value)}
                placeholder="Enter package's length"
              />
            </div>
            <div className="col">
              <OrderInput
                value={packageWidth}
                title="Width"
                isRequired={true}
                isError={isError.title}
                onChange={(v) => setPackageWidth(v.target.value)}
                placeholder="Enter package's width"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <OrderInput
                value={packageCOD}
                title="COD"
                isRequired={true}
                isError={isError.title}
                onChange={(v) => setPackageCOD(v.target.value)}
                placeholder="Enter package's COD"
              />
              <OrderInput
                value={packageCostFailed}
                title="Cost Failed"
                isRequired={true}
                isError={isError.title}
                onChange={(v) => setPackageCostFailed(v.target.value)}
                placeholder="Money return when cost failed"
              />
            </div>
            <div className="col">
              <OrderInput
                value={packageCost}
                title="Cost"
                isRequired={true}
                isError={isError.title}
                onChange={(v) => setPackageCost(v.target.value)}
                placeholder="Package total cost"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="add_post_body voucher_info"
        style={{ backgroundColor: "var(--bg-card-5)" }}
      >
        <p
          className={
            isError.title
              ? "warning_empty header_content_title"
              : "header_content_title"
          }
        >
          Voucher
        </p>
        <div className={"voucher_item"}>
          <div className="package_img"></div>
          <div className="row">
            <div className="col">
              {!loading &&
                voucherList.length > 0 &&
                voucherList.map((e, index) => {
                  return (
                    <div
                      key={index}
                      className={"voucher_child"}
                      id="checkbox-circle2"
                    >
                      <input
                        type="checkbox"
                        id="checkbox-circle2"
                        name="check"
                        onChange={(event) =>
                          handleSelect(
                            event,
                            e,
                            userPayload.point < parseInt(e.points),
                          )
                        }
                      />
                      <div
                        className={"voucher_selector"}
                        style={{
                          backgroundColor: tableData.selectList.includes(e)
                            ? "var(--text-color-primary)"
                            : "var(--text-color-gray)",
                        }}
                      ></div>
                      <div
                        className={
                          userPayload.point < parseInt(e.points)
                            ? "voucher_card row py-4 px-2 mx-3 my-2 disable "
                            : `voucher_card row py-4 px-2 mx-3 my-2 `
                        }
                      >
                        <div className="col-3">
                          <div className={"img"}>
                            <img
                              className="option-img"
                              src={voucherImg}
                              alt=""
                            />
                          </div>
                          <div className={"name"}>{e.name}</div>
                        </div>
                        <div className="col ps-4">
                          <div className={"cost my-1"}>
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "VND",
                            }).format(e.cost)}
                            <span className={"ms-2"}>VND</span>
                          </div>
                          <div>Quantity: {e.quantity}</div>
                          <div>Points: {e.points}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className={"col total_order d-flex flex-column"}>
              <div className={"total_title d-flex flex-row-reverse"}>
                <img className="total-img" src={totalImg} alt="" />
                <div
                  style={{
                    color: "#3d3d3d",
                    fontSize: "32px",
                    margin: "0 10px 0 0",
                  }}
                >
                  Total
                  <div>Order</div>
                </div>
              </div>

              <TotalLine
                title={"+ Package Cost:"}
                value={new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "VND",
                }).format(parseInt(packageCost))}
              />
              <TotalLine
                title={"+ Return Cost:"}
                value={new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "VND",
                }).format(parseInt(packageCostFailed))}
              />
              <TotalLine
                title={"- Discount:"}
                value={new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "VND",
                }).format(discount)}
              />
              <div
                style={{
                  margin: "10px 0",
                  borderBottom: "solid 1px #3d3d3d",
                }}
              ></div>
              <TotalLine
                title={"Total: "}
                value={new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  parseInt(packageCost) +
                    parseInt(packageCostFailed) -
                    discount,
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/*<div*/}
      {/*  className="add_post_body_main_content"*/}
      {/*  style={{ backgroundColor: "var(--bg-card-5)" }}*/}
      {/*>*/}
      {/*  <div className="main_content_image_box">*/}
      {/*    <p*/}
      {/*      className={*/}
      {/*        isError.title*/}
      {/*          ? "warning_empty header_content_title"*/}
      {/*          : "header_content_title"*/}
      {/*      }*/}
      {/*    >*/}
      {/*      Image Package<span className="required">*</span>*/}
      {/*    </p>*/}
      {/*    <p className={isError.image ? "warning_empty" : ""}>*/}
      {/*      Thumb nails<span className="required">*</span>*/}
      {/*    </p>*/}
      {/*    <div className="thumb_nails_img">*/}
      {/*      /!*<div className="thumb_nails_img--image">*!/*/}
      {/*      /!*  <div*!/*/}
      {/*      /!*    className="btn_delete_img"*!/*/}
      {/*      /!*    // onClick={() => setImage(null)}*!/*/}
      {/*      /!*  >*!/*/}
      {/*      /!*    <X size={ICON_SIZE_EXTRA_LARGE} />*!/*/}
      {/*      /!*  </div>*!/*/}
      {/*      /!*  <img*!/*/}
      {/*      /!*    // src={image}*!/*/}
      {/*      /!*    alt=""*!/*/}
      {/*      /!*  />*!/*/}
      {/*      /!*</div>*!/*/}

      {/*      <label htmlFor="thumb_nails_img">*/}
      {/*        <UploadSimple size={40} className="thumb_nails_img--icon" />*/}
      {/*      </label>*/}
      {/*      <p>Please enter a thumb nail for your post</p>*/}
      {/*      <input*/}
      {/*        onChange={handleImage}*/}
      {/*        hidden*/}
      {/*        id="thumb_nails_img"*/}
      {/*        type="file"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <p className="add_post_footer">
        <button onClick={handleSubmitPost} className="button button_primary">
          Submit
        </button>
      </p>
    </div>
  );
}

const TotalLine = ({ title = "", value = 0 }) => {
  return (
    <div className={"row"}>
      <div className="col">{title}</div>
      <div className="col total_order_value">{value}</div>
    </div>
  );
};

const OrderInput = ({
  value,
  title,
  placeholder,
  onChange,
  isRequired,
  isError,
}) => {
  return (
    <>
      <p className={isError ? "warning_empty input_title" : "input_title"}>
        {title}
        {isRequired && <span className="required">*</span>}
      </p>
      <Input
        value={value}
        className="input_summary"
        boxShadow="none"
        border="1px solid var(--border-color)"
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default AddOrder;

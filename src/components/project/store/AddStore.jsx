import React, { useEffect, useState } from "react";
import { Input, Dropdown, MyButton } from "../../index";
import { MyTable } from "../../template/table/MyTable/MyTable";
import toast from "react-hot-toast";
import tableSlice from "../../../features/table/tableSlice";
import { useDispatch, useSelector } from "react-redux";
import { tableSelector } from "../../../selectors/consumerSelector";
import { JsonToString } from "../../../utils/modelHandle";
import { getStoreByUser } from "../../../services/UserService";

function AddStore({ handleClose, data = {} }) {
  const [isError, setIsError] = useState({
    packageTotalCost: false,
    packageHeight: false,
    packageWidth: false,
    packageLength: false,
    packageCOD: false,
  });
  const tableData = useSelector(tableSelector);
  const dispatch = useDispatch();

  const [cityList, setCityList] = useState([]);
  const [storeCode, setStoreCode] = useState("");

  const [productList, setProductList] = useState([]);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

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
  const [packageCostFailed, setPackageCostFailed] = useState("");
  const [packageCost, setPackageCost] = useState("");

  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverCity, setReceiverCity] = useState("");
  const [receiverArea, setReceiverArea] = useState("");

  const items = [
    { content: "Business", code: "BS" },
    { content: "Entertainment", code: "VH" },
    { content: "General", code: "THS" },
    { content: "Health", code: "KT" },
    { content: "Science", code: "KT" },
    { content: "Sports", code: "KT" },
    { content: "Technology", code: "KT" },
  ];

  useEffect(() => {
    // getCityData();
    dispatch(tableSlice.actions.handleSelected([]));
  }, []);

  const handleSubmitPost = async () => {
    if (storeCode === "") {
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
      address: receiverAddress,
      city: "",
      area: "",
    });

    console.log({
      user_id: "ff097d8f-a316-49cd-9c55-2a7c7c026551",
      order_code: storeCode,
      action_code: "0",
      receiver: receiverData,
      product_type_code: "type1",
      collect_money: false,
      product: productData,
      package_order: packageData,
      shipper_name: "",
    });

    //   const checkAddStores = await insertStore({
    //     user_id: "ff097d8f-a316-49cd-9c55-2a7c7c026551",
    //     order_code: storeCode,
    //     action_code: "0",
    //     receiver: receiverData,
    //     product_type_code: "type1",
    //     collect_money: false,
    //     product: productData,
    //     package_order: packageData,
    //     shipper_name: "",
    //   });
    //   console.log(checkAddStores);
    //   if (checkAddStores.status === 200) {
    //     // await getNewsListByAction();
    //     toast.success("Submit success");
    //     handleClose();
    //   } else {
    //     toast.error("Submit failed");
    //   }
    // };

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
              Store Code<span className="required">*</span>
            </p>
            <input
              value={storeCode}
              onChange={(e) => setStoreCode(e.target.value)}
              placeholder="Please enter a order code..."
            />
          </div>
        </div>
        <div
          className="add_post_header sender_info d-flex flex-row "
          style={{ backgroundColor: "var(--bg-card-1)" }}
        >
          <div className="add_post_header_title_box">
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
              Sender<span className="required">*</span>
            </p>
            <input
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
              placeholder="Please enter a title..."
            />
          </div>
          <div className="add_subtitle_box w-100">
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
              <StoreInput
                title="Phone"
                isRequired={true}
                isError={isError.title}
                value={receiverPhone}
                onChange={(v) => setReceiverPhone(v.target.value)}
                placeholder="Enter receiver's phone number"
              />
              <StoreInput
                title="Full Name"
                isRequired={true}
                isError={isError.title}
                value={receiverName}
                onChange={(v) => setReceiverName(v.target.value)}
                placeholder="Enter receiver's full name"
              />
            </div>
            <div className="col">
              <StoreInput
                title="Address"
                isRequired={true}
                isError={isError.title}
                value={receiverAddress}
                onChange={(v) => setReceiverAddress(v.target.value)}
                placeholder="Enter receiver's address"
              />
              <p className={isError.type ? "warning_empty" : ""}>
                City <span className="required">*</span>
              </p>
              <Dropdown
                item={cityList}
                value={receiverCity}
                bgColor="var(--text-white)"
                setValue={(v) => setReceiverCity(v.target.value)}
                placeholder="Choose city"
              />
              <p className={isError.type ? "warning_empty" : ""}>
                Area <span className="required">*</span>
              </p>
              <Dropdown
                // setValue={setType}
                value={receiverArea}
                bgColor="var(--text-white)"
                setValue={(v) => setReceiverArea(v.target.value)}
                placeholder="Choose area"
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
                <StoreInput
                  value={productCode}
                  title="Code"
                  isRequired={true}
                  isError={isError.title}
                  onChange={(v) => setProductCode(v.target.value)}
                  placeholder="Enter product's code"
                />
                <StoreInput
                  value={productName}
                  title="Name"
                  isRequired={true}
                  isError={isError.title}
                  onChange={(v) => setProductName(v.target.value)}
                  placeholder="Enter product's name"
                />
                <div className="row">
                  <div className="col">
                    <StoreInput
                      value={productWeight}
                      title="Weight (Gam)"
                      isRequired={true}
                      isError={isError.title}
                      onChange={(v) => setProductWeight(v.target.value)}
                      placeholder="Enter product's weight"
                    />
                  </div>
                  <div className="col">
                    <StoreInput
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
              <div className="col">
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
                <StoreInput
                  value={packageTotalWeight}
                  title="Total Weight"
                  isRequired={true}
                  isError={isError.title}
                  onChange={(v) => setPackageTotalWeight(v.target.value)}
                  placeholder="Enter package's total weight"
                />
              </div>
              <div className="col">
                <StoreInput
                  value={packageHeight}
                  title="Height"
                  isRequired={true}
                  isError={isError.title}
                  onChange={(v) => setPackageHeight(v.target.value)}
                  placeholder="Enter package's height"
                />
              </div>
              <div className="col">
                <StoreInput
                  value={packageLength}
                  title="Length"
                  isRequired={true}
                  isError={isError.title}
                  onChange={(v) => setPackageLength(v.target.value)}
                  placeholder="Enter package's length"
                />
              </div>
              <div className="col">
                <StoreInput
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
                <StoreInput
                  value={packageCOD}
                  title="COD"
                  isRequired={true}
                  isError={isError.title}
                  onChange={(v) => setPackageCOD(v.target.value)}
                  placeholder="Enter package's COD"
                />
                <StoreInput
                  value={packageCostFailed}
                  title="Cost Failed"
                  isRequired={true}
                  isError={isError.title}
                  onChange={(v) => setPackageCostFailed(v.target.value)}
                  placeholder="Money return when cost failed"
                />
              </div>
              <div className="col">
                <StoreInput
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
        <p className="add_post_footer">
          <button onClick={handleSubmitPost} className="button button_primary">
            Submit
          </button>
        </p>
      </div>
    );
  };

  const StoreInput = ({
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
}
export default AddStore;

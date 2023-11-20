import { formatDateTime } from "../../../utils/utils";
import { MyButton } from "../../template/button/MyButton/MyButton";
import { ArrowRight, CaretDoubleRight } from "phosphor-react";
import { useState } from "react";
import { TextInfo } from "../../index";

export const OrderItem = ({ data = {} }) => {
  const [isHovered, setIsHovered] = useState(false);

  const itemStyle = {
    padding: "15px 15px 5px 15px",
    // border: "1px solid var(--border-gray)",
    borderRadius: "10px",
    boxShadow: "0 0 5px #f1f1f1",
    borderOpacity: "0.5",
    cursor: "pointer",
    backgroundColor: isHovered ? "var(--bg-light)" : "white",
    transition: "linear 0.1s",
  };

  return (
    <div
      className=""
      style={itemStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="row mb-2">
        <div className="col-8">
          {/*get only first code in id*/}
          <TextInfo
            title="Order Code:"
            contentSize="22px"
            content={data.order_code.split("-")[0]}
            contentFontColor={"var(--text-color-primary)"}
          />
        </div>
        <div className="col-4" style={{ fontSize: "13.5px" }}>
          <p
            style={{ color: "var(--color-success)", textAlign: "right" }}
            className="ms-auto font-weight-b"
          >
            {data.action_name}
          </p>
        </div>
      </div>
      <div className="my-3">
        <TextInfo title="Product Type" content={data.product_type_name} />
      </div>
      <BorderWrap>
        <TextInfo
          title="Created at:"
          content={formatDateTime(data.created)}
          titleSize={"11px"}
          contentSize={"13px"}
        />
        <TextInfo
          title="Modified at: "
          content={formatDateTime(data.updated)}
          titleSize={"11px"}
          contentSize={"13px"}
        />
      </BorderWrap>
      <div className="my-2"></div>
      <BorderWrap>
        <div className="row">
          <div className={"col"}>
            <TextInfo
              title="Customer name:"
              content={data.receiver}
              titleSize={"11px"}
              contentSize={"13px"}
            />
          </div>
          <div className={"col"}>
            <TextInfo
              title="Phone"
              content={data.phone}
              titleSize={"11px"}
              contentSize={"13px"}
            />
          </div>
        </div>
        <TextInfo
          title="Address"
          content={data.address}
          titleSize={"11px"}
          contentSize={"13px"}
        />
      </BorderWrap>
      <div className="ms-auto" style={{ width: "fit-content" }}>
        <MyButton
          text={"More"}
          bgColor={"transparent"}
          fontSize="11px"
          surfix={<CaretDoubleRight size={12} />}
        />
      </div>
    </div>
  );
};

const BorderWrap = ({ children }) => {
  const itemStyle = {
    padding: "10px 10px",
    border: "1px solid var(--border-gray)",
    borderRadius: "10px",
    borderOpacity: "0.5",
  };
  return <div style={itemStyle}>{children}</div>;
};

import { MyButton } from "../../button/MyButton/MyButton";

export const ButtonState = ({
  label = "",
  callback,
  bgColor,
  fontColor,
  hoverColor,
  prefix,
  borderRadius = "30px",
  selected = false,
  width = "auto",
  number = 1220,
  isCount = true,
}) => {
  let numberStyle = {
    backgroundColor: "var(--text-white)",
    color: "var(--tab-color)",
    padding: "2px 10px",
    borderRadius: "50px",
    fontSize: "10px",
    boxShadow: "1px 1px 4px var(--text-color-gray)",
  };

  return (
    <MyButton
      prefix={prefix}
      text={label}
      padding="18px 15px"
      margin="5px 0"
      borderRadius={borderRadius}
      callback={callback}
      bgColor={selected ? hoverColor : bgColor}
      fontColor={selected ? bgColor : fontColor}
      fontSize="13px"
      hoverColor={selected ? null : hoverColor}
      borderColor={fontColor}
      width={width}
      surfix={
        isCount && (
          <div className="ms-3 state-icon" style={numberStyle}>
            {number.toString()}
          </div>
        )
      }
    />
  );
};

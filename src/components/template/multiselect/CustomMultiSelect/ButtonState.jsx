import { MyButton } from "../../button/MyButton/MyButton";

export const ButtonState = ({
  label = "",
  callback,
  bgColor,
  fontColor,
  hoverColor,
  selected = false,
  width = "auto",
  number = 1220,
}) => {
  let numberStyle = {
    backgroundColor: "var(--text-white)",
    color: "var(--tab-color)",
    padding: "2px 10px",
    borderRadius: "50px",
    boxShadow: "1px 1px 4px var(--text-color-gray)",
  };

  return (
    <MyButton
      text={label}
      padding="25px 30px"
      margin="5px 0"
      borderRadius="30px"
      callback={callback}
      bgColor={selected ? hoverColor : bgColor}
      fontColor={selected ? bgColor : fontColor}
      hoverColor={selected ? null : hoverColor}
      borderColor={fontColor}
      width={width}
      surfix={
        <div className="ms-3 state-icon" style={numberStyle}>
          {number.toString()}
        </div>
      }
    />
  );
};

export const TextInfo = ({
  title = "",
  content = "",
  contentFontColor = "var(--text-color)",
  titleSize = "12px",
  contentSize = "20",
}) => {
  const titleStyle = {
    fontSize: titleSize,
    color: "var(--text-color-gray)",
  };
  const contentStyle = {
    fontSize: contentSize,
    textTransform: "capitalize",
    color: contentFontColor,
  };

  return (
    <div className="w-100">
      <div style={titleStyle}>{title}</div>
      <div className="font-weight-b" style={contentStyle}>
        {content}
      </div>
    </div>
  );
};

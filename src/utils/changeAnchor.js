export const changeAnchor = (anchor, classes) => {
  switch (anchor) {
    case "left":
      return "left";
    case "right":
      return "right";
    default:
      return "left";
  }
};

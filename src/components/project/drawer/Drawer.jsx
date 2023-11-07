import React from "react";
import PropTypes from "prop-types";
import classes from "./Drawer.css";
import { changeAnchor } from "../../../utils/changeAnchor";

export const Drawer = (props) => {
  const { open, anchor, onClose, child } = props;
  const {
    drawer = "drawer",
    animate = "animate",
    hidden = "hidden",
    overlay = "overlay",
    overlayOpen = "overlayOpen",
    overlayHidden = "overlayHidden",
    header = "header",
  } = classes;

  return (
    <>
      <div
        className={`${overlay} ${!open && overlayHidden} ${
          open && overlayOpen
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        tabIndex="-1"
        className={`${drawer} ${open && animate} ${
          !open && hidden
        } ${changeAnchor(anchor, classes)}`}
      >
        {child}
      </div>
    </>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  anchor: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

import { Dialog, List } from "@mui/material";
import { DayPicker } from "react-day-picker";
import "./date-picked.css";
import { CalendarBlank } from "phosphor-react";
import { format } from "date-fns";
import React, { useState } from "react";

export function DayPickerDialog(props) {
  const { onClose, selectedValue } = props;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    onClose(selectedValue);
    setOpen(false);
  };

  const handleListItemClick = (value) => {
    onClose(value);
    setOpen(false);
  };

  return (
    <>
      <div
        className="date-picked py-2 p-4 border border-sm"
        onClick={() => setOpen(true)}
      >
        <CalendarBlank
          className="me-3"
          size={16}
          color="#3d3d3d"
          weight="fill"
        />
        {format(selectedValue, "PP")}
      </div>
      <Dialog onClose={handleClose} open={open}>
        <DayPicker
          mode="single"
          selected={selectedValue}
          onSelect={handleListItemClick}
        />
      </Dialog>
    </>
  );
}

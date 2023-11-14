import { Dialog, List } from "@mui/material";
import { DayPicker } from "react-day-picker";

// export interface SimpleDialogProps {
//   open: boolean;
//   selectedValue: Date;
//   onClose: (value: Date) => void;
// }

export function DayPickerDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <>
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

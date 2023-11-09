import { format } from "date-fns";

export function formatDateTime(datetimeString) {
  const parsedDate = new Date(datetimeString);
  return format(parsedDate, "dd-MM-yyyy    HH:mm");
}
export function formatDate(datetimeString) {
  const parsedDate = new Date(datetimeString);
  return format(parsedDate, "dd-MM-yyyy");
}

import { configureStore } from "@reduxjs/toolkit";
import displaySlice from "../features/Display/displaySlice";
import tableSlice from "../features/table/tableSlice";

const store = configureStore({
  reducer: {
    display: displaySlice.reducer,
    table: tableSlice.reducer,
  },
});

export default store;

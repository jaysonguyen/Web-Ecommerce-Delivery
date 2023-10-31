import { configureStore } from "@reduxjs/toolkit";
import displaySlice from "../features/Display/displaySlice";
import consumerSlice from "../features/consumer/consumerSlice";
import tableSlice from "../features/table/tableSlice";

const store = configureStore({
  reducer: {
    display: displaySlice.reducer,
    table: tableSlice.reducer,
    consumer: consumerSlice.reducer,
  },
});

export default store;

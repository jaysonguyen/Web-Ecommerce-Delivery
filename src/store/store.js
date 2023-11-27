import { configureStore } from "@reduxjs/toolkit";
import displaySlice from "../features/Display/displaySlice";
import consumerSlice from "../features/consumer/consumerSlice";
import tableSlice from "../features/table/tableSlice";
import packageSlice from "../features/order/packageSlice";

const store = configureStore({
  reducer: {
    display: displaySlice.reducer,
    table: tableSlice.reducer,
    consumer: consumerSlice.reducer,
    package: packageSlice.reducer,
  },
});

export default store;

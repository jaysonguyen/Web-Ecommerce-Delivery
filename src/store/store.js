import { configureStore } from "@reduxjs/toolkit";
import displaySlice from "../features/Display/displaySlice";
import displayDetails from "../features/Display/displayDetails";

const store = configureStore({
  reducer: {
    display: displaySlice.reducer,
  },
});

export default store;

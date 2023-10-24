import { configureStore } from "@reduxjs/toolkit";
import displaySlice from "../features/Display/displaySlice";

const store = configureStore({
    reducer: {
      display: displaySlice.reducer,
    }
})

export default store;
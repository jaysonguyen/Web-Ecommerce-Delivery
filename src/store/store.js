import { configureStore } from "@reduxjs/toolkit";
import displaySlice from "../features/Display/displaySlice";
import consumerSlice from "../features/consumer/consumerSlice";
import tableSlice from "../features/table/tableSlice";
import searchSlice from "../features/search/searchSlice";

const userInfoFromStorage = sessionStorage.getItem("user_payload")
  ? JSON.parse(sessionStorage.getItem("user_payload"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    display: displaySlice.reducer,
    table: tableSlice.reducer,
    search: searchSlice.reducer,
    initialState,
    consumer: consumerSlice.reducer,
  },
});

export default store;

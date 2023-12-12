import { createSlice } from "@reduxjs/toolkit";

const displaySlice = createSlice({
  name: "display",
  initialState: {
    isShowSidebar: true,
    isShowHeader: true,
    isShowNotification: false,
    details: {},
  },
  reducers: {
    displaySidebar: (state, action) => {
      state.isShowSidebar = action.payload;
    },
    displayHeader: (state, action) => {
      state.isShowHeader = action.payload;
    },
    displayNotification: (state, action) => {
      state.isShowNotification = action.payload;
    },
    displayDetails: (state, action) => {
      state.isShowDetails = action.payload;
    },
  },
});

export default displaySlice;

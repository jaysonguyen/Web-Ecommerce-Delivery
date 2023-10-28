import { createSlice } from "@reduxjs/toolkit";

const displaySlice = createSlice({
  name: "display",
  initialState: {
    isShowSidebar: true,
    isShowHeader: true,
    details: {},
  },
  reducers: {
    displaySidebar: (state, action) => {
      state.isShowSidebar = action.payload;
    },
    displayHeader: (state, action) => {
      state.isShowHeader = action.payload;
    },
    displayDetails: (state, action) => {
      state.isShowDetails = action.payload;
    },
  },
});

export default displaySlice;

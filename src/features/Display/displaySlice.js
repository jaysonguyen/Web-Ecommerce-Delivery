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
    openDetails: (state, action) => {
      state.data = action.payload;
      state.isShowDetails = true;
    },
    closeDetails: (state, action) => {
      state.data = {};
      state.isShowDetails = false;
    },
  },
});

export default displaySlice;

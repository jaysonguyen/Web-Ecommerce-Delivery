import { createSlice } from "@reduxjs/toolkit";

const displaySlice = createSlice({
  name: "display",
  initialState: {
    isShowSidebar: true,
    isShowHeader: true,
  },
  reducers: {
    displaySidebar: (state, action) => {
      state.isShowSidebar = action.payload;
    },
    displayHeader: (state, action) => {
      state.isShowHeader = action.payload;
    },
  },
});

export default displaySlice;

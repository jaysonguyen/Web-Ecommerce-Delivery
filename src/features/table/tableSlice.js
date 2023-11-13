import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    selectList: [],
    detail: {},
  },
  reducers: {
    detailButton: (state, action) => {
      state.detail = action.payload;
    },
    handleSelected: (state, action) => {
      state.selectList = [...action.payload];
    },
  },
});

export default tableSlice;

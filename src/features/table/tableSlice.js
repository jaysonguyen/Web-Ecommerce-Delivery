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
      // state.isShowSidebar = action.payload;
      // let ids = state.selectList.map((ele) => ele.id);
      // if (!state.selectList.contains(action.payload))
      //   state.selectList.push(action.payload);
      // else {
      //   let index = ids.indexOf(action.payload.id);
      //   state.selectList.splice(index, 1);
      // }
      state.selectList = [...action.payload];
    },
  },
});

export default tableSlice;

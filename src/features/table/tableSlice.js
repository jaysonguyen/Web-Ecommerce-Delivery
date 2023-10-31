import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    selectList: [],
  },
  reducers: {
    handleSelected: (state, action) => {
      state.isShowSidebar = action.payload;
      let ids = state.selectList.map((ele) => ele.id);
      if (!state.selectList.contains(action.payload))
        state.selectList.push(action.payload);
      else {
        let index = ids.indexOf(action.payload.id);
        state.selectList.splice(index, 1);
      }
    },
  },
});

export default tableSlice;

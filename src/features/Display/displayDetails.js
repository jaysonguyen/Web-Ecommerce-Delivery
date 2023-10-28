import { createSlice } from "@reduxjs/toolkit";

const displayDetails = createSlice({
  name: "details",
  initialState: {
    data: {},
    isShowDetails: false,
  },
  reducers: {
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

export default displayDetails;

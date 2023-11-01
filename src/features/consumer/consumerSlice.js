import { createSlice } from "@reduxjs/toolkit";

const consumerSlice = createSlice({
  name: "consumer",
  initialState: {
    staffList: [],
    shipperList: [],
    userCurrentInfo: {},
  },
  reducers: {
    setStaffList: (state, action) => {
      state.staffList = action.payload;
    },
    setShipperList: (state, action) => {
      state.shipperList = action.payload;
    },
    setUserCurrentInfo: (state, action) => {
      state.userCurrentInfo = action.payload;
    },
  },
});

export default consumerSlice;

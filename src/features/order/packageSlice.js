import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "package",
  initialState: {
    packageDetails: {},
  },
  reducers: {
    setPackageDetail: (state, action) => {
      state.packageDetails = action.payload;
    },
  },
});

export default packageSlice;

import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: "",
  },
  reducers: {
    searchInput: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default searchSlice;

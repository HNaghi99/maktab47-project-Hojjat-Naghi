import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loadStatus: false,
};
export const LoadReducer = createSlice({
  name: "loader",
  initialState,
  reducers: {
    displayLoader(state, action) {
      state.loadStatus = true;
    },
    hideLoader(state) {
      state.loadStatus = false;
    },
  },
});
export const loaderAction = LoadReducer.actions;

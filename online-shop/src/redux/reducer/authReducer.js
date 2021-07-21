import { Hidden } from "@material-ui/core";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
  MessageShowingStatus: false,
};
export const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    show(state) {
      state.MessageShowingStatus = true;
    },
    hide(state) {
      state.MessageShowingStatus = false;
    },
  },
});
export const authAction = AuthReducer.actions;

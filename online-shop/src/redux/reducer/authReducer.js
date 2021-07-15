import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
};
export const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
  },
});
export const authAction = AuthReducer.actions;

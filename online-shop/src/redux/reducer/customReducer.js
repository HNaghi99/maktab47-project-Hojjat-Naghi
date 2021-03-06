import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
  family: "",
  address: "",
  tel: "",
  date: "",
  orderTime: "",
};
export const CustomerReducer = createSlice({
  name: "customer",
  initialState,
  reducers: {
    saveCustomerData(state, action) {
      const customerData = action.payload;
      state.name = customerData.name;
      state.family = customerData.family;
      state.address = customerData.address;
      state.tel = customerData.tel;
      state.date = customerData.date;
      state.orderTime = customerData.orderTime;
    },
  },
});
export const customerAction = CustomerReducer.actions;

import { createSlice } from "@reduxjs/toolkit";
//Initial state for the customer slice
const initialState = {
  customerData: [],
};
//Create a slice for customer data management
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    //addCustomer action
    addCustomer: (state, action) => {
      state.customerData.push(action.payload);
    },
    //updateCustomer action
    updateCustomer: (state, action) => {
      const { index, customer } = action.payload;
      state.customerData[index] = customer;
    },
    //deleteCustomer action
    deleteCustomer: (state, action) => {
      state.customerData.splice(action.payload, 1);
    },
  },
});

export const { addCustomer, updateCustomer, deleteCustomer } =
  customerSlice.actions;
export default customerSlice.reducer;

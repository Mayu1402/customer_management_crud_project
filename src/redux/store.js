import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./CustomerSlice";
//Configure and create the Redux store
export const store = configureStore({
  reducer: {
    //Add the customer slice reducer to the store
    customer: customerReducer,
  },
});

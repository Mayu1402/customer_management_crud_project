import {createSlice} from "@reduxjs/toolkit";

const initialState={
    customerData:[],
};

const customerSlice = createSlice({
    name:'customer',
    initialState,
    reducers: {
        addCustomer: (state,action)=>{
            state.customerData.push(action.payload);
        },
        updateCustomer:(state,action)=>{
            const {index,customer}=action.payload;
            state.customerData[index]=customer;
        },
        deleteCustomer:(state,action)=>{
            state.customerData.splice(action.payload,1);
        },
    },
});

export const {addCustomer,updateCustomer,deleteCustomer}=customerSlice.actions;
export default customerSlice.reducer;
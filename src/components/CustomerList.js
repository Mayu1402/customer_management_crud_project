import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCustomer } from "../redux/CustomerSlice";
import { Button, Table,Paper,TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const CustomerList=()=>{
    const customers=useSelector((state)=>state.customer.customerData);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleDelete=(index)=>{
        dispatch(deleteCustomer(index));
    };

    const handleEdit=(index)=>{
        navigate(`/edit-customer/${index}`);
    };

    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>PAN</TableCell>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Mobile Number</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                {customers.map((customer,index)=>(
                    <TableRow key={index}>
                        <TableCell>{customer.PAN}</TableCell>
                        <TableCell>{customer.fullName}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.mobileNumber}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" onClick={()=>handleEdit(index)} sx={{mr:1}}>

                                Edit
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>handleDelete(index)}>
                                
                                Delete
                            </Button>
                        </TableCell>

                    </TableRow>
                )
                )}
            </Table>
        </TableContainer>
    );
};

export default CustomerList;
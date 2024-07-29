import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCustomer } from "../redux/CustomerSlice";
import {
  Button,
  Table,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
//CustomerList Component
const CustomerList = () => {
  //Select customer data from the Redux store
  const customers = useSelector((state) => state.customer.customerData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Handle customer deletion
  const handleDelete = (index) => {
    dispatch(deleteCustomer(index));
  };
  //Handle editing a customer
  const handleEdit = (index) => {
    navigate(`/edit-customer/${index}`);
  };

  return (
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
        {/*Map through the customer data and render each customer */}
        {customers.map((customer, index) => (
          <TableRow key={index}>
            <TableCell>{customer.PAN}</TableCell>
            <TableCell>{customer.fullName}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.mobileNumber}</TableCell>
            <TableCell>
              {/*Edit Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(index)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              {/*Delete Button */}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};

export default CustomerList;

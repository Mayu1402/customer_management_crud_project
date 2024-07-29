import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
//Navbar Component
const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Customer Management
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Add Customer
        </Button>
        <Button color="inherit" component={Link} to="/customers">
          Customers list
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

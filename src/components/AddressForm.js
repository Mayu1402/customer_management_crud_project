import React from "react";
import {
  Box,
  Select,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";

//AddressForm Component

const AddressForm = ({
  address,
  loading,
  handleChange,
  fetchPostCodeDetails,
  handleRemove,
  error,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      {/*Address Line Input Field 1*/}
      <TextField
        fullWidth
        margin="normal"
        label="Address Line 1"
        variant="outlined"
        name="address1"
        value={address.address1}
        onChange={handleChange}
        error={!!error?.address1}
        helperText={error?.address1}
      />
      {/*Address Line Input Field 2*/}

      <TextField
        fullWidth
        margin="normal"
        label="Address Line 2"
        variant="outlined"
        name="address2"
        value={address.address2}
        onChange={handleChange}
        error={!!error?.address2}
        helperText={error?.address2}
      />
      {/* Postcode Input Field with CircularProgress Indicator */}
      <TextField
        fullWidth
        margin="normal"
        label="Postcode"
        variant="outlined"
        name="postcode"
        value={address.postcode}
        onChange={(e) => {
          handleChange(e);
          fetchPostCodeDetails();
        }}
        error={!!error?.postcode}
        helperText={error?.postcode}
        InputProps={{
          endAdornment: loading.postcode && <CircularProgress size={24} />,
        }}
      />

      {/* City Select Input field (diabled)*/}

      <FormControl fullWidth margin="normal">
        <InputLabel>City</InputLabel>
        <Select
          label="City"
          name="city"
          value={address.city}
          onChange={handleChange}
          error={!!error?.city}
          disabled
        >
          {address.city && (
            <MenuItem value={address.city}>{address.city}</MenuItem>
          )}
        </Select>
      </FormControl>
      {/* State Select Input field (diabled)*/}

      <FormControl fullWidth margin="normal">
        <InputLabel>State</InputLabel>
        <Select
          label="State"
          name="state"
          value={address.state}
          onChange={handleChange}
          error={!!error?.state}
          disabled
        >
          {address.state && (
            <MenuItem value={address.state}>{address.state}</MenuItem>
          )}
        </Select>
      </FormControl>
      {/*Remove Address button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleRemove}
        sx={{ mt: 1 }}
      >
        Remove Address
      </Button>
    </Box>
  );
};

export default AddressForm;

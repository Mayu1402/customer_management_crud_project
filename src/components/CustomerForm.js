import React ,{ useState} from "react";
import {TextField,Button, Container, Box, Typography, CircularProgress} from "@mui/material";
import { useDispatch } from "react-redux";


import axios from "axios";

import { validatePAN,validateEmail,validateFullName,validateMobileNumber, validatePostcode} from "../Utils/ValidationUtils";
import AddressForm from "./AddressForm";
import { addCustomer } from "../redux/CustomerSlice";
export const CustomerForm=()=>{
    const dispatch=useDispatch();
    const[formData,setformData]=useState({
        PAN:"",
        fullName:"",
        email:"",
        mobileNumber:"",
       addresses:[{address1:"",address2:"",postcode:"",city:"",state:""}]
        
    });
    
    const [loading,setLoading]=useState({pan:false});
    const[validationErrors,setvalidationErrors]=useState({});

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setformData((prevData)=>({
            ...prevData,
            [name]:value
        }));
    };

    const handleAddressChange=(index,e)=>{
        const {name,value}=e.target;
        const newAddresses=[...formData.addresses];
        newAddresses[index][name]=value;
        setformData(prevData=>({
            ...prevData,
            addresses:newAddresses
        }));
    };

    const handleAddress=()=>{
        if(formData.addresses.length<10){
            setformData(prevData=>({
                ...prevData,
                addresses:[...prevData.addresses,{address1:"",address2:"",postcode:"",city:"",state:""}]

            }));
        }
    };

    const handleRemoveAddress = (index) =>{
        const newAddresses=formData.addresses.filter((_,i)=>i!==index);
        setformData(prevData=>({
            ...prevData,
            addresses:newAddresses

        }));
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const errors={};
        if(!validatePAN(formData.PAN)) 
        {
            errors.PAN="Invalid PAN Number";
        }
        if(!validateFullName(formData.fullName)) 
        {
            errors.fullName="Invalid Full Name";
        }
        if(!validateEmail(formData.email)) 
        {
            errors.email="Invalid Email";
        }

        if(!validateMobileNumber(formData.mobileNumber)) 
        {
            errors.mobileNumber="Invalid Mobile number";
        }

        if(formData.addresses.some(addr=>!validatePostcode(addr.postcode)))
        {
            errors.postcode="Invalid Postcode";
        }

        if(Object.keys(errors).length)
        {
            setvalidationErrors(errors);
            return;
        }

        dispatch(addCustomer(formData));
        console.log(formData);
    };

    const verifyPAN=async()=>{
        if(!validatePAN(formData.PAN)) return;
        
        setLoading(prev=>({ ...prev,pan:true}));
        try{
            const response=await axios.post("https://lab.pixel6.co/api/verify-pan.php",{
              panNumber:formData.PAN 
            });
            const data = await response.data;
            if(data.status==="Success" && data.isValid){
               setformData(prevData=>({
                ...prevData,
                fullName:data.fullName
               }));
            }
        }
        catch(error)
        {
            console.error("PAN verification failed.",error);
        }
        finally{
            setLoading(prev=>({ ...prev,pan:false}));
        }
    };

    const fetchPostCodeDetails=async(index)=>{
        const postcode=formData.addresses[index].postcode;
        if(!validatePostcode(postcode)) return;

        setLoading(prev=>({ ...prev,postcode:true}));
        try{
            const response=await axios.post("https://lab.pixel6.co/api/get-postcode-details.php",{
                postcode:parseInt(postcode,10)
            });
            const data=response.data;
            if(data.status==="Success"){
                const newAddresses=[...formData.addresses];
                newAddresses[index]={
                    ...newAddresses[index],
                    city:data.city[0]?.name|| "",
                    state:data.state[0]?.name|| ""
                };
                setformData(prevData=>({
                    ...prevData,
                    addresses:newAddresses
                }));

            }
        } catch(error) {
            console.error("Postcode validation failed ",error);
        } finally {
            setLoading(prev=>({ ...prev,postcode:false}));
        }
    };
    return(
        <Container maxWidth="sm">
            <Box sx={{mt:4}}>
                <Typography variant="h5" gutterBottom>
                    Customer Form
                </Typography>
        <form onSubmit={handleSubmit}>
            <TextField
            fullWidth
            margin="normal"
            label="PAN"
            variant="outlined"
            name="PAN"
            value={formData.PAN}
            onChange={(e)=>{
                handleChange(e)
                verifyPAN();
            }}

            error={!!validationErrors.PAN}
            helperText={validationErrors.PAN}
            InputProps={{
                endAdornment:loading.pan && <CircularProgress size={24} />

            }}
            />

            <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            variant="outlined"
            id="fullName" 
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={!!validationErrors.fullName}
            helperText={validationErrors.fullName}
            />

            <TextField
             fullWidth
             margin="normal"
             label="Email"
             variant="outlined"
             type="email"
             name="email"
             value={formData.email}
             onChange={handleChange}
             error={!!validationErrors.email}
             helperText={validationErrors.email}
            />

            <TextField
             fullWidth
             margin="normal"
             label="Mobile Number"
             variant="outlined"
             type="number"
             id="mobileNumber" 
             name="mobileNumber"
             value={formData.mobileNumber}
             onChange={handleChange}
             error={!!validationErrors.mobileNumber}
             helperText={validationErrors.mobileNumber}
             InputProps={{
                startAdornment:"+91 "
             }}
            />

            {formData.addresses.map((address,index)=>(
                <AddressForm
                key={index}
                address={address}
                index={index}
                handleChange={(e)=> handleAddressChange(index,e)}
                fetchPostCodeDetails={()=>fetchPostCodeDetails(index)}
                handleRemove={()=>handleRemoveAddress(index)}
                error={validationErrors.addresses?.[index]}
                loading={loading}
                />
            ))}

            <Button
            fullWidth
            variant="contained"
            color="primary"
            type="button"
            sx={{mt:2}}
            onClick={handleAddress}
            >Add Address </Button>

            <Button 
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{mt:2}}>
                Submit</Button>
        </form>
        </Box>
        </Container>
    );
};
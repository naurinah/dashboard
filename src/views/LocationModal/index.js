
import React,{useEffect,useState} from 'react';
import {
        Button, Dialog, DialogActions,
        DialogContent, DialogContentText, DialogTitle,
        MenuItem, FormControl, FormHelperText,Select,Container,
        Card, CardContent, CardHeader, Grid, makeStyles,Typography, Box, TextField, Divider,InputLabel
    } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from 'src/hooks/useAuth';
import useCities from 'src/hooks/useCities';
import { useSelector, useDispatch } from 'src/store';
import {submit_pickupLocation,bookingSelector} from 'src/slices/booking';
import Alert from '@material-ui/lab/Alert';

const styles=makeStyles((theme)=>({
  root:{
  },
  button:{
      backgroundColor:'#0047ba'
  },
  textField:{
  },
  formControl:{
    margin:theme.spacing(1),
    minWidth:'30ch',
  },
}));

const LocationModalView=({dialogPopover,className,...rest})=> {
  const classes=styles();
  const citiesDropdown=useCities;
  const [open,setOpen]=React.useState(dialogPopover);
  const [isSubmitionCompleted,setSubmitionCompleted]=useState(false);
  const [load,setLoad]=useState(0);
  const {user}=useAuth();
  const {acno}=user;
  const dispatch=useDispatch();
  const {submit_location,submit_location_error}=useSelector(bookingSelector);
  
  
  const handleClickOpen=()=>{
    setSubmitionCompleted(false);
    setOpen(true);
};


const handleClose=()=>{
    setOpen(false);
  
    
};


    return (
        // <Grid
        // container 
        // >
        //   <Grid 
        //   item
        //   lg={12}
        //   xs={12}
        //   >
                <Formik
                  initialValues={{
                    location_name:'',
                    contact_number:'',
                    location_email:'',
                    orig_city:'',
                    location_address:''
                  }}

                  validationSchema={
                    Yup.object().shape({

                    // location_name: Yup.string().max(100).required('Account is required.'),
                    // contact_number: Yup.string().max(100).required('Account title is required.'),
                    // orig_city: Yup.string().max(100).required('Name is Required.'),
                    // location_email: Yup.string().email('Must be a valid email.').max(255).required('Email is required'),
                    // location_address
                   
                })}

                onSubmit={async (values,{
                  setErrors,
                  setStatus,
                  setSubmitting,
                  resetForm
              }) => {
                  try {
                    console.log('try values');
                    console.log('values',values);
                    dispatch(submit_pickupLocation(
                      values.location_name,
                      values.contact_number,
                      values.location_email,
                      values.orig_city,
                      values.location_address,
                      acno));
                  // location,name,contact,email,origin_city,acno
                      // dispatch(UpdateProfile(values.account, values.account_title, values.name, values.address, values.cell,
                      //     values.email, values.ntn, values.cnic, values.password, user.name))
                      // NOTE: Make API reques
                      setStatus({success:true});
                      setSubmitting(false);
                      setLoad(1);
                      resetForm(true);
                      // dispatch(UpdateProfile())
                      //   enqueueSnackbar('Product Created',{
                      //   variant:'success'
                      //   });
                  }
                  catch (err) {
                    console.log('error',err);
                      setStatus({success:false });
                      setErrors({submit:err.message });
                      setSubmitting(false);
                  }
              }
              }
                  
                >
                  {(props)=>{
                    const {
                      values,
                      touched,
                      errors,
                      dirty,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      handleReset,
                    }=props;

                    return(
<Dialog
          fullWidth={true}
          maxWidth="md"
          open={open}
          onClose={handleClose}
          aria-labelledby="Calculate Fare Rate"
        >
         
              <DialogContent>
                      <Container 
                      maxWidth={false}>

                      <Box 
                      display="flex"
                      justifyContent="center"
                      >
                        <Typography 
                        variant="h3" 
                        gutterBottom>Add Pickup Location</Typography>
                        </Box>

                      
                        <Box mt={2} mb={2}>
                  {submit_location.status==1 && load==0?
                    <Alert variant="outlined" severity="success">
                      {`New pickup location has been created`}
                    </Alert> : ''}
                </Box>

                      <form 
                      onSubmit={handleSubmit}> 
                      

{/* <Grid 
container>

  <Grid item 
  xs={12} 
  lg={12}> */}



<Box mb={3}>
                                            <TextField
                                                fullWidth
                                                className={classes.textField}
                                                label="Pickup Location Name"
                                                name="location_name"
                                                size="small"
                                                placeholder="Enter your Pickup Name"
                                                onChange={handleChange}
                                                // error={Boolean(touched.location_name && errors.location_name)}
                                                // helperText={touched.location_name && errors.location_name}
                                                value={values.location_name}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>



                                        <Box mb={3}>
                                            <TextField
                                                fullWidth
                                                className={classes.textField}
                                                label="Pickup Location Contact No"
                                                name="contact_number"
                                                size="small"
                                                placeholder="Enter your pickup Location Contact No"
                                                onChange={handleChange}
                                                // error={Boolean(touched.contact_number && errors.contact_number)}
                                                // helperText={touched.contact_number && errors.contact_number}
                                                value={values.contact_number}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>



                                        <Box mb={3}>
                                            <TextField
                                                fullWidth
                                                className={classes.textField}
                                                label="Pickup Location Email"
                                                name="location_email"
                                                size="small"
                                                placeholder="Enter your pickup Location Email"
                                                onChange={handleChange}
                                                // error={Boolean(touched.location_email && errors.location_email)}
                                                // helperText={touched.location_email && errors.location_email}
                                                value={values.location_email}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>

                                       



                                        <Box mb={3}>
                                            <FormControl
                                                fullWidth
                                                className={classes.textField}
                                                size="small"
                                                variant="outlined" >
                                                {/* <InputLabel htmlFor="outlined-age-native-simple">Origin City*</InputLabel> */}
                                                <Select
                                                    native
                                                    // error={Boolean(touched.orig_city && errors.orig_city)}
                                                    // helperText={touched.orig_city && errors.orig_city}
                                                    // value={values.orig_city}
                                                    value={values.orig_city}
                                                    // value={'KHI'}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    // label="Origin City"
                                                    name='orig_city'
                                                    inputProps={{
                                                        id: 'outlined-age-native-simple',
                                                    }}
                                                >
                                                   <option aria-label="None" label="Select Origin City"></option>
                                                    {citiesDropdown ? citiesDropdown.map((option) => (
                                                        <option
                                                            key={option.CITY_CODE}
                                                            value={option.CITY_CODE}
                                                        >
                                                            {option.CITY_NAME}
                                                        </option>
                                                    )):
                                                    <option value="0">No city</option>}
                                                </Select>
                                            </FormControl>
                                        </Box>


                                        <Box mb={3}>
                                            <TextField
                                                fullWidth
                                                className={classes.textField}
                                                label="Pickup Location Address"
                                                name="location_address"
                                                size="small"
                                                placeholder="Enter your pickup Location Address"
                                                onChange={handleChange}
                                                // error={Boolean(touched.location_email && errors.location_email)}
                                                // helperText={touched.location_email && errors.location_email}
                                                value={values.location_address}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>


                                        <Box
                                            mt={1}
                                            display="flex"
                                            justifyContent="center">

                                            <Button
                                                color="primary"
                                                variant="contained"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >PickupLocation</Button>
                                        </Box>

                      </form>


                      </Container>
                      </DialogContent>
        </Dialog>

                    );
                  }}
                </Formik>
    )
}
export default LocationModalView;
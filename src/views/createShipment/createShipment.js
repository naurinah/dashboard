import React, { useEffect, useState } from 'react';
import {
    Grid, Card, CardHeader, CardContent,
    makeStyles,
    FormControl,
    FormControlLabel,
    Checkbox,
    Select,
    NativeSelect,
    Button,
    MenuItem,
    FormHelperText,
    CircularProgress,
    Divider, Box, Typography, TextField, InputLabel, Switch
} from '@material-ui/core';
import swal from 'sweetalert';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from 'src/hooks/useAuth';
import useCities from 'src/hooks/useCities';
import LocationModalView from 'src/views/LocationModal';
import {useSelector,useDispatch} from 'src/store';

import {submitBooking,bookingSelector,fetch_all_locations,fetch_selected_location} from 'src/slices/booking';


const styles = makeStyles((theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1, 0, 0, 0),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#0047ba',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#0047ba',
            border: '6px solid #fff',
        },
    },

    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
    switchLabel: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end'
        // width:'10px',
    },
    shipHeader: {
        padding: theme.spacing(2)
    },
    textField: {
        // marginBottom:'4',
        // marginRight: theme.spacing(5),
        width: '70%',
        // color: '#6f727d',
        // marginLeft: '10%',
        // backgroundColor: '#f4f5f8'
    }
}));


const SubmitShipment = () => {
    const [locations,setLocation]=useState([]);
    const [toggle,setToggle]=useState(false);
    const[progress,setprogress]=useState(false);
    const [shipper,setShipper]=useState({ID:'',NAME:'',EMAIL:'',CONTACT:'',ORI_CITY:''});
    const classes = styles();
    const cities=useCities;
    const {user}=useAuth();
    const {acno} = user;

    const dispatch = useDispatch();
    const {booking,booking_error,location,location_error,selected_Location,selected_location_error,location_loading,default_location} = useSelector(bookingSelector);

const selectHandlebar=(event)=>{
console.log('value=>',event.target.value)
console.log('id=>',event.target.id);
dispatch(fetch_selected_location(acno,event.target.value));
    
        // console.log(...selected_Location.detail[0])
        // if(selected_Location.detail!=''){
        // console.log('selected_location=',selected_Location.detail[0]);
        // }
        // const copyObject=selected_Location.detail ? {...selected_Location.detail}:[];
        // setShipper({...selected_Location.detail});
        // console.log(shipper);
        // console.log('copy_object==>',copyObject);
    }

    const loadDefaultLocation=(id)=>{
    console.log('event_target_value=>',id);
    dispatch(fetch_selected_location(acno,id));
        }

// document.getElementById("outlined-age-native-simple").addEventListener('onload',loadDefaultLocation);

useEffect(()=>{
dispatch(fetch_all_locations(acno,'all'));
// if(location.detail!=''){
// console.log('location_detail');
// dispatch(fetch_selected_location(acno,'Y'));
// }
setLocation(location.detail);
},[]);


    if(booking.status=='save'){
    // swal('success',`Your CN ${booking.cnno} has been created Successfully`, 'success');
    // swal({
    //     title: "SUCCESS:", 
    //     text: "Your CN "+booking.cnno+" has been created successfully.", 
    //     type: "success",
    //     inputType: "submit",
    //     cancelButtonText: "Print CN",
    //     confirmButtonText: 'Ok, Create Another',
    //     showCancelButton: true,
    //     closeOnConfirm: true
    // },
    //    function(isConfirm) {
    //        if (isConfirm != true) {
    //         //    window.open('http://benefit.blue-ex.com/customerportal/inc/cnprncust.php?'+a.cnno+'', '_blank');
    //        }
    //        else{
    //         //    window.location.reload();
    //        }
    //    });


       swal({
        title: "SUCCESS",
        text: "Your CN "+booking.cnno+" has been created successfully.",
        icon: "success",
        buttons: true,
        dangerMode: true,
        inputType: "submit",
        cancelButtonText: "Print CN",
        confirmButtonText: 'Ok, Create Another',
        showCancelButton: true,
        closeOnConfirm: true
      })
      .then((willDelete) => {
        if (willDelete) {
        //   swal("Poof! Your imaginary file has been deleted!", {
        //     icon: "success",
        //   });
        } else {
        //   swal("Your imaginary file is safe!");
        }
      });




    }

    
 



const checkCashCollection=(event)=>{
    console.log('id==>',event.target.id);
console.log('event==>',event.target.value);
    }

    return (
        <Formik
            initialValues={{
                con_name:'',
                con_add:'',
                con_mail:'',
                con_cont:'',
                dest_country:'PK',
                dest_city:acno.split('-')[0],
                orig_city:'',
                service_code:'BE',
                pickupLocation:'Y',

                shp_name:location_loading==false?selected_Location[0].NAME:'',
                shp_add:location_loading==false?selected_Location[0].ADDRESS:'',
                shp_mail:location_loading==false?selected_Location[0].EMAIL:'',
                shp_cont:location_loading==false?selected_Location[0].CONTACT:'',

              

                //
                prod_detail:'',
                pcs:'',
                wgt:'',
                prod_value:'',
                cust_ref:'',
                coment:'',
                ptype:true,
                document:false,
                cbc:true,
                fragile:false,
                insur:false,
                insur_value:'',
                //
                //bookingtype,storeid=NULL,salediscount
                // submit: null
            }}

            onSubmit={async (values,{
                setErrors,
                setStatus,
                setSubmitting,
                resetForm
            }) => {
                try {
                    console.log('values',values);
                    // NOTE: Make API request
                    //   await wait(1000);
                    // resetForm();
                    dispatch(
                        submitBooking(
                            values.con_name, values.con_add, values.con_mail, values.con_cont, values.dest_country,
                            values.dest_city, values.service_code, values.orig_city, values.pickupLocation, values.shp_name,
                            values.shp_add, values.shp_mail, values.shp_cont,
                            values.prod_detail, values.pcs, values.wgt,
                            values.prod_value, values.cust_ref, values.coment,
                            values.ptype,values.document, values.cbc,
                            values.fragile,values.insur,values.insur_valueacno
                        ));
                    // dispatch(submitBooking());
                    setStatus({ success: true });
                    setSubmitting(false);
                    resetForm(true);
                } catch (err) {
                    console.log(err);
                    setStatus({success:false});                 
                    setErrors({submit:err.message});
                    setSubmitting(false);
                }
            }}
            validationSchema={Yup.object().shape({
                con_name: Yup.string().required('Required'),
                con_add: Yup.string().required('Required'),
                con_mail: Yup.string().email().required('Required'),
                con_cont: Yup.string().required('Required'),



                dest_country: Yup.string().required('Required'),
                dest_city: Yup.string().required('Required'),
                service_code: Yup.string().required('Required'),
                // orig_city: Yup.string().required('Required'),


                
                // pickupLocation:Yup.string().required('Required'),
                // shipper_name:Yup.string().required('Required'),
                // shipper_email:Yup.string().required('Required'),
                // shipper_contact:Yup.string().required('Required'),
                prod_detail: Yup.string().required('Required'),
                pcs: Yup.string().required('Required'),
                wgt: Yup.string().required('Required'),
                prod_value: Yup.string().required('Required'),
                // toggle: Yup.bool().oneOf([true],"Atleast select one checkbox"),

                // product_ref:Yup.string().required('Required'),
                // remarks:Yup.string().required('Required'),
                // document:Yup.boolean().oneOf([true], 'This field must be checked'),
                // parcel:Yup.boolean().oneOf([true], 'This field must be checked'),
                // cash_collection:Yup.boolean().oneOf([true], 'This field must be checked'),
                // fragile:Yup.boolean().oneOf([true], 'This field must be checked'),
                // insurance:Yup.boolean().oneOf([true], 'This field must be checked'),

                // lastName: Yup.string().required('Required'),
                // password: Yup.string().min(7, 'Must be at least 7 characters').max(255).required('Required'),
                // policy: Yup.boolean().oneOf([true], 'This field must be checked')
            })}

        >
            {({
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
                setFieldValue,
            }) => (


                    <form
                        onSubmit={handleSubmit}
                    >
                        <Grid
                            container
                            spacing={2}>
                            <Grid
                                item
                                xs={12}
                                lg={8}
                            >
                                <Card>
                                    <CardHeader
                                        title={'Customer Details'} />
                                    <Divider />
                                    <CardContent>



                                        <Box mb={3}>
    
                                            <TextField
                                                fullWidth
                                                className={classes.textField}
                                                label="Full Name *"
                                                name="con_name"
                                                size="small"
                                                placeholder="Enter your Name"
                                                onChange={handleChange}
                                                error={Boolean(touched.full_name && errors.full_name)}
                                                helperText={touched.full_name && errors.full_name}
                                                value={values.con_name}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>


                                        <Box mb={3}>
                                            <TextField
                                                className={classes.textField}
                                                size="small"
                                                label="Address *"
                                                name="con_add"
                                                placeholder="Enter your Address"
                                                value={values.con_add}
                                                onChange={handleChange}
                                                error={Boolean(touched.con_add && errors.con_add)}
                                                helperText={touched.con_add && errors.con_add}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>




                                        <Box mb={3}>
                                            <TextField
                                                className={classes.textField}
                                                size="small"
                                                label="Email"
                                                name="con_mail"
                                                placeholder="Enter your Email"
                                                value={values.con_mail}
                                                onChange={handleChange}
                                                error={Boolean(touched.con_mail && errors.con_mail)}
                                                helperText={touched.con_mail && errors.con_mail}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>

                                        <Box mb={3}>
                                            <TextField
                                               className={classes.textField}
                                                size="small"
                                                label="Phone*"
                                                name="con_cont"
                                                placeholder="Enter your Phone"
                                                value={values.con_cont}
                                                onChange={handleChange}
                                                error={Boolean(touched.con_cont && errors.con_cont)}
                                                helperText={touched.con_cont && errors.con_cont}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>

                                        <Box mb={3}>
                                            <FormControl
                                                className={classes.textField}
                                                size="small"
                                                variant="outlined"
                                                
                                                >
                                                <InputLabel
                                                    htmlFor="outlined-age-native-simple">Destination Country*</InputLabel>
                                                <Select
                                                    native
                                                    // value={'PK'}
                                                    value={values.dest_country}
                                                    onChange={handleChange}
                                                    error={Boolean(touched.dest_country && errors.dest_country)}
                                                    // helperText={touched.dest_country && errors.dest_country}
                                                    label="Destination Country"
                                                    name="dest_country"
                                                    inputProps={{
                                                        id: 'outlined-age-native-simple',
                                                    }}
                                                >
                                                    <option aria-label="None" value="PK">PAKISTAN</option>
                                                </Select>
                                               
                                            </FormControl>
                                        </Box>



                                        <Box mb={3}>
                                            <FormControl
                                           className={classes.textField}
                                                size="small"
                                                variant="outlined">
                                                <InputLabel htmlFor="outlined-age-native-simple">Destination City*</InputLabel>
                                                <Select
                                                    native
                                                    error={Boolean(touched.dest_city && errors.dest_city)}
                                                    // helperText={touched.dest_city && errors.dest_city}
                                                    value={values.dest_city}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    label="Destination City"
                                                    name="dest_city"
                                                    inputProps={{
                                                        id: 'outlined-age-native-simple',
                                                    }}
                                                >

                                                   
                                                    {cities ? cities.map((option) => (
                                                        <option
                                                            key={option.CITY_CODE}
                                                            value={option.CITY_CODE}
                                                        >
                                                            {option.CITY_NAME}
                                                        </option>
                                                    )) :
                                                        <option value="0">
                                                        </option>}
                                                </Select>
                                            </FormControl>
                                        </Box>


                                        <Box mb={3}>
                                            <FormControl
                                                className={classes.textField}
                                                size="small"
                                                variant="outlined">
                                                <InputLabel htmlFor="outlined-age-native-simple">Service*</InputLabel>
                                                <Select
                                                    native
                                                    value={values.service_code}
                                                    error={Boolean(touched.service_code && errors.service_code)}
                                                    // helperText={touched.service_code && errors.service_code}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    label="Service*"
                                                    name='service_code'
                                                    inputProps={{
                                                        id: 'outlined-age-native-simple',
                                                    }}
                                                >
                                                    <option value={'BE'}>BLUE EDGE</option>
                                                    <option value={'BT'}>BLUE TRUNK</option>

                                                </Select>
                                            </FormControl>
                                        </Box>

                                        <Box my={2} />
                                        <Divider />
                                        <Typography
                                            className={classes.shipHeader}
                                            variant="h3"
                                            gutterBottom
                                            color="textPrimary"
                                        >
                                            Shipper Detail
        </Typography>

                                        <Divider />
                                        <Box my={2} />

                                        <Box mb={3}>
                                            <FormControl
                                                 className={classes.textField}
                                                size="small"
                                                variant="outlined" >
                                                {/* <InputLabel htmlFor="outlined-age-native-simple">Origin City*</InputLabel> */}
                                                
                                                <Select
                                                    native
                                                    // error={Boolean(touched.orig_city && errors.orig_city)}
                                                    // helperText={touched.orig_city && errors.orig_city}
                                                    // value={values.orig_city}
                                                    value={(location_loading==false && default_location=='Y' ? selected_Location[0].ORI_CITY:values.orig_city
                                                            || location_loading==false  ? selected_Location[0].ORI_CITY:values.orig_city)}
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
                                                    {cities ? cities.map((option) => (
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
                                            <FormControl
                                                 className={classes.textField}
                                                size="small"
                                                variant="outlined">
                                                <InputLabel htmlFor="outlined-age-native-simple">PickupLocation</InputLabel>
                                                <Select
                                                    id="location"
                                                    native
                                                    
                                                    defaultValue={values.pickupLocation}
                                                    // error={Boolean(touched.pickupLocation && errors.pickupLocation)}
                                                    // helperText={touched.pickupLocation && errors.pickupLocation}
                                                    onChange={handleChange,selectHandlebar}
                                                    onBlur={handleBlur}
                                                    label="pickupLocation"
                                                    name='pickupLocation'
                                                    inputProps={{
                                                        id: 'outlined-age-native-simple',
                                                    }}
                                                >



                                                 {location.detail ? location.detail.map((option) => (
                                                        <option
                                                            key={option.ID}
                                                            value={option.ID}
                                                        >
                                                            {option.LOCATION}
                                                        </option>
                                                    )) :
                                                        <option value="0">
                                                        </option>}
                                                </Select>
                                            </FormControl>
                                        </Box>


                                        {location_loading==false ?
                                            <Box>
                                                <Box mb={3}>
                                                    <TextField
                                                         className={classes.textField}
                                                        size="small"
                                                        
                                                        label="Shipper Name"
                                                        name="shp_name"
                                                        // value={values.shp_name}
                                                        value={selected_Location[0].NAME}
                                                        onChange={handleChange}
                                                        // error={Boolean(touched.shipper_name && errors.shipper_name)}
                                                        // helperText={touched.shipper_name && errors.shipper_name}
                                                        variant="outlined"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                          }}
                                                    />
                                                </Box>


                                                <Box mb={3}>
                                                    <TextField
                                                         className={classes.textField}
                                                         size="small"
                                                        label="Shipper Address"
                                                        name="shp_add"
                                                        // value={values.shp_add}
                                                        value={selected_Location[0].LOCATION}
                                                        onChange={handleChange}
                                                         // error={Boolean(touched.shipper_email && errors.shipper_email)}
                                                        // helperText={touched.shipper_email && errors.shipper_email}
                                                        variant="outlined"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                          }}
                                                    />
                                                </Box>

                                                <Box mb={3}>
                                                    <TextField
                                                         className={classes.textField}
                                                         size="small"
                                                        label="Shipper Email"
                                                        name="shp_mail"
                                                        // value={values.shp_mail}
                                                        value={selected_Location[0].EMAIL}
                                                        onChange={handleChange}
                                                         // error={Boolean(touched.shipper_email && errors.shipper_email)}
                                                        // helperText={touched.shipper_email && errors.shipper_email}
                                                        variant="outlined"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                          }}
                                                    />
                                                </Box>

                                                <Box
                                                    display="flex"
                                                    flexGrow={1}
                                                    mb={3}>

                                                    <TextField
                                                        className={classes.textField}
                                                        size="small"
                                                        label="Shipper Contact"
                                                        name="shp_cont"
                                                        // value={values.shp_cont}

                                                        value={selected_Location[0].CONTACT}
                                                        onChange={handleChange}
                                                        error={Boolean(touched.shp_cont && errors.shp_cont)}
                                                        helperText={touched.shp_cont && errors.shp_cont}
                                                        variant="outlined"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                          }}
                                                    />
                                                </Box>
                                            </Box>
                                            : 
                                            <Box
                                                display="flex"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                            >
                                                <CircularProgress />
                                            </Box>}

<Box 
display="flex"
justifyContent="flex-end"
alignItems="center"
>


<Button
                                                   variant="contained"
                                                   color="primary"
                                                   size="small"
                                                   onClick={()=>{
                                                       setToggle(!toggle)
                                                   }}
                                               >
                                                   Add PickupLocation
</Button>




{toggle==true ? <LocationModalView dialogPopover={toggle} />:false}


</Box>
                                        <Box my={2} />
                                        <Divider />
                                        <Typography
                                            className={classes.shipHeader}
                                            variant="h3"
                                            gutterBottom
                                            color="textPrimary"
                                        >
                                            Shipment Detail
        </Typography>

                                        <Divider />
                                        <Box my={2} />

                                        <Box mb={3}>
                                            <TextField
                                                className={classes.textField}
                                                size="small"
                                                label="Product Name*"
                                                placeholder="Blue T-Shirt"
                                                name="prod_detail"
                                                value={values.prod_detail}
                                                onChange={handleChange}
                                                error={Boolean(touched.prod_detail && errors.prod_detail)}
                                                helperText={touched.prod_detail && errors.prod_detail}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>

                                        <Box mb={3}>
                                            <TextField
                                                 className={classes.textField}
                                                 size="small"
                                                label="Peices*"
                                                placeholder="1"
                                                name="pcs"
                                                value={values.pcs}
                                                onChange={handleChange}
                                                error={Boolean(touched.pcs && errors.pcs)}
                                                helperText={touched.pcs && errors.pcs}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>



                                        <Box mb={3}>
                                            <TextField
                                                className={classes.textField}
                                                size="small"
                                                label="Weight(kg)*"
                                                type="number"
                                                placeholder="0.5"
                                                name="wgt"
                                                value={values.wgt}
                                                onChange={handleChange}
                                                error={Boolean(touched.wgt && errors.wgt)}
                                                helperText={touched.wgt && errors.wgt}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />


                                            <Box mb={1}>
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                >
                                                    Note:NOTE: This is not the final weight.Subject to the confirmation at Blue-Ex Operations.
     </Typography>

                                            </Box>
                                        </Box>
                                        <Box mb={3}>
                                            <TextField
                                                className={classes.textField}
                                                size="small"
                                                label="Product Value (Rs.) *"
                                                placeholder="1500"
                                                name="prod_value"
                                                value={values.prod_value}
                                                onChange={handleChange}
    
                                                error={Boolean(touched.prod_value && errors.prod_value)}
                                                helperText={touched.prod_value && errors.prod_value}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>

                                        <Box mb={3}>
                                            <TextField
                                               
                                               className={classes.textField}
                                               size="small"
                                                label="Product Ref"
                                                placeholder="S-90091"
                                                name="cust_ref"
                                                value={values.cust_ref}
                                                onChange={handleChange}
                                                 // error={Boolean(touched.product_ref && errors.product_ref)}
                                                // helperText={touched.product_ref && errors.product_ref}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>


                                        <Box mb={3}>
                                            <TextField
                                                
                                                className={classes.textField}
                                                size="small"
                                                label="Remarks"
                                                multiline
                                                rows={3}
                                                placeholder="This Exchange product size,Medium"
                                                name="coment"
                                                value={values.coment}
                                                onChange={handleChange}
                                                // error={Boolean(touched.remarks && errors.remarks)}
                                                // helperText={touched.remarks && errors.remarks}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>

                                        {/* <Box mb={2}>
                                            <Button
                                                size="large"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={isSubmitting}
                                                >
                                                Book Now
    </Button>
                                        </Box> */}
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                lg={4}
                            >
                                <Card>
                                    <CardHeader title={'Shipment Options'} />
                                    <Divider />
                                    <CardContent>
                                        <Box mb={2}>
                                            <Typography
                                                variant="h6"
                                                gutterBottom >
                                                Services *
                                            </Typography>
                                        </Box>


                                        <Box mb={2}>
                                            <Button size="small" variant="contained" color="primary">
                                                COD
                                            </Button>
                                        </Box>


                                        <Box my={6} />
                                        <Divider />



                                        <Box
                                            my={3} />
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            mb={3}>

                                            <Box ml={2}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={values.document}
                                                            // error={Boolean(touched.document && errors.document)}
                                                            // helperText={touched.document && errors.document}
                                                            onChange={handleChange}
                                                            name="document"
                                                            // name="check"
                                                            color="primary"
                                                            value={values.document}
                                                        />
                                                    }
                                                    label="Document"
                                                />
                                            </Box>

                                            <Box>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                        checked={values.ptype}
                                                            // error={Boolean(touched.parcel && errors.parcel)}
                                                            // helperText={touched.parcel && errors.parcel}
                                                            onChange={handleChange}
                                                            name="ptype"
                                                            // name="check"
                                                            color="primary"
                                                            // value={values.ptype==true?'Y':'N'}
                                                            value={values.ptype}
                                                        />
                                                    }
                                                    label="Parcel"
                                                />
                                            </Box>
                                        </Box>


                                        <Box>
                                            <FormControlLabel
                                                className={classes.switchLabel}
                                                value="start"
                                                control={
                                                    <Switch
                                                        checked={values.cbc}
                                                        name="cbc"
                                                        // error={Boolean(touched.cash_collection && errors.cash_collection)}
                                                        onChange={handleChange}
                                                        // focusVisibleClassName={classes.focusVisible}
                                                        // disableRipple
                                                        // classes={{
                                                        //     root: classes.root,
                                                        //     switchBase: classes.switchBase,
                                                        //     thumb: classes.thumb,
                                                        //     track: classes.track,
                                                        //     checked: classes.checked,
                                                        // }}
                                                       
                                                        // value={values.cbc==true ?'Y':'N'}
                                                        value={values.cbc}
                                                    />
                                                }
                                                label="Cash Collection"
                                                labelPlacement="start"
                                            />
                                        </Box>
                                        
                                        {values.prod_value==='0' && values.cbc==true ?
                                        <Box mt={3}>
<FormHelperText style={{color:'red',textAlign:'center'}}>Product Value can not be Rs. 0 if Cash Collection is turned on.</FormHelperText>


                                        </Box>:''}
                                        <Box
                                            display="flex">
                                            <FormControlLabel
                                                className={classes.switchLabel}
                                                value="start"
                                                control={
                                                    <Switch
                                                        name="fragile"
                                                        checked={values.fragile}
                                                        // error={Boolean(touched.fragile && errors.fragile)}
                                                        // helperText={touched.fragile && errors.fragile}
                                                        // focusVisibleClassName={classes.focusVisible}
                                                        // disableRipple
                                                        // classes={{
                                                        //     root: classes.root,
                                                        //     switchBase: classes.switchBase,
                                                        //     thumb: classes.thumb,
                                                        //     track: classes.track,
                                                        //     checked: classes.checked,
                                                        // }}
                                                        onChange={handleChange}
                                                        
                                                        // value={values.fragile==true ?'Y':'N'}
                                                        value={values.fragile}
                                                    />
                                                }
                                                label="Fragile"
                                                labelPlacement="start"
                                            />
                                        </Box>

                                        <Box display="flex">
                                            <FormControlLabel
                                                className={classes.switchLabel}
                                                value="start"
                                                control={
                                                    <Switch
                                                        name="insur"
                                                        checked={values.insur}

                                                        // error={Boolean(touched.insurance && errors.insurance)}
                                                        // helperText={touched.insurance && errors.insurance}
                                                        onChange={handleChange}
                                                        // focusVisibleClassName={classes.focusVisible}
                                                        // disableRipple
                                                        // classes={{
                                                        //     root: classes.root,
                                                        //     switchBase: classes.switchBase,
                                                        //     thumb: classes.thumb,
                                                        //     track: classes.track,
                                                        //     checked: classes.checked,
                                                        // }}
                                                        // value={values.insur==true ?'Y':'N'}
                                                        value={values.insur}
                                                       
                                                    />
                                                }
                                                label="Insurance"
                                                labelPlacement="start"
                                            />
                                        </Box>

                                        {values.insur==true ?
                                        <Box mt={3}>
                                            <TextField
                                             
                                                className={classes.textField}
                                                // error={Boolean(touched.insur_value && errors.insur_value)}
                                                // helperText={touched.insur_value && errors.insur_value}
                                                label="Insurance Value *"
                                                name="insur_value"
                                                size="small"
                                                placeholder="Insurance Value"
                                                onChange={handleChange}
                                                value={values.insur_value}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>:''}

                                        <Divider />

                                        <Box
                                            mt={3}
                                            display="flex"
                                            justifyContent='space-between'>
                                            <Typography variant="h6" gutterBottom>
                                                Cash Collection
                                            </Typography>
                                            <Typography variant="h6" gutterBottom>
                                                0
                                            </Typography>
                                        </Box>



                                        <Box mb={2}>
                                            <Button
                                                size="large"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Book Now
    </Button>
                                        </Box>



                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {
                            errors.submit && (
                                <Box mt={1}>
                                    <FormHelperText error>
                                        {errors.submit}
                                    </FormHelperText>
                                </Box>
                            )
                        }
                    </form>
                )
            }
        </Formik>
    )
}
export default React.memo(SubmitShipment)

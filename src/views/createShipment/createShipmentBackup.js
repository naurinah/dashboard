import React from 'react';
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
// import IosSwitch from 'src/components/IosSwitch';
import checkBox from 'src/components/checkBox';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Header from './header';
const styles = makeStyles((theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1, 0, 0, 0),
    },
    switchBase:{
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
        transition: theme.transitions.create(['background-color','border']),
    },
    checked: {},
    focusVisible: {},
    switchLabel: {
        display: 'flex',
        flexGrow: 1,
        justifyContent:'space-between',
        alignItems:'flex-end'
        // width:'10px',
    },



    shipHeader: {
        padding: theme.spacing(2)
    },
    textField: {
        // marginBottom:'4',
        // marginRight: theme.spacing(5),
        width: '50ch',
        // color: '#6f727d',
        // marginLeft: '10%',
        // backgroundColor: '#f4f5f8'
    }
}));
const createShipment = () => {
const classes = styles();

const selectHandlebar=(event)=>{
console.log(event.target.value);
    }


    return (
        <Formik
            initialValues={{
                full_name: '',
                address: '',
                email: '',
                phone: '',
                destination_country: '',
                destination_city: '',
                pickupLocation: '',
                shipper_name: '',
                shipper_email: '',
                shipper_contact: '',
                product_name: '',
                peice: '',
                weight: '',
                product_value: '',
                product_ref: '',
                remarks: '',
                document: '',
                parcel: '',
                cash_collection:'',
                fragile:'',
                insurance:'',
                // submit: null
            }}
            validationSchema={Yup.object().shape({
                full_name:Yup.string().required('Required'),
                address:Yup.string().required('Required'),
                email:Yup.string().email().required('Required'),
                phone:Yup.string().required('Required'),
                destination_country:Yup.string().required('Required'),
                destination_city:Yup.string().required('Required'),
                pickupLocation:Yup.string().required('Required'),
                shipper_name:Yup.string().required('Required'),
                shipper_email:Yup.string().required('Required'),
                shipper_contact:Yup.string().required('Required'),
                product_name:Yup.string().required('Required'),
                peice:Yup.string().required('Required'),
                weight:Yup.string().required('Required'),
                product_value:Yup.string().required('Required'),
                product_ref:Yup.string().required('Required'),
                remarks:Yup.string().required('Required'),
                document:Yup.string().required('Required'),
                parcel:Yup.string().required('Required'),
                cash_collection:Yup.string().required('Required'),
                fragile:Yup.string().required('Required'),
                insurance:Yup.string().required('Required'),
                // lastName: Yup.string().required('Required'),
                // password: Yup.string().min(7, 'Must be at least 7 characters').max(255).required('Required'),
                // policy: Yup.boolean().oneOf([true], 'This field must be checked')
            })}
            onSubmit={async(values, {
                resetForm,
                setErrors,
                setStatus,
                setSubmitting
            }) => {
                try {
                    console.log('values=>',values);
                    console.log('try block');
                    // NOTE: Make API request
                    //   await wait(1000);
                    // resetForm();
                    setStatus({success:true});
                    setSubmitting(false);

                } catch (err){
                    console.log(err);
                    console.log(err.message);
                    setStatus({success:false});
                    setErrors({submit:err.message });
                    setSubmitting(false);
                }
            }}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                touched,
                values
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
                                                error={Boolean(touched.full_name && errors.full_name)}
                                                helperText={touched.full_name && errors.full_name}
                                                label="Full Name *"
                                                name="full_name"
                                                size="small"
                                                placeholder="Enter your Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.full_name}
                                                variant="outlined"
                                            />
                                        </Box>


                                        <Box mb={3}>
                                            <TextField
                                                fullWidth
                                                error={Boolean(touched.address && errors.address)}
                                                size="small"
                                                helperText={touched.address && errors.address}
                                                label="Address"
                                                name="address"
                                                placeholder="Enter your Address"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.address}
                                                variant="outlined"
                                            />
                                        </Box>

                                        <Box mb={3}>
                                            <TextField
                                                error={Boolean(touched.email && errors.email)}
                                                fullWidth
                                                size="small"
                                                helperText={touched.email && errors.email}
                                                label="Email"
                                                name="email"
                                                placeholder="Enter your Email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.email}
                                                variant="outlined"
                                            />
                                        </Box>

                                        <Box mb={3}>
                                            <TextField
                                                error={Boolean(touched.phone && errors.phone)}
                                                fullWidth
                                                size="small"
                                                helperText={touched.phone && errors.phone}
                                                label="Phone*"
                                                name="phone"
                                                placeholder="Enter your Phone"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.phone}
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box mb={3}>
                                            <FormControl
                                                fullWidth
                                                size="small"
                                                variant="outlined">
                                                <InputLabel 
                                                htmlFor="outlined-age-native-simple">Destination Country*</InputLabel>
                                                <Select
                                                    error={Boolean(touched.destination_country && errors.destination_country)}
                                                    helperText={touched.destination_country && errors.destination_country}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}

                                                    native
                                                    label="Destination Country"
                                                    inputProps={{
                                                        name: 'destination_country',
                                                        id: 'outlined-age-native-simple',
                                                    }}
                                                >
                                                     <option aria-label="None" value=""></option>
                                                    <option aria-label="None" value="PK">PAKISTAN</option>
                                                   
                                                </Select>
                                            </FormControl>
                                        </Box>

                                        <Box mb={3}>
                                            <FormControl
                                                fullWidth
                                                size="small"
                                                variant="outlined">
                                                <InputLabel htmlFor="outlined-age-native-simple">Destination City*</InputLabel>
                                                <Select
                                                    native
                                                    error={Boolean(touched.destination_city && errors.destination_city)}
                                                    helperText={touched.destination_city && errors.destination_city}
                                                    onChange={handleChange}
                                                    label="Destination City"
                                                    inputProps={{
                                                        name: 'destination_city',
                                                        id: 'outlined-age-native-simple',
                                                    }}
                                                >
                                                    <option aria-label="None" value="" />
                                                    <option value={10}>Ten</option>
                                                    <option value={20}>Twenty</option>
                                                    <option value={30}>Thirty</option>
                                                </Select>
                                            </FormControl>
                                        </Box>

                                        <Box mb={3}>
                                            <FormControl
                                                fullWidth
                                                size="small"
                                                variant="outlined">
                                                <InputLabel htmlFor="outlined-age-native-simple">Service*</InputLabel>
                                                <Select
                                                    native
                                                    error={Boolean(touched.service && errors.service)}
                                                    helperText={touched.service && errors.service}
                                                    onChange={handleChange}
                                                    label="Service"
                                                    inputProps={{
                                                        name: 'service',
                                                        id:'outlined-age-native-simple',
                                                    }}
                                                >
                                                    <option value={10}>BLUE EDGE</option>
                                                    <option value={20}>BLUE TRUNK</option>
                                                   
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
                                                fullWidth
                                                size="small"
                                                variant="outlined" >
                                                <InputLabel htmlFor="outlined-age-native-simple">Origin City*</InputLabel>
                                                <Select
                                                    native
                                                    error={Boolean(touched.origin_city && errors.origin_city)}
                                                    helperText={touched.origin_city && errors.origin_city}
                                                    onChange={handleChange,selectHandlebar}
                                                    label="Origin City"
                                                    inputProps={{
                                                        name:'origin_city',
                                                        id:'outlined-age-native-simple',
                                                    }}
                                                >
                                                    <option aria-label="None" value="Lahore">Lahore</option>
                                                    <option aria-label="None" value="Karachi">Karachi</option>
                                                </Select>
                                            </FormControl>


                                        </Box>

                                        <Box mb={3}>
                                            <FormControl
                                                fullWidth
                                                size="small"
                                                variant="outlined">
                                                <InputLabel htmlFor="outlined-age-native-simple">PickupLocation</InputLabel>
                                                <Select
                                                    native
                                                    error={Boolean(touched.pickupLocation && errors.pickupLocation)}
                                                    helperText={touched.pickupLocation && errors.pickupLocation}
                                                    onChange={handleChange}
                                                    label="pickupLocation"
                                                    inputProps={{
                                                        name: 'pickupLocation',
                                                        id: 'outlined-age-native-simple',
                                                    }}
                                                >
                                                    <option aria-label="None" value="" />
                                                    <option value={10}>Ten</option>
                                                    <option value={20}>Twenty</option>
                                                    <option value={30}>Thirty</option>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        {1==1 ?
                                            <Box>
                                                <Box mb={3}>
                                                    <TextField
                                                        error={Boolean(touched.shipper_name && errors.shipper_name)}
                                                        fullWidth
                                                        size="small"
                                                        helperText={touched.shipper_name && errors.shipper_name}
                                                        label="Shipper Name"
                                                        name="shipper_name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.shipper_name}
                                                        variant="outlined"
                                                    />
                                                </Box>

                                                <Box mb={3}>
                                                    <TextField
                                                        error={Boolean(touched.shipper_email && errors.shipper_email)}
                                                        fullWidth
                                                        size="small"
                                                        helperText={touched.shipper_email && errors.shipper_email}
                                                        label="Shipper Email"
                                                        name="shipper_email"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.shipper_email}
                                                        variant="outlined"
                                                    />
                                                </Box>

                                                <Box
                                                    display="flex"
                                                    flexGrow={1}
                                                    mb={3}>

                                                    <TextField
                                                        error={Boolean(touched.shipper_contact && errors.shipper_contact)}
                                                        fullWidth
                                                        size="small"
                                                        helperText={touched.shipper_contact && errors.shipper_contact}
                                                        label="Shipper Contact"
                                                        name="shipper_contact"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.shipper_contact}
                                                        variant="outlined"
                                                    />


                                                    {/* <FormControlLabel
  value="start"
            control={<TextField
                   error={Boolean(touched.shipper_contact && errors.shipper_contact)}
                   fullWidth 
                   style={{marginLeft:'100px'}}
                   size="small"
                   helperText={touched.shipper_contact && errors.shipper_contact}
                   label="Shipper Contact"
                   name="shipper_contact"
                   onBlur={handleBlur}
                   onChange={handleChange}
                   value={values.shipper_contact}
                   variant="outlined"
               />}
            label="JShipper Contact"
            labelPlacement="start"
          /> */}

                                                </Box>
                                            </Box>
                                            : <Box
                                                display="flex"
                                                justifyContent="flex-end"
                                                alignItems="center"
                                            >

                                                <CircularProgress  />


                                                <Button
                                                    variant="contained" 
                                                    color="primary"
                                                    size="small"
                                                >
                                                    Add PickupLocation
</Button>

                                            </Box>}


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
                                                error={Boolean(touched.product_name && errors.product_name)}
                                                fullWidth
                                                size="small"
                                                helperText={touched.product_name && errors.product_name}
                                                label="Product Name*"
                                                placeholder="Blue T-Shirt"
                                                name="product_name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.product_name}
                                                variant="outlined"
                                            />
                                        </Box>


                                        <Box mb={3}>
                                            <TextField
                                                error={Boolean(touched.peice && errors.peice)}
                                                fullWidth
                                                size="small"
                                                helperText={touched.peice && errors.peice}
                                                label="Peices*"
                                                placeholder="1"
                                                name="peice"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.peice}
                                                variant="outlined"
                                            />
                                        </Box>



                                        <Box mb={3}>
                                            <TextField
                                                error={Boolean(touched.weight && errors.weight)}
                                                fullWidth
                                                size="small"
                                                helperText={touched.weight && errors.weight}
                                                label="Weight(kg)*"
                                                placeholder="0.5"
                                                name="weight"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.weight}
                                                variant="outlined"
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
                                                error={Boolean(touched.product_value && errors.product_value)}
                                                fullWidth
                                                size="small"
                                                helperText={touched.product_value && errors.product_value}
                                                label="Product Value (Rs.) *"
                                                placeholder="1500"
                                                name="product_value"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.product_value}
                                                variant="outlined"
                                            />
                                        </Box>

                                        <Box mb={3}>
                                            <TextField
                                                error={Boolean(touched.product_ref && errors.product_ref)}
                                                fullWidth
                                                size="small"
                                                helperText={touched.product_ref && errors.product_ref}
                                                label="Product Ref"
                                                placeholder="S-90091"
                                                name="product_ref"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.product_ref}
                                                variant="outlined"
                                            />
                                        </Box>


                                        <Box mb={3}>
                                            <TextField
                                                error={Boolean(touched.remarks && errors.remarks)}
                                                fullWidth
                                                size="small"
                                                
                                                helperText={touched.remarks && errors.remarks}
                                                label="Remarks"
                                                placeholder="S-90091"
                                                name="remarks"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.remarks}
                                                variant="outlined"
                                            />
                                        </Box>

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
                                            <Button    size="small" variant="contained" color="primary">
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
                                                            // checked={1}
                                                            error={Boolean(touched.document && errors.document)}
                                                            helperText={touched.document && errors.document}
                                                            onChange={handleChange}
                                                            name="document"
                                                            color="primary"
                                                        />
                                                    }
                                                    label="Document"
                                                />
                                            </Box>

                                            <Box>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            // checked={1}
                                                            error={Boolean(touched.parcel && errors.parcel)}
                                                            helperText={touched.parcel && errors.parcel}
                                                            onChange={handleChange}
                                                            name="parcel"
                                                            color="primary"
                                                        />
                                                    }
                                                    label="Parcel"
                                                />
                                            </Box>
                                        </Box>

                                        <Box display="flex">
                                            <FormControlLabel
                                                className={classes.switchLabel}
                                                value="start"
                                                control={
                                                    <Switch
                                                        name="cash_collection"
                                                        focusVisibleClassName={classes.focusVisible}
                                                        disableRipple
                                                      
                                                    />
                                                }
                                                label="Cash Collection"
                                                labelPlacement="start"
                                            />
                                        </Box>

                                        <Box
                                            display="flex">
                                            <FormControlLabel
                                                className={classes.switchLabel}
                                                value="start"
                                                control={
                                                    <Switch
                                                    name="fragile"
                                                        focusVisibleClassName={classes.focusVisible}
                                                        disableRipple
                                                       
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
                                                    name="insurance"
                                                        focusVisibleClassName={classes.focusVisible}
                                                        disableRipple
                                                        classes={{
                                                            root: classes.root,
                                                            switchBase:classes.switchBase,
                                                            thumb:classes.thumb,
                                                            track:classes.track,
                                                            checked:classes.checked,
                                                        }}
                                                    />
                                                }
                                                label="Insurance"
                                                labelPlacement="start"
                                            />
                                        </Box>

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
                                        {errors.submit}uuuuuuu
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

export default createShipment;

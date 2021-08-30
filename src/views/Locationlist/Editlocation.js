import React,{useState} from 'react';
import {Grid,Button,makeStyles,FormControl, FormHelperText,Select,Dialog,DialogActions,DialogContent,DialogTitle,DialogContentText,TextField,Box} from '@material-ui/core';
import { useSelector, useDispatch } from 'src/store';
import * as Yup from 'yup';
import {Formik} from 'formik';
import useCities from 'src/hooks/useCities';
import Alert from '@material-ui/lab/Alert';
import swal from 'sweetalert';

const useStyles=makeStyles((theme)=>({
root:{

}
}));



const Editlocation=({dialogPopover,data,editfunc,acno,editdata})=>{
    const [loads,setLoads]=useState(0);
    const classes=useStyles();
    const citiesDropdown=useCities;
    const dispatch = useDispatch();
    const [open, setOpen]=useState(dialogPopover);
    console.log('edit data',editdata);

const submit_request=()=>{
// dispatch(editfunc(data[0],data[1],data[2],data[3],data[4],data[5],acno));
}
const handleClickOpen=()=>{
        setOpen(true);
    };
    
    const handleClose=()=>{
        setOpen(false);
        setLoads(0);
        // ["test", "090078601", "test@gmail.com", "LHE", "test@gmail.com", "2646"]
    };
    
    console.log('edit data',editdata);
    console.log('loaddd',loads);
    return (

            <Formik
            initialValues={{
                location_name:data[0],
                location_contact:data[1],
                location_email:data[2],
                orig_city:data[3],
                location_address:data[4],
                id:data[5],
                acno:acno
            }}
validationSchema={Yup.object().shape({
location_name:Yup.string().max(50).required('Name is required.'),
location_contact:Yup.string().max(50).required('Contact is required.'),
location_email:Yup.string().max(50).required('Email is required.'),
location_address:Yup.string().max(50).required('Address is required.')
})}
            
onSubmit={ async(values,
                {
                    setErrors,
                    setStatus,
                    setSubmitting
                }
                )=>{
                    try{
console.log('try block');
console.log('values=>',values);

dispatch(
    editfunc(
    values.location_name,
    values.location_contact,
    values.location_email,
    values.orig_city,
    values.location_address,
    values.id,
    values.acno
    )
    );
   

setStatus({success:true});
setSubmitting(false);
setLoads(1);
} 

catch(err){
console.log(err);
console.log('message==',err);
setStatus({success:false});
setErrors({submit:err.message});
setSubmitting(false);
}
            }}
            >
                {
                    (props)=>{
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
                            <Grid>
                                <Grid 
                                item
                                lg={12}
                                xs={12}
                                >

 <Dialog 
fullWidth={true}
maxWidth="md"
 open={open} 
 onClose={handleClose} 
 aria-labelledby="form-dialog-title">
        <DialogContent>

        <Box mt={2} mb={2}>
                  {editdata.status==="1" && loads==1?
                    <Alert variant="outlined" severity="success">
                      {`New pickup location has been updated`}
                    </Alert> : ''}
                </Box>

                {/* {delete_data.status==1 ? alert("PickupLocation deleted successfully."):''} */}
       
       
        <form 
        onSubmit={handleSubmit}> 
        <Box mb={3}>
                                            <TextField
                                                fullWidth
                                                label="Pickup Location Name"
                                                name="location_name"
                                                size="small"
                                                placeholder="Enter your Location Name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
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
                                                label="Pickup Location Contact Number"
                                                name="location_contact"
                                                size="small"
                                                placeholder="Enter your Pickup Number"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                // error={Boolean(touched.location_contact && errors.location_contact)}
                                                // helperText={touched.location_contact && errors.location_contact}
                                                value={values.location_contact}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>

                                        <Box mb={3}>
                                            <TextField
                                                fullWidth
                                                label="Pickup Location Email"
                                                name="location_email"
                                                size="small"
                                                placeholder="Enter your Location Email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
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
                                                label="Pickup Location Address"
                                                name="location_address"
                                                size="small"
                                                placeholder="Enter your Location Address"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                // error={Boolean(touched.location_address && errors.location_address)}
                                                // helperText={touched.location_address && errors.location_address}
                                                value={values.location_address}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Box>

          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          /> */}


<Box
                                            mt={1}
                                            display="flex"
                                            justifyContent="center">
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >UpdateLocation</Button>
                                        </Box>

</form>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
          {/* <Button onClick={handleClose} color="primary">
            Subscribe
          </Button> */}
          {/* <Button onClick={submit_request}>
Submit Request
          </Button> */}
        </DialogActions>
      </Dialog>
                        </Grid>
                        </Grid>
                        )}}
            </Formik>

        
    )
}
 export default Editlocation;
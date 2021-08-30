import React from 'react';
import {Button,Dialog,DialogActions,
  DialogContent,DialogContentText,DialogTitle,
  Card,CardContent,CardHeader,Grid,makeStyles,Box,TextField,Divider,Typography
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as Yup from 'yup';
import {Formik} from 'formik';
const styles=makeStyles((theme)=>({
  root: {
    flexGrow:1
  },
  button:{
      backgroundColor:'#0047ba'
  }
}))

const AlertDialog=({dialogPopover,className,...rest})=>{
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes=styles();
// const {dialogPopover}=props;

const [open, setOpen]=React.useState(dialogPopover);

const handleClickOpen=()=>{
console.log('opener');
setOpen(true);
  };

const handleClose=()=>{
console.log('closer')
setOpen(false);
  };
return(
<>
{/* 
      <Button 
      variant="outlined" 
      color="primary" 
      onClick={handleClickOpen}>
       Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle 
        id="alert-dialog-title">
          {"Use Google's location service?"}
          </DialogTitle>
        <Formik 
initialValues={{
  location_name:'',
  location_contact:'',
  location_email:'',
  location_origin:'',
  location_address:'',
}}
validationSchema={
  Yup.object().shape({
  location_name:Yup.string().max(10).required('Location Name is required.'),
  location_contact:Yup.string().max(10).required('Location Contact is required.'),
  location_email:Yup.string().max(10).required('Location Email is required.'),
  location_origin:Yup.string().max(10).required('Location Origin is required.'),
  location_address:Yup.string().max(10).required('Location Address is required.'),

})}
onSubmit={async (values,{
  setErrors,
  setStatus,
  setSubmitting
})=>{
  try{
      // NOTE: Make API request
      setStatus({success:true});
      setSubmitting(false);
      // dispatch(UpdateProfile())
      //   enqueueSnackbar('Product Created',{
      //   variant:'success'
      //   });
  }
  catch (err){
console.log(err.message);
setStatus({success:false});
setErrors({submit:err.message});
setSubmitting(false);

  }
}
}
>
  {
    ({
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting,
      setFieldValue,
      touched,
      values
    })=>(
    <form 
    onSubmit={handleSubmit}
    className={clsx(classes.root,className)}
    {...rest}>
<Grid 
container
>
<Grid 
item 
lg={12} 
xs={12}
>
<Card>

<CardHeader 
title="pickup Location"/>
<Divider />

<CardContent>
<Box
mb={1}
display="flex"
flexDirection="row"
justifyContent="space-between"
alignItems="flex-start"
>
                                            <Typography
                                                gutterbottom
                                                variant="body2">Name:</Typography>
                                            <TextField
                                                error={Boolean(touched.account && errors.account)}
                                                fullWidth
                                                helperText={touched.account && errors.account}
                                                label="Account"
                                                name="account"
                                                 placeholder="Enter a Account"
                                                value={values.account}
                                                variant="outlined"
                                            />
                                        </Box>

</CardContent>
</Card>
</Grid>
</Grid>
</form>
)
  }
</Formik>
<DialogContent>
{/* 
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default AlertDialog;

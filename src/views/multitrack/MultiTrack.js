import React,{useState,useEffect}from 'react'
import {Grid,Box,TextField,FormHelperText,makeStyles,withStyles,Card,CardContent,Button,
  Paper,Typography,CircularProgress,Stepper,Step,StepLabel,StepConnector} from '@material-ui/core';
import {
Timeline,TimelineItem,TimelineSeparator,TimelineDot,
TimelineConnector,TimelineContent,TimelineOppositeContent} from '@material-ui/lab';
import VisibilityIcon from '@material-ui/icons/Visibility';
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutlineIcon';
// import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilledIcon';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import Connector from './Connectors';
import clsx from 'clsx';
import * as Yup from 'yup';
import {Formik} from 'formik';
import useAuth from 'src/hooks/useAuth';
import {useSelector,useDispatch} from 'src/store';
import {multiTrackSelector,fetch_MultiTrackSubset1,fetch_MultiTrackSubset2,multiTrackingRecord} from 'src/slices/multitrack';
const Styles=makeStyles((theme) =>({
    root: {
    },
    textField: {
      // marginBottom:'4',
      marginRight: theme.spacing(3),
      width: '70%',
     
      // color: '#6f727d',
      // marginLeft: '10%',
      // backgroundColor: '#f4f5f8'
  },
    boxItem:{
     
      backgroundColor:'#fcfaf5!important'
    },
    Heading:{
      padding:theme.spacing(3,0,0,0),
    },
    paper: {
      padding:'6px 16px',
    },
    timeline: {
        transform: "rotate(90deg)"
      },
      timelineContentContainer: {
        textAlign: "left"
      },
      timelineContent: {
        display: "inline-block",
        transform: "rotate(-90deg)",
        textAlign: "center",
        minWidth: 50
      },
      timelineIcon: {
        transform: "rotate(-90deg)"
      }
}));



const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
    
  },
  active: {        
      backgroundImage:
        'linear-gradient( 136deg, rgb(2,56,110) 0%, rgb(0,73,141) 50%, rgb(191,191,255) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(2,56,110) 0%, rgb(0,73,141) 50%, rgb(191,191,135) 100%)',
    },
  line: {
    height: 3,
    border: 0,
    backgroundColor:'#00498D',
    borderRadius: 1,
  },
})(StepConnector);

const MultiTrack=({className,...rest})=>{
const [loading,setLoading]=useState(false);
const steps =['Booked','Received at BlueEx','InTransit','Out For Delivery','Delivered'];
const {user}=useAuth();
const classes=Styles();
const dispatch=useDispatch();


const {
    Multitrack,MultitrackError,MultitrackLoading,
    PostMultiTrack,PostMultiTrackLoading,PostMultiTrackError}=useSelector(multiTrackSelector);
    // useEffect(()=>{
//     setMultitrack(multiTrack.detail)
// },[multiTrack]);

useEffect(()=>{

},[])

return(
<Formik
initialValues={{
tracking:'',
}}
validationSchema={Yup.object().shape({
tracking:Yup.string().max(160).required('Tracking Number is Required.'),
})}
onSubmit={async (values,{
    setErrors,
    setStatus,
    setSubmitting
})=>{
    try{
      console.log(values);
      // dispatch(fetch_MultiTrackSubset1(user.name,user.password,values.tracking));
      dispatch(multiTrackingRecord(user.name,user.password,values.tracking));
      // dispatch(fetch_MultiTrackSubset2(values.tracking,user.name,user.password));
        // NOTE: Make API request 
        setStatus({success:true});
        setSubmitting(false);

        // dispatch(UpdateProfile())
        //   enqueueSnackbar('Product Created',{
        //   variant:'success'
        //   });
    }
    catch(err){
        console.log('message',err);
        setStatus({success:false});
        setErrors({submit:err.message});
        setSubmitting(false);
    }
}
}
>
{({             errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                touched,
                values
            }) => 
            (        
            <form  
                    onSubmit={handleSubmit}
                    className={clsx(classes.root,className)}
                      {...rest}
                    >
                    <Grid container>
                          <Grid
                                item
                                xs={12}
                                lg={12}
                            >   
                                <Card>
                                    <CardContent>
                                        <Box 
                                       display="flex"
                                       justifyContent="center"
                                       alignContent="center"
                                       m={2}
                                        >
                                            <TextField
                                                className={classes.textField}
                                                error={Boolean(touched.tracking && errors.tracking)}
                                                helperText={touched.tracking && errors.tracking}
                                                label="Tracking"
                                                size="small"
                                                name="tracking"
                                                style={{width:'70ch'}}
                                                placeholder="Enter shipment tracking numbers (CN numbers) seperated by commas"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.tracking}
                                                variant="outlined"
                                                InputLabelProps={{
                                                  shrink:true,
                                                }}
                                            />
                                        
                                        
                                        <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        disabled={isSubmitting}>
                                        Track</Button>
                                        
                                        </Box> 

{MultitrackLoading==true?


<Box
mt={5}
display="flex"
justifyContent="center"
alignItems="center"
minHeight={320}>
<CircularProgress />
</Box>:



Multitrack!='' && Multitrack.map((single_element,index)=>(

<Box mt={3} key={index} >
<Typography  
  className={classes.Heading} 
  variant="h4" 
  gutterBottom 
  align="center">
    {single_element.shipmentnumber}
    </Typography>
     
     

<Stepper alternativeLabel activeStep={single_element.Details.status-1} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={Connector}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>


      <Box mt={2} display="flex" 
    flexDirection="column" 
    justifyContent="center"
    alignItems="flex-start"
    >
      <Typography   
    align="justify" 
    color="textSecondary"
    variant="h5" 
    gutterBottom>
    PLEASE SEE YOUR TRACKING INFORMATION BELOW:
      </Typography>
      <Typography 
      color="primary" 
      variant="h6" 
      gutterBottom>
      {`BlueEX Shipping Label :  ${single_element.shipmentnumber} (3.79 Seconds)`}
      </Typography>
      </Box>

    
      {single_element.cnDetail.map((text,i)=>(


<Box key={i}>
<Typography 
    variant="body1" 
    gutterBottom>
   {`${text.statusdate} - ${text.statustime} - ${text.statusmessage}`}
      </Typography>
  </Box>

      ))}

     




      </Box>

))



        }


    









{/* {MultitrackLoading==true ? 
<Box
mt={5}
display="flex"
justifyContent="center"
alignItems="center"
minHeight={320}>
<CircularProgress />
</Box>:
Multitrack!='' && Multitrack.detail.map((item,index)=>(
<Box 
mt={3} 
className={classes.boxItem}>
  <Typography  
  className={classes.Heading} 
  variant="h4" 
  gutterBottom 
  align="center">
    {item.cnno}
    </Typography>
<Timeline 
key={index}
align="alternate">
<TimelineItem>
<TimelineOppositeContent>
<Typography 
variant="body2" 
color="textSecondary">
9:30 am 
</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
           color={(item.status>=1 && item.status<=5 ) ?'primary' :'textSecondary'}
          >
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper 
          elevation={3} 
          className={classes.paper}>
            <Typography 
            variant="h6" 
            component="h1">
             Booked
            </Typography>
            <Typography>11</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography 
          variant="body2" 
          // color="textSecondary"
         
          
          
          >
            10:00 am
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot 
          // color="primary"
          color={(item.status>=1 && item.status<=5 ) ?'primary' :'textSecondary'}
          
          >
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper 
          elevation={3} 
          className={classes.paper}>
            <Typography 
            variant="h6" 
            component="h1">
             Received at BlueEx
            </Typography>
            <Typography>12</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Typography 
          variant="body2" 
          // color="textSecondary"
          color={(item.status>=1 && item.status<=5 ) ?'primary' :'textSecondary'}
          
          >
            10:00 am
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot 
          color={(item.status>=1 && item.status<=5 ) ?'primary' :'textSecondary'}
          >
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper 
          elevation={3} 
          className={classes.paper}>
            <Typography 
            variant="h6" 
            component="h1">
           In-Transit
            </Typography>
            <Typography>13</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Typography 
          variant="body2" 
          // color="textSecondary"
          color={(item.status>=1 && item.status<=5 ) ?'primary' :'textSecondary'}
          >
            10:00 am
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot 
          // color="primary"
          color={(item.status>=1 && item.status<=5 ) ?'primary' :'textSecondary'}
          >
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper 
          elevation={3} 
          className={classes.paper}>
            <Typography 
            variant="h6" 
            component="h1">
              Out For Delivery
            </Typography>
            <Typography>14</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Typography 
          variant="body2" 
          // color="textSecondary"
          color={(item.status>=1 && item.status<=5 ) ?'primary' :'textSecondary'}
          >
            10:00 am
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot 
          // color="primary"
          color={(item.status>=1 && item.status<=5 ) ?'primary' :'textSecondary'}
          >
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper 
          elevation={3} 
          className={classes.paper}>
            <Typography 
            variant="h6" 
            component="h1">
              Delivered
            </Typography>
            <Typography>15</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>

    <Box display="flex" 
    flexDirection="column" 
    justifyContent="center"
    alignItems="justify"
    >
    <Typography   
    align="justify" 
    color="textSecondary"
    variant="h5" 
    gutterBottom>
    PLEASE SEE YOUR TRACKING INFORMATION BELOW:
      </Typography>
      <Typography 
      color="primary" 
      variant="h6" 
      gutterBottom>
      BlueEX Shipping Label : 5013684377 (3.79 Seconds)
      </Typography>
    <Typography 
    variant="body1" 
    gutterBottom>
    Nov 11th, 2020(12:20 PM) - Delivered to
      </Typography>
      </Box>
    </Box>

    
))
} */}



</CardContent>
</Card>
</Grid>
</Grid>
{
errors.submit && (
<Box mt={1}>
<FormHelperText  error>
{errors.submit}
</FormHelperText>
</Box>
)}
</form>
)}
</Formik>
)
}
export default MultiTrack;
import React,{useState,useEffect} from 'react'
import * as Yup from 'yup';
import {Formik} from 'formik';
import { useSelector, useDispatch } from 'src/store';
import {check_status_of_Cn,statusSelector} from 'src/slices/cnstatus';
import {Grid,Box,Card,CardContent,TextField,Button,makeStyles} from '@material-ui/core';
import swal from 'sweetalert';




const styles=makeStyles((theme)=>({
    textField: {
        // marginBottom:'4',
        // marginRight: theme.spacing(5),
        width: '70%',
        marginRight:theme.spacing(3)
        // color: '#6f727d',
        // marginLeft: '10%',
        // backgroundColor: '#f4f5f8'
    }
}))



const BookedCn=()=>{
//booked,arrived,readyforpickup,return,delivered,in-transit,
const [cn,setCn]=useState([]);
const dispatch=useDispatch();
const {status,status_error,cn_status,error}=useSelector(statusSelector);
const classes=styles();

useEffect(()=>{
if(error===true){
    swal("DUPLICATE Cn","Please Enter Only Unique CN!", "warning");
}
if(status.last_status!=='1' && status.status==='1'){
    swal("WARNING","Please Enter Only Booked CN!", "warning");
}
},[status]);

const check_duplicate_cn=(e)=>{ 
console.log('check_dupliacte');

// var alreadyExist=cn_status.filter((ele)=>{
//    if(ele.cnno!==e.target.value){
//        return true;
//    }
//    else{
//        return false;
//    }
// }
//     );
//     if(alreadyExist==false){
//     swal("WARNING","Duplicate CN!", "warning");
//     }

    
}
console.log('status=>',cn_status);
    return (
        <Formik
        initialValues={{
            bookedCn:''
        }}
        validationSchema={Yup.object().shape({
            bookedCn: Yup.string().required('Required')
        })}

        onSubmit={async (values,{
            resetForm,
            setErrors,
            setStatus,
            setSubmitting
        })=>{
            try{
                var count=1;
                //cn value length and series condition
                // if(cnVal == "" || cnVal.length != 10 || parseInt(cnVal) > 5999999999 || parseInt(cnVal) < 5000000000)
                var indexOfStevie=cn_status.findIndex(i => i.cnno===values.bookedCn);
                var found =cn_status.find((a)=>a.cnno===values.bookedCn);
                var index=cn_status.indexOf(found)

                if(indexOfStevie==-1 && count==1){
                    dispatch(check_status_of_Cn(values.bookedCn,0));
                    count--;
                  }
                  else if(indexOfStevie!=-1){
                    swal("DUPLICATE Cn","Please Enter Only Unique CN!", "warning");
                  }

                //   dispatch(check_status_of_Cn(values.bookedCn));
                // console.log('cnnnnn_array',cn);
                // resetForm();
                setStatus({success:true});
                setSubmitting(false);
            }
            catch(err){
                console.log(err);
                console.log(err.message);
                setStatus({success:false});
                setErrors({submit:err.message});
                setSubmitting(false);
            }
        }}
        >
            {
                ({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    errors,
                   isSubmitting,
                    touched,
                    values
                })=>(

                   
<Card>
    <CardContent>
    <form onSubmit={handleSubmit}>
    <Grid container>
        <Grid 
        item 
        xs={12} 
        lg={12}>

            <Box 
            display="flex"
            justifyContent="center"
            alignContent="center"
            m={2}
            >
            <TextField
                      className={classes.textField}
                      error={Boolean(touched.bookedCn && errors.bookedCn)}
                      size="small"
                      helperText={touched.bookedCn && errors.bookedCn}
                      placeholder="Enter Only Booked Cn"
                      name="bookedCn"
                    //   onBlur={check_duplicate_cn}
                      onBlur={handleBlur}
                    //   onBlur={check_duplicate_cn}
                      onChange={handleChange}
                      value={values.bookedCn}
                      variant="outlined"
                    />

<Button
                    color="primary"
                    disabled={isSubmitting}
                    onClick={check_duplicate_cn}
                    type="submit"
                    variant="contained"
                  >Add CN
                  </Button>
            </Box>
        </Grid>
        </Grid>
        </form>
    </CardContent>
</Card>
                )
            }
         
        </Formik>
    )
}

export default BookedCn;

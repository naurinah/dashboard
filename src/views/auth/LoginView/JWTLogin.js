import React,{useEffect,useCallback,useState} from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {useSelector, useDispatch } from  'src/store';
import {fetch_cities_Dropdown, dropdownSelector } from  'src/slices/dropdown';

import {
Box,
Button,
FormHelperText,
TextField,
Typography,
makeStyles
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
const useStyles = makeStyles((theme) => ({
  root:{
  borderRadius:50
  },
}));

const JWTLogin =({ className, ...rest }) => {
const [citiesDropdown,setCities]=useState([]);
const classes = useStyles();
const dispatch=useDispatch();
const {cities}=useSelector(dropdownSelector);
const {login,user} = useAuth();
const isMountedRef = useIsMountedRef();
localStorage.setItem('cities',JSON.stringify(cities.detail));
  // const citie=useCallback(
  //   () => {
  //     dispatch(fetch_cities_Dropdown('PK'));

  //     setCities(cities.detail)
      
  //   },
  //   [],
  // )
useEffect(()=>{
  dispatch(fetch_cities_Dropdown('PK'));
  setCities(cities)

  if (isMountedRef.current) 
  {
   
    
  }
  
  
},[]);


  return (
    <Formik
      initialValues={{
        username:'foc',
        // email:'testing@gmail.com',
        password:'Blue-Ex',
        submit:null
      }}
      validationSchema={Yup.object().shape({
      // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      username: Yup.string().max(255).required('Username is required'),
      password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values,{
      setErrors,
      setStatus,
      setSubmitting
      }) => {
        try {


          await login(values.username, values.password);
          if (isMountedRef.current){
            setStatus({success:true});
            setSubmitting(false);
          }
        } catch (err) {
          console.log(err);
          if (isMountedRef.current) {
            setStatus({success:false});
            setErrors({submit:err.message});
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        props
      }) => (

        <form
          noValidate
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          {/* <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          /> */}
          

 <TextField
            error={Boolean(touched.username && errors.username)}
            fullWidth
            helperText={touched.username && errors.username}
            label="Username"
            margin="normal"
            name="username"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.username}
            variant="outlined"
          />

          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />

          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}


<Box mt={2}>
                <Typography
                align="center"
                variant="body2"
                color="textSecondary"
                >
               Forgot password? Call Customer Service at
                </Typography>

                <Typography
                align="center"
                variant="body2"
                color="secondary"
                >
           021-111-BLUE-EX (258339)
                </Typography>
</Box>
          <Box 
          mt={2}
          textAlign='center'
          >
            <Button
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
              size="medium"
              type="submit"
              variant="contained"
            >
              Log In
            </Button>
          </Box>

          <Box mt={2}>
            <Alert
            severity="info"
            >
              <div>
                Use
                {' '}
                <b>foc</b>
                {' '}
                and password
                {' '}
                <b>Blue-Ex</b>
              </div>
            </Alert>
          </Box>
        </form>
      )}
    </Formik>
  );
};

JWTLogin.propTypes = {
className: PropTypes.string,
};
export default JWTLogin;

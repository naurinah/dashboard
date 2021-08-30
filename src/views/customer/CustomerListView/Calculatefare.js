import React, { useEffect, useState } from 'react';
import {
  Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
  MenuItem, FormControl, FormHelperText, Select, Container,
  Card, CardContent, CardHeader, Grid, makeStyles, Typography, Box, TextField, Divider, InputLabel
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from 'src/hooks/useAuth';
import useCities from 'src/hooks/useCities';
import { useSelector, useDispatch } from 'src/store';
import { fetch_cities_Dropdown, CalculateFare, dropdownSelector } from 'src/slices/dropdown';
import classNames from "classnames";
import Alert from '@material-ui/lab/Alert';


const styles = makeStyles((theme) => ({

  button: {
    backgroundColor: '#0047ba'
  },
  textField: {
    width: '12ch',
    border: 'solid #333'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '30ch',
    border: 'solid red'
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    width: 800,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    minWidth: 120
  },
  type: {
    fontWeight: 600
  },
  formControl: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%",
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(1)
    }
  },
  input: {
    padding: "10px 14px"
  },
  select: {
    maxWidth: 130
  },
  search: {
    maxWidth: 180
  },
  submitBtn: {
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  }



}));
const FareDialog = ({ dialogPopover, className, ...rest }) => {
  const theme = useTheme();
  const citiesDropdown = useCities;
  const { user } = useAuth();
  const { acno } = user;
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = styles();
  const dispatch = useDispatch();
  const { calculateFare } = useSelector(dropdownSelector);


  // const {dialogPopover}=props;
  const [open, setOpen] = React.useState(dialogPopover);
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);


  const handleClickOpen = () => {
    setSubmitionCompleted(false);
    setOpen(true);
  };


  const handleClose = () => {
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

        service_code: 'BE',
        cbc_weight: '',
        origin_city: acno.split('-')[0],
        destination_country: 'PK',
        destination_city: '',
        cod_amount: '',
      }}

      validationSchema={Yup.object().shape({
        service_code: Yup.string().required('Required'),
        // destination_country: Yup.string().required('Required'),
        cbc_weight: Yup.string().required('Required'),
        cod_amount: Yup.string().required('Required'),
        destination_city: Yup.string().required('Required'),

      })}
      onSubmit={(values, {
        setSubmitting,
        setErrors,
        setStatus
      }) => {
        try {
          console.log('values', values);
          dispatch(CalculateFare(acno, values.service_code,
            values.cbc_weight, values.origin_city, values.destination_city, values.destination_country, values.cod_amount))
          setStatus({ success: true });
          setSubmitting(false);
        }
        catch (err) {
          console.log(err.message);
          console.log(err);
        }
      }}

    >

      {(props) => {
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
        } = props;

        return (

          <Dialog
            // fullWidth={true}
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
                    gutterBottom>Calculate Your Fare</Typography>


                </Box>

                <Box mt={2} mb={2}>
                  {calculateFare.rate ?
                    <Alert variant="outlined" severity="success">
                      {`Your Calculated Amount is ${calculateFare.rate}`}
                    </Alert> : ''}
                </Box>

                <form
                  onSubmit={handleSubmit}>
                  <Grid
                    container
                    spacing={0}>

                    <Grid item
                      xs={12}
                      lg={6}>

                      <Box
                        mb={2}
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <FormControl className={classNames(classes.formControl, classes.text)}>
                          <Typography
                            gutterBottom
                            variant="body1">
                            Service Code
</Typography>
                        </FormControl>



                        <FormControl className={classNames(classes.formControl, classes.search)} size="small"
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <Select
                            native
                            onChange={handleChange}
                            className={classes.search}
                            value={values.service_code}
                            label="Service Code"
                            // error={Boolean(touched.service_code && errors.service_code)}
                            // helperText={touched.service_code && errors.service_code}

                            inputProps={{
                              name: 'service_code',
                              id: 'outlined-age-native-simple',
                            }}
                          >
                            <option value={'BE'}>BLUE EDGE</option>
                            <option value={'BT'}>BLUE TRUNK</option>
                          </Select>
                        </FormControl>
                      </Box>



                      <Box
                        mb={2}
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >

                        <FormControl className={classNames(classes.formControl, classes.text)}>
                          <Typography
                            variant="body1"
                            gutterBottom>
                            Country
  </Typography>
                        </FormControl>







                        <FormControl className={classNames(classes.formControl, classes.search)} 
                          size="small"
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <Select
                           className={classes.search}
                            native
                            onChange={handleChange}
                        
                            value={values.destination_country}
                            label="Destination Country"
                            // error={Boolean(touched.service_code && errors.service_code)}
                            // helperText={touched.service_code && errors.service_code}
                            inputProps={{
                              name: 'destination_country',
                              id: 'outlined-age-native-simple',
                            }}
                          >
                            <option value={'PK'}>PAKISTAN</option>

                          </Select>
                        </FormControl>





                      </Box>




                      <Box
                        mb={2}
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center">

                        <FormControl className={classNames(classes.formControl, classes.text)}>
                          <Typography

                            variant="body1"
                            gutterBottom>
                            CBC Weight
  </Typography>
                        </FormControl>
                        <FormControl className={classNames(classes.formControl, classes.search)}>
                          <TextField
                            size="small"
                            name="cbc_weight"
                            variant="outlined"
                            type="number"
                            placholder="0.5"
                            className={classes.formControl}
                            value={values.cbc_weight}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.cbc_weight && errors.cbc_weight)}
                            helperText={(errors.cbc_weight && touched.cbc_weight) && errors.cbc_weight}
                            margin="normal"
                          />
                        </FormControl>
                      </Box>

                    </Grid>




                    <Grid
                      item
                      xs={12}
                      lg={6}>


                      <Box
                        mb={2}
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center">

                        <FormControl className={classNames(classes.formControl, classes.text)}>
                          <Typography

                            variant="body1"
                            gutterBottom>
                            Origin City
  </Typography>

                        </FormControl>

                        <FormControl className={classNames(classes.formControl, classes.search)}
                          size="small"
                          variant="outlined"
                          className={classes.search}>
                          <Select
                            native
                            value={values.origin_city}
                            onChange={handleChange}
                            label="Origin City"
                            // error={Boolean(touched.origin_city && errors.origin_city)}
                            // helperText={touched.origin_city && errors.origin_city}
                            inputProps={{
                              name: 'origin_city',
                              id: 'outlined-age-native-simple',
                            }}
                          >

                            {citiesDropdown ? citiesDropdown.map((option) => (
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
                      <Box
                        mb={2}
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center">
                        <FormControl className={classNames(classes.formControl, classes.text)}>
                          <Typography
                            variant="body1"
                            gutterBottom>
                            Destination City
  </Typography>
                        </FormControl>
                        <FormControl className={classNames(classes.formControl, classes.search)}
                          size="small"
                          variant="outlined"
                          className={classes.formControl}>
                          <Select
                            className={classes.search}
                            native
                            defaultValue={values.destination_city}
                            // value={values.destination_city}
                            onChange={handleChange}
                            label="Destination City"
                            error={Boolean(touched.destination_city && errors.destination_city)}
                            helperText={touched.destination_city && errors.destination_city}
                            inputProps={{
                              name: 'destination_city',
                              id: 'outlined-age-native-simple',
                            }}
                          >
                            <option aria-label="None" label="Select City"></option>
                            {citiesDropdown ? citiesDropdown.map((option) => (
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


                      <Box
                        mb={2}
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >



                        <FormControl className={classNames(classes.formControl, classes.text)}>
                          <Typography
                            variant="body1"
                            gutterBottom>
                            COD AMOUNT
  </Typography>
                        </FormControl>


                        <FormControl
                          className={classNames(classes.formControl, classes.search)}
                        >
                          <TextField
                            variant="outlined"
                            label=""
                            size="small"
                            name="cod_amount"
                            className={classes.formControl}
                            value={values.cod_amount}
                            placeholder="1500"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.cod_amount && errors.cod_amount)}
                            helperText={(errors.cod_amount && touched.cod_amount) && errors.cod_amount}
                            margin="normal"
                          />
                        </FormControl>
                      </Box>

                    </Grid>

                  </Grid>

                  <DialogActions>
                    {/* <Button
                            type="button"
                            className="outline"
                            onClick={handleReset}
                            disabled={!dirty || isSubmitting}
                          >
                            Reset
                          </Button> */}
                    <Button
                      type="submit"
                      className={classes.submitBtn}
                      color="primary"
                      variant="contained"
                      disabled={isSubmitting}>
                      Calculate
                          </Button>
                  </DialogActions>
                </form>

              </Container>
            </DialogContent>
          </Dialog>
        );
      }}

    </Formik>
    //   </Grid>
    // </Grid>
  )
}
export default FareDialog;

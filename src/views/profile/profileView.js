import React, { useState } from 'react';
import {
    Card, CardContent, Grid, TextField,
    Typography, Box, makeStyles, Button, CardHeader,
    FormControlLabel, FormHelperText, Divider
} from '@material-ui/core';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from 'src/hooks/useAuth';
import { useSelector, useDispatch } from 'src/store';
import Alert from '@material-ui/lab/Alert';
import { deliveriesSelector, UpdateProfile } from 'src/slices/deliveries';
const Styles = makeStyles((theme) => ({
    root: {
    },
    button: {
        backgroundColor: '#0047ba'
    }
}))
const ProfileView = ({ className, ...rest }) => {
    const classes = Styles();
    const dispatch = useDispatch();
    const { user } = useAuth();
    console.log('',user.acno);
    const {Profile,profileLoading,profileError} = useSelector(deliveriesSelector);
    return (
        <Formik
            initialValues={{
                account: '',
                account_title: '',
                name: '',
                address: '',
                cell: '',
                email: '',
                ntn: '',
                cnic: '',
                password: ''
            }}
            validationSchema={Yup.object().shape({
                account: Yup.string().max(100).required('Account is required.'),
                account_title: Yup.string().max(100).required('Account title is required.'),
                name: Yup.string().max(100).required('Name is Required.'),
                address: Yup.string().max(100).required('Address is Required.'),
                cell: Yup.string().max(100).required('Cell is Required.'),
                email: Yup.string().email('Must be a valid email.').max(255).required('Email is required'),
                ntn: Yup.string().max(6).required('Ntn is required.'),
                cnic: Yup.string().max(13).required('Cnic is required.'),
                password: Yup.string().max(15).required('Password is required.'),
            })}

            onSubmit={async (values, {
                setErrors,
                setStatus,
                setSubmitting
            }) => {
                try {
                    dispatch(UpdateProfile(values.account, values.account_title, values.name, values.address, values.cell,
                        values.email, values.ntn, values.cnic, values.password, user.name))
                    // NOTE: Make API request
                    setStatus({ success: true });
                    setSubmitting(false);
                    // dispatch(UpdateProfile())
                    //   enqueueSnackbar('Product Created',{
                    //   variant:'success'
                    //   });
                }
                catch(err) {
                    console.log(err.message);
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                }
            }
            }
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
                                    <CardHeader title="Profile" />
                                    <Divider />
                                    {Profile != '' ?
                                        <Box
                                            display="flex"
                                            justifyContent="space-between">
                                            <Box
                                                display="flex"
                                                m={1}>
                                                <Alert
                                                    severity="success"
                                                    variant="outlined"
                                                >User Profile has Updated Successfully.</Alert>
                                            </Box>
                                        </Box> : profileError}
                                    <CardContent>
                                        <Box
                                            display="flex"
                                            mb={1}
                                        >
                                            {/* <Typography
                                                gutterbottom
                                                variant="body2">Name:</Typography> */}
                                            <TextField
                                                error={Boolean(touched.account && errors.account)}
                                                fullWidth
                                                helperText={touched.account && errors.account}
                                                label="Account"
                                                name="account"
                                                onChange={handleChange}
                                                placeholder="Enter a Account"
                                                onBlur={handleBlur}
                                                value={values.account}
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box
                                            display="flex"
                                            mb={1}
                                        >

                                            {/* <Typography
                                                gutterbottom
                                                variant="body2">Name2:</Typography> */}
                                            <TextField
                                                error={Boolean(touched.account_title && errors.account_title)}
                                                fullWidth
                                                helperText={touched.account_title && errors.account_title}
                                                label="Account Title"
                                                name="account_title"
                                                placeholder="Enter a Account Title"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.account_title}
                                                variant="outlined"
                                            />
                                        </Box>

                                        <Box
                                            display="flex"
                                            mb={1}
                                        >
                                            <TextField
                                                error={Boolean(touched.name && errors.name)}
                                                fullWidth
                                                helperText={touched.name && errors.name}
                                                label="Name"
                                                name="name"
                                                placeholder="Enter a Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                variant="outlined"
                                            />

                                        </Box>


                                        <Box
                                            display="flex"
                                            mb={1}
                                        >
                                            <TextField
                                                error={Boolean(touched.address && errors.address)}
                                                fullWidth
                                                helperText={touched.address && errors.address}
                                                label="Address"
                                                name="address"
                                                placeholder="Enter a Address"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.address}
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box
                                            display="flex"
                                            mb={1}
                                        >
                                            <TextField
                                                error={Boolean(touched.cell && errors.cell)}
                                                fullWidth
                                                helperText={touched.cell && errors.cell}
                                                label="Cell"
                                                name="cell"
                                                placeholder="Enter a Cell"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.cell}
                                                variant="outlined"
                                            />
                                        </Box>

                                        <Box
                                            display="flex"
                                            mb={1}
                                        >
                                            <TextField
                                                error={Boolean(touched.email && errors.email)}
                                                fullWidth
                                                helperText={touched.email && errors.email}
                                                label="Email"
                                                placeholder="Enter a Email"
                                                name="email"
                                                type="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.email}
                                                variant="outlined"
                                            />
                                        </Box>

                                        <Box
                                            display="flex"
                                            mb={1}
                                        >
                                            <TextField
                                                error={Boolean(touched.ntn && errors.ntn)}
                                                fullWidth
                                                helperText={touched.ntn && errors.ntn}
                                                label="NTN"
                                                name="ntn"
                                                placeholder="Enter a Valid Ntn"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.ntn}
                                                variant="outlined"
                                            />
                                        </Box>

                                        <Box
                                            display="flex"
                                            mb={1}
                                        >
                                            <TextField
                                                error={Boolean(touched.cnic && errors.cnic)}
                                                fullWidth
                                                helperText={touched.cnic && errors.cnic}
                                                label="CNIC"
                                                name="cnic"
                                                placeholder="Enter a Cnic"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.cnic}
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box
                                            display="flex"
                                            mb={1}
                                        >
                                            <TextField
                                                error={Boolean(touched.password && errors.password)}
                                                fullWidth
                                                helperText={touched.password && errors.password}
                                                label="Password"
                                                name="password"
                                                placeholder="Enter a Password"
                                                type="password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.password}
                                                variant="outlined"
                                            />
                                        </Box>


                                        <Box
                                            mb={1}
                                            display="flex"
                                            textAlign="justify"
                                        >

                                            <Typography
                                                align="center"
                                                gutterBottom
                                                variant="caption">
                                                Changing your portal password will require you to use the new password for APIs as well. Make sure your development team are aware of this change if you are consuming blueEX APIs.
</Typography>
                                        </Box>
                                        <Box
                                            mt={1}
                                            display="flex"
                                            justifyContent="center">
                                            <Button
                                                color="textSecondary"
                                                variant="contained"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >Save</Button>
                                        </Box>
                                        {/* 
                      <Box mt={2}>
                      <FormControlLabel
                        control={(
                            <TextField
                            error={Boolean(touched.name2 && errors.name2)}
                            fullWidth
                            helperText={touched.name2 && errors.name2}
                            label="Name"
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name2}
                            variant="outlined"
                        />
                        )}
                         label="Testing"
                      />
                    </Box> */}
                                    </CardContent>
                                </Card>

                            </Grid>
                        </Grid>
                        {
                            errors.submit && (
                                <Box
                                    mt={1}>
                                    <FormHelperText error>
                                        {errors.submit}
                                    </FormHelperText>
                                </Box>
                            )
                        }
                    </form>
                )}
        </Formik>
    )
}
export default ProfileView;


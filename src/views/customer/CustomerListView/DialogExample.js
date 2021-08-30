import React,{useState} from 'react';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle,
    Card, CardContent, CardHeader, Grid, makeStyles, Box, TextField, Divider
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';

const styles = makeStyles((theme) => ({
    root: {
        flexGrow:1,
    },
    button: {
        backgroundColor:'#0047ba'
    },

}));

const FareDialog = ({dialogPopover, className, ...rest }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = styles();
    // const {dialogPopover}=props;
    const [open, setOpen]=React.useState(dialogPopover);
    const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);


    const handleClickOpen=()=>{
        setSubmitionCompleted(false);
        setOpen(true);
    };

    const handleClose =()=>{
        setOpen(false);
    };
    return (                   
        <>
        <Button 
        variant="outlined" 
        color="primary" 
        onClick={handleClickOpen}>
          Contact us!
        </Button>

        <Dialog
        fullWidth={true}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          {!isSubmitionCompleted &&
            <>
              <DialogTitle 
              id="form-dialog-title">Contact</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Send us a comment!
                </DialogContentText>
                <Formik
                  initialValues={{email:'',name:'',comment:'' }}
                  onSubmit={(values, { setSubmitting }) => {
                     setSubmitting(true);
                     console.log('setsubmitting',setSubmitting);

                    // axios.post(contactFormEndpoint,
                    //   values,
                    //   {
                    //     headers: {
                    //       'Access-Control-Allow-Origin': '*',
                    //       'Content-Type': 'application/json',
                    //     }
                    //   },
                    // ).then((resp) => {
                    //   setSubmitionCompleted(true);
                    // }
                    // );
                    setSubmitionCompleted(true);
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email()
                      .required('Required'),
                    name: Yup.string()
                      .required('Required'),
                    comment: Yup.string()
                      .required('Required'),
                  })}
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
                      <form 
                      onSubmit={handleSubmit}>
                          <Box>
                          <TextField
                          label="name"

                          name="name"
                          className={classes.textField}
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.name && touched.name) && errors.name}
                          fullWidth
                          margin="normal"
                        />

                          </Box>
                      
  

  <Box>
                        <TextField
                          fullWidth
                          error={errors.email && touched.email}
                          label="email"
                          name="email"
                          className={classes.textField}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.email && touched.email) && errors.email}
                          margin="normal"
                        />
                        </Box>
  

  <Box>
                        <TextField
                          fullWidth
                          label="comment"
                          name="comment"
                          className={classes.textField}
                          value={values.comment}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.comment && touched.comment) && errors.comment}
                          margin="normal"
                        />
                        </Box>
                        
                        <DialogActions>
                          <Button
                            type="button"
                            className="outline"
                            onClick={handleReset}
                            disabled={!dirty || isSubmitting}
                          >
                            Reset
                          </Button>
                          <Button type="submit" disabled={isSubmitting}>
                            Submit
                          </Button>
                          {/* <DisplayFormikState {...props} /> */}
                        </DialogActions>
                      </form>
                    );
                  }}
                </Formik>
              </DialogContent>
            </>
          }
          {isSubmitionCompleted &&
            <>
              <DialogTitle id="form-dialog-title">Thanks!</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Thanks
                </DialogContentText>
                <DialogActions>
                  <Button
                    type="button"
                    className="outline"
                    onClick={handleClose}
                  >
                    Back to app
                    </Button>
                  {/* <DisplayFormikState {...props} /> */}
                </DialogActions>
              </DialogContent>
            </>}
        </Dialog>
      </>
  
    );
}
export default FareDialog;

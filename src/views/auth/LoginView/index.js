import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Paper,
  Divider,
  Link,
  Tooltip,
  Grid,
  Typography,
  Hidden,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import useAuth from 'src/hooks/useAuth';
import Auth0Login from './Auth0Login';
import FirebaseAuthLogin from './FirebaseAuthLogin';
import JWTLogin from './JWTLogin';

const methodIcons = {
  'Auth0': '/static/images/auth0.svg',
  'FirebaseAuth': '/static/images/firebase.svg',
  'JWT': '/static/images/jwt.svg'
};
const useStyles = makeStyles((theme) => ({
  root: {
 
  display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
 

  },
  parent:{
    backgroundColor: theme.palette.background.dark
  }
  ,

  cardContainer: {
    border:'solid #333',
    
    // minHeight: '100%',
    // maxHeight: '100%',
    // paddingBottom: 40,
    // paddingTop: 40,

    // [theme.breakpoints.down('sm')]: {
    //   width: '100%',
    //   minHeight: '100%',
    //   maxHeight: '100%',
    //   backgroundImage: 'url(/static/images/Gilgit.jpg)',
    //   backgroundSize: 'cover',
    //   backgroundRepeat: 'no-repeat',
    //   backgroundPosition: 'center'
    // },
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400
  },
  leftImg: {
    width: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    backgroundImage: 'url(/static/images/Gilgit.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  currentMethodIcon: {
    // marginTop:theme.spacing(5),
      // width: '50%',
      //  height:'50%',
       maxWidth:'150px',
       verticalAlign:'middle',
  },
  childImage:{
    flex:1,
    width: '100%',
    minHeight: '100%',
    maxHeight: '100%',
  }
}));
const LoginView = () => {
  const classes = useStyles();
  const { method } = useAuth();
  return (
  
<div className={classes.parent}>
    <Paper
    className={classes.root}
   
  >
    
        <Grid
          container
        >
          <Grid
            item
            lg={4}
            md={4}
            sm={12}
            xs={12}
          >
                <Box
                >
                  <Box
                  mt={15}
                  display="flex"
                  justifyContent="center"
                  >
                    <img
                    className={classes.currentMethodIcon}
                      alt="Auth method"
                      // src={methodIcons[method]}
                      src='/static/logologin.svg'
                    />
                  </Box>

                </Box>
                <Box
                  flex={1}
                  m={3}
                >
                  {method === 'Auth0' && <Auth0Login />}
                  {method === 'FirebaseAuth' && <FirebaseAuthLogin />}
                  {method === 'JWT' && <JWTLogin />}
                </Box>
                
                {/* <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              color="textSecondary"
            >
              Create new account
            </Link> */}
            
          </Grid>
          <Hidden xsDown>
          <Grid
            item
            lg={8}
            md={8}
          
           
           
          >
            <Box
           display="flex"
           justifyContent="center"
           alignItems="center"
             
            >
              <img className={classes.childImage} src='/static/images/Gilgit.jpg' alt='gilgit' />
            </Box>
          </Grid>
          </Hidden>
        </Grid>
       
        </Paper>
        </div>
      
  );
};
export default LoginView;

import React,{useState}from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';

import {
  PlusCircle as PlusCircleIcon,
  Download as DownloadIcon,
  Upload as UploadIcon
} from 'react-feather';
import LocationModalView from 'src/views/LocationModal';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  }
}));

const Header = ({className, ...rest }) => {
  const [toggle,setToggle]=useState(false);
  const classes = useStyles();
  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
    
      {...rest}
    >
      <Grid item>
        {/* <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Link
            variant="body1"
            color="inherit"
            to="/app/management"
            component={RouterLink}
          >
            Management
          </Link>
          <Typography
            variant="body1"
            color="textPrimary"
          >
            Customers
          </Typography>
        </Breadcrumbs> */}
       
        <Typography
          variant="h3"
          color="textPrimary"
        >
        Pickups
        </Typography>
       
      </Grid>
      <Grid item>
        <Box
        >
        {/* <Button  
        style={{margin:'5px'}} 
        variant="contained" 
        size="medium"
        component="button"
        href="/create-pickup"
        >
         Create Pickup
        </Button> */}

      

<Button
                                                   variant="contained"
                                                   color="primary"
                                                   size="small"
                                                   onClick={()=>{
                                                       setToggle(!toggle)
                                                   }}
                                               >
                                                   Add PickupLocation
</Button>




{toggle==true ? <LocationModalView dialogPopover={toggle} />:false}

        </Box>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;

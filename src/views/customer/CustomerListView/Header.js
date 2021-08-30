import React,{useState} from 'react';
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
import Dialog from './Calculatefare';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  PlusCircle as PlusCircleIcon,
  Download as DownloadIcon,
  Upload as UploadIcon
} from 'react-feather';
import { TrainRounded } from '@material-ui/icons';

const useStyles=makeStyles((theme) => ({
  root:{},
  action:{
  marginBottom:theme.spacing(1),
  '& + &': {
  marginLeft:theme.spacing(1)
    }
  }
}));
const Header=({className, ...rest }) => {
  const classes=useStyles();
  const [dialog,setDialog]=useState(false);
  
  const showDialog=()=>{
    setDialog(!dialog);
  }  
  return (
    <Grid
      className={clsx(classes.root,className)}
      container
      justify="space-between"
      {...rest}
    >
     


      <Grid 
      item>
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
         Deliveries
        </Typography>
      </Grid>
      <Grid item>
        <Box
        >

        <Button
        style={{margin:'5px'}} 
        variant="contained" 
        size="medium"
        onClick={showDialog}
        >
        Calculate Fare
        </Button>


        <Button   
        // component={RouterLink} 
        //to="/create-pickup"
        href="/create-shipment"
        target="_blank"  
        size="medium" 
        variant="contained" 
        >
   Bulk Import
</Button>



        {/* <Button 
        style={{margin:'5px'}} 
        variant="contained" 
        size="medium">
 Bulk Import
</Button> */}

{dialog==true ? 
<Dialog 
dialogPopover={dialog}
/>
:''}



</Box>
      </Grid>
    </Grid>
  );
};
Header.propTypes = {
  className: PropTypes.string
};
export default Header;

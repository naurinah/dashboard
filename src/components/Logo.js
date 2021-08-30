import React from 'react';
import {makeStyles} from '@material-ui/core';
const useStyles=makeStyles((theme)=>({
  img:{
    width:'25ch'
  },
}))
const Logo = (props) => {
const classes=useStyles();
  return (
    <img
    className={classes.img}
      alt="Logo"
      src="/static/logo.svg"
      {...props}
    />
  );
}

export default Logo;

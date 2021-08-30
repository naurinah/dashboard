import React from 'react';
import {
  Box,
  CircularProgress ,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    display:'flex',
    flexDirection:'column',
    height:'100%',
    justifyContent:'center',
    left: 0,
    padding:theme.spacing(3),
    position:'fixed',
    top: 0,
    width: '100%',
    zIndex: 2000
  }
}));

const SlashCircular = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box width={400}>
        <CircularProgress  />
      </Box>
    </div>
  );
}

export default SlashCircular;

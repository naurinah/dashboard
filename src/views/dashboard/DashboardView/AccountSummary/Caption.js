import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Typography,
  Box,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root:{},
}));

const Caption=({className,heading,number, ...rest}) => {
const classes=useStyles();
return(
    <Box>
      <Typography
        variant="h1">
        {
          number
        }
      </Typography>
      <Typography
        variant="h5"
        color="primary"
        display="block"
        gutterBottom>
        {heading}
      </Typography>
    </Box>
  );
};

Caption.propTypes = {
  className: PropTypes.string
};
export default Caption;

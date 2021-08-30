import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Typography,
  LinearProgress,
  makeStyles
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Chart from './Chart';


const useStyles = makeStyles((theme) => ({
  root: {
  },
  item: {
    textAlign: 'center',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3, 2),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  },

  boxsegments:{
    textAlign:'center',
    flexGrow:1,
    display:'flex',
    justifyContent:'center',
  }

}));

const EarningsSegmentation = ({ className, ...rest }) => {
const classes = useStyles();
const isMountedRef = useIsMountedRef();
const [earnings, setEarnings] = useState(null);

  const getEarnings = useCallback(async () => {
    try  {
      const response = await axios.get('/api/reports/earnings');

      if (isMountedRef.current) {
        setEarnings(response.data.earnings);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    console.log('fetch-earnings');
    getEarnings();
  }, [getEarnings]);

  if (!earnings) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title="Account Summary"
      />
      <Divider />
      <div className={classes.boxsegments}>
      <Box
        position="relative"
        minHeight={320}
      >
      <Chart data={earnings} />
      </Box>

      </div>
      <Divider />

    
   


      {/* <Box display="flex">
        {earnings.labels.map((label, i) => (
          <div
            key={label}
            className={classes.item}
          >
            <Typography
              variant="h4"
              color="textPrimary"
            >
              {earnings.datasets[0].data[i]}
              %
            </Typography>
            <Typography
              variant="overline"
              color="textSecondary"
            >
              {label}
            </Typography>
          </div>
        ))}
      </Box> */}
    </Card>
  );
};

EarningsSegmentation.propTypes = {
  className: PropTypes.string
};

export default EarningsSegmentation;

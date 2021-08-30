import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import numeral from 'numeral';
import { fetchSettlementHistory,dashboardSelector } from 'src/slices/dashboard';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useSelector, useDispatch } from 'src/store';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Chart from './Chart';
import useAuth from 'src/hooks/useAuth';


const useStyles = makeStyles((theme) => ({
  root: {
    height:'755px'
  },
  current: {
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    
  },
  head: {
    // padding: theme.spacing(2),
    textAlign:'left',
    padding:'0px 0px 2px 10px'
},
captionBox:{
  textAlign:'left',
  padding:'0px 0px 2px 10px'
}
}));

const getRandomInt = (min, max) => {
  // eslint-disable-next-line no-param-reassign
  min = Math.ceil(min);
  // eslint-disable-next-line no-param-reassign
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const SettlementHistory = ({className, ...rest}) => {
  const dispatch = useDispatch();
  const { settlementHistory, settlementLoading, settlementError,months}=useSelector(dashboardSelector);
  const classes = useStyles();
  const isMountedRef =useIsMountedRef();
  const {user}=useAuth();
  const [data, setData] = useState([
    163,
    166,
    161,
    159,
    99,
    163,
    173,
    166,
    167,
    183,
    176,
    172
  ]);

  const getData = useCallback(() => {
    if (isMountedRef.current) {
      setData((prevData) => {
        const newData = [...prevData];
        newData.shift();
        newData.push(0);
        return newData;
      });
    }

    setTimeout(() => {
      if (isMountedRef.current) {
        setData((prevData) => {
          const newData = [...prevData];
          const random = getRandomInt(100, 200);
          newData.pop();
          newData.push(random);
          return newData;
        });
      }
    }, 500);
  }, [isMountedRef]);

  useEffect(() => {
    setInterval(() => getData(), 2000);
  }, [getData]);

  useEffect(() => {
    dispatch(fetchSettlementHistory(user.acno))
  },[dispatch])

  const labels = data.map((value, i) => i);
  const pages = [
    {
      pathname: '/app/projects',
      views: '24'
    },
    {
      pathname: '/app/chat',
      views: '21'
    },
    {
      pathname: '/cart',
      views: '15'
    },
    {
      pathname: '/cart/checkout',
      views: '8'
    }
  ];


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        classes={{ action: classes.current }}
        subheaderTypographyProps={{ color:'textSecondary', variant:'body2' }}
        title="Settlement History"
        titleTypographyProps={{ color:'textPrimary'}}
      />
      <Divider />
      <List>
      <ListItem>
        <Typography 
          display="block" 
          className={classes.head}
          variant="body2">
          Last Statement for the period
            </Typography>
           </ListItem>
        {settlementHistory.length > 0 ? settlementHistory.map((single_item, index) => (
          index == 0 ? (

            <ListItem key={index}>
            <div>

              <Typography 
              display="block"
              className={classes.head}
              variant="body2">
                {

`
${single_item.SDATE.slice(0, 2)}-
${months[Number(single_item.SDATE.slice(3, 5)) - 1]}
to
${single_item.EDATE.slice(0, 2)}-
${months[Number(single_item.EDATE.slice(3, 5)) - 1]}
`
                }
              </Typography>
              <Typography  className={classes.head} variant="h3"   color="primary" >
                {`RS ${Intl.NumberFormat().format(single_item.CODAMOUNT)}`}
              </Typography>

            </div>
            </ListItem>
          )
            : ''
        )) : ''}



        {/* <ListItem>
          <ListItemText
            primary={'bb'}
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem> */}
      </List>
      <Divider />
      <PerfectScrollbar>
        <Box
         >
          <List disablePadding>
            {settlementHistory.length > 0  ?
              settlementHistory.map((page, i) => (
                i  > 1 ?(
                <ListItem key={i}
                  divider
                  key={page.FPS_CODE}
                >
                  {/* <ListItemText
              primary=  {
                `
                ${page.SDATE.slice(0, 2)}-
                ${months[Number(page.SDATE.slice(3, 5)) - 1]}
                to
                ${page.EDATE.slice(0, 2)}-
                ${months[Number(page.EDATE.slice(3, 5)) - 1]}
                `
                            }
              primaryTypographyProps={{ color:'textSecondary', variant:'body2' }}
            /> */}

                  <ListItemText
                    primary={` ${page.SDATE.slice(0, 2)}-${months[Number(page.SDATE.slice(3, 5)) - 1]} to ${page.EDATE.slice(0, 2)}-${months[Number(page.EDATE.slice(3, 5)) - 1]}`}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />

                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    {numeral(page.CODAMOUNT).format('0,0')}
                  </Typography>
                </ListItem>):null
              )) : null}
          </List>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

SettlementHistory.propTypes = {
  className: PropTypes.string
};

export default SettlementHistory;

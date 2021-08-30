import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import useAuth from 'src/hooks/useAuth';

import { Card, CardContent, Paper, Link, Typography, Button, Grid, Box, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'src/store';
import { check_status_of_Cn, empty_status_array, delete_status, create_multiple_pickup, statusSelector } from 'src/slices/cnstatus';
import { fetchPickup, createPickups, deliveriesSelector, cancelConsignment } from 'src/slices/deliveries';



const styles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4)
  }
}))
const PickupList = () => {
  const [selected_status, setstatusList] = useState([]);
  const { user } = useAuth();
  const { name, acno, type } = user;
  var multiple_Cn;
  const [cn, setCn] = useState([]);
  const deleteStatus = (event, value) => {
    event.preventDefault();
    dispatch(delete_status(value));
  }

  const selected_status_row = (data) => {
    console.log('from_status_func=>', data);
    multiple_Cn = data;
  }
  var displayData = [];
  const classes = styles();
  const columns = [
    {
      name: "sno",
      label: "Sno",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => (
          {
            style: {
              minWidth: '200px', maxWidth: '200px'
            }
          }
        ),
      }
    },

    {
      name: "cnno",
      label: "Cno",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => (
          {
            style: {
              minWidth: '200px', maxWidth: '200px'
            }
          }
        ),


      }
    },

    {
      name: "PrintLoadSheet",
      label: "PrintLoadSheet",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => (
          { style: { minWidth: '200px', maxWidth: '200px' } }
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          //  console.log(tableMeta);
          console.log(tableMeta.rowData[1]);

          // setCn([...cn,tableMeta.rowData[1]]);
          //  console.log(value);
          return <Link
            onClick={(event, value) => { deleteStatus(event, tableMeta.rowData[1]) }}
          >
            <Typography>Delete</Typography>
          </Link>
        }
      }
    },
  ];

  const dispatch = useDispatch();
  const { status, status_error, cn_status } = useSelector(statusSelector);
  const { Pickup, pickupLoading, pickupError, CancelPickup, cancelPickupLoading } = useSelector(deliveriesSelector);
  const data = cn_status;
  var container;
  const options = {
    filterType: 'checkbox',
    count: data.length,
    customToolbarSelect: (selectedRows, displayData) => {
      console.log('==>', displayData);
      container = displayData;
      selected_status_row(displayData)
    },
  };
  return (

    <Paper className={classes.root}>
      <Grid container>
        <Grid
          item
        >
          <Box
            width="100%"
            display="flex"
            justifyContent="space-around"
            alignContent="center"
            flexGrow={1}
            m={4}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                // dispatch(create_multiple_pickup(multiple_Cn))
                dispatch(createPickups(multiple_Cn,acno,name,true));
                dispatch(empty_status_array());
              }}
            >Create Pickup
                  </Button>

            <Button onClick={()=>{
              dispatch(empty_status_array());
            }}
              color="primary"
              variant="contained"
            >Reset
                  </Button>
          </Box>


        </Grid>
        <Grid
          item
          xs={12}
          lg={12}>

          <MUIDataTable
            title={"Employee List"}
            data={data}
            columns={columns}
            options={options}
          />

          {/* <Card>
            <CardContent>
            <MUIDataTable
  title={"Employee List"}
  data={data}
  columns={columns}
  options={options}
/>
            </CardContent>
            
        </Card> */}

        </Grid>
      </Grid>


    </Paper>

  )
}

export default PickupList

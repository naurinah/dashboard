import React from 'react';
import MUIDataTable from "mui-datatables";
import { Card, CardContent, Paper, Link, select,Typography, Button, Grid, Box, makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(4)
    }
  }))
const UploadShipment=({values,data})=>{
const classes = styles();
console.log('custom-values',values);
console.log('custom-data',data);


const columns = [
    // "Consignee Name"
    // 1: "Consignee Address"
    // 2: "Consignee Contact No"
    // 3: "Consignee Email"
    // 4: "Product Name"
    // 5: "COD"
    // 6: "Pieces"
    // 7: "Weight"
    // 8: "Destination"
    // 9: "Customer Reference"
    // 10: "Customer Comment"
    // 11: "Store Id"

    {
      name: "val0",
      label: "Consignee Name",
      options: {
        filter: true,
        sort: true,
        setCellProps:()=>(
          {
            style:{
            minWidth:'200px',
            maxWidth:'200px'
            }
          }
        ),
      }
    },

    {
      name: "val1",
      label: "Consignee Address",
      options:{
        filter: true,
        sort: true,
        setCellProps:()=>(
          {
            style:{
              minWidth:'200px', 
              maxWidth:'200px'
            }
          }
        ),
      }
    },
    {
        name: "val2",
        label: "Consignee Contact No",
        options:{
          filter: true,
          sort: true,
          setCellProps:()=>(
            {
              style:{
                minWidth:'200px', 
                maxWidth:'200px'
              }
            }
          ),
        }
      },
      {
        name: "val3",
        label: "Consignee Email",
        options:{
          filter:true,
          sort:true,
          setCellProps:()=>(
            {
              style:{
                minWidth:'200px', 
                maxWidth:'200px'
              }
            }
          ),
        }
      },
      {
        name: "val4",
        label: "Product Name",
        options:{
          filter: true,
          sort: true,
          setCellProps: () => (
            {
              style:{
                minWidth:'200px', 
                maxWidth:'200px'
              }
            }
          ),
        }
      },
      {
        name: "val5",
        label: "COD",
        options:{
          filter: true,
          sort: true,
          setCellProps: () => (
            {
            style:{
            minWidth:'200px', maxWidth:'200px'
              }
            }
          ),
        }
      },

      {
        name: "val6",
        label: "Pieces",
        options:{
          filter: true,
          sort: true,
          setCellProps: () => (
            {
              style:{
                minWidth:'200px', 
                maxWidth:'200px'
              }
            }
          ),
        }
      },
      {
        name: "val7",
        label: "Weight",
        options:{
          filter: true,
          sort: true,
          setCellProps: () => (
            {
              style:{
                minWidth:'200px', 
                maxWidth:'200px'
              }
            }
          ),
        }
      },
      {
        name: "val8",
        label: "Destination",
        options:{
          filter: true,
          sort: true,
          setCellProps: () =>(
            {
              style:{
                minWidth:'200px', maxWidth:'200px'
              }
            }
          ),

          customBodyRender:(value,tableMeta,updateValue)=>{
            console.log(tableMeta);
            console.log('value===',value);    
            console.log('table===',tableMeta);        
            console.log('table===',tableMeta.rowData[9]);
            return (
                <Box
                    m={1}
                    display="flex"
                >
                    
                    <select>
                        <option>0</option>
                        <option>1</option>
                    </select>
                </Box>
            )

        }
        }
      },
  ];
  const options = {
    filterType: 'checkbox',
    count: data.length,
    customToolbarSelect:(selectedRows,displayData)=>{
      console.log('==>', displayData);
    //   selected_status_row(displayData)
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
                // dispatch(createPickups(multiple_Cn,acno,name,true));
                // dispatch(empty_status_array());
              }}
            >Create Pickup
                  </Button>

            <Button onClick={()=>{
            //   dispatch(empty_status_array());
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
export default UploadShipment;

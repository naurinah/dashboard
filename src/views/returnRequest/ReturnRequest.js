import React,{useState,useEffect,useCallback}from 'react';
import MUIDataTable,{ TableFilterList } from "mui-datatables";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector,useDispatch} from 'src/store';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import {fetch_returnRequest,returnSelector} from 'src/slices/return';
import DateRangeComponent from 'src/components/DateRangeButton';
import useAuth from 'src/hooks/useAuth';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
const useStyles = makeStyles((theme) =>({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));
const ReturnRequest=({
  
  className,
  ...rest
}) => {
  const classes=useStyles();
  const {user,logout}=useAuth();
  const dispatch=useDispatch();
  const {ReturnRequestDate,returnRequest,returnRequestLoading}=useSelector(returnSelector);
  const startDate=ReturnRequestDate[0].startDate;
  const endDate=ReturnRequestDate[0].endDate;

  const getreturnRequest=(arg1,arg2,arg3,arg4)=>{
    dispatch(
      fetch_returnRequest(arg1,arg2,arg3,arg4)
    )
  }

  useEffect(()=>{
  
  dispatch(fetch_returnRequest(startDate,endDate,user.acno))
  },[]);

  // const columns = ["SheetNo", "Date", "Shipment", "PrintLoadSheet"];
  const columns = [{
    name:"CNNO",
    label:"CN#",
    options:{
     filter:true,
     sort:true,
     setCellProps:()=>(
         {style:{minWidth:'200px',maxWidth:'200px'}}
         ),
    }
   },
   {
    name:"CUST_REF",
    label:"Customer Reference",
    options:{
     filter:true,
     sort:true,
     setCellProps:()=>(
         {style:{minWidth:'200px',maxWidth:'200px'}}
         ),
    }
   },

   {
    name:"CON_NAME",
    label:"Customer",
    options:{
     filter:true,
     sort:true,
     setCellProps:()=>(
         {style:{minWidth:'200px',maxWidth:'200px'}}
         ),
    }
   },
   {
    name:"CON_ADD",
    label:"Address",
    options:{
     filter:true,
     sort:true,
     setCellProps:()=>(
         {style:{minWidth:'200px',maxWidth:'200px'}}
         ),
    }
   },
   {
    name:"CON_CEL",
    label:"Contact",
    options:{
     filter:true,
     sort:true,
     setCellProps:()=>(
    {style:{minWidth:'200px',maxWidth:'200px'}}
    ),
    }
   },
   {
    name:"COD_AMT",
    label:"COD",
    options:{
     filter:true,
     sort:true,
     setCellProps:()=>(
         {style:{minWidth:'200px',maxWidth:'200px'}}
         ),
    }
   },
   
   {
    name:"ORIG_CITY",
    label:"ORIGIN",
    options:{
     filter:true,
     sort:true,
     setCellProps:()=>(
       {style:{minWidth:'200px',maxWidth:'200px'}}
         ),
        //  customBodyRenderLite:(dataIndex, rowIndex) => {
        //   console.log(dataIndex);
        //   console.log(rowIndex);
        //     return (
        //       <button onClick={() => window.alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)}>
        //         Edit
        //       </button>
        //     );
        //   }
          customBodyRender: (value,tableMeta,updateValue) => {
            console.log(tableMeta.rowData[6]);
            console.log(tableMeta.rowData[7]);
            console.log(value);
            console.log(updateValue);
            },

    }
   },
   {
    name:"DEST_CITY",
    label:"DESTI",
    options:{
     filter:true,
     sort:true,
     setCellProps:()=>(
       {style:{minWidth:'200px',maxWidth:'200px'}}
         ),
        //  customBodyRenderLite:(dataIndex, rowIndex) => {
        //   console.log(dataIndex);
        //   console.log(rowIndex);
        //     return (
        //       <button onClick={() => window.alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)}>
        //         Edit
        //       </button>
        //     );
        //   }
          customBodyRender: (value,tableMeta,updateValue) => {
            console.log(tableMeta.rowData[6]);
            console.log(tableMeta.rowData[7]);
            console.log(value);
            console.log(updateValue);
            },
    }
   },

   
   {
    name:"COD_AMT",
    label:"Status",
    options:{
     filter:true,
     sort:true,
     setCellProps:()=>(
         {style:{minWidth:'200px',maxWidth:'200px'}}
         ),
         customBodyRender:(data,type,row)=>{
          console.log('data',data);
          console.log('row',row);
          // console.log('data=',data);
          // console.log('type=',type); 
         //  return <span>{data}'-'</span>

         return <Button
         variant="outlined"
         size="small"
        
        >
          {data}
        </Button>
      }
    }
   },

   {
    name:"COMENT",
    label:"Comment",
    options:{
     filter:true,
     sort:true,
     setCellProps:()=>(
         {style:{minWidth:'200px',maxWidth:'200px'}}
         ),
    }
   },

   {
    name:"COMENT",
    label:"Action",
    options:{
     filter:true,
     sort:true,
     setCellProps:()=>(
         {style:{minWidth:'200px',maxWidth:'200px'}}
         ),
    }
   },]
   const data=returnRequest.detail;
    // const data = [
    //  ["Joe James", "Test Corp", "Yonkers","NY"],
    //  ["John Walsh", "Test Corp", "Hartford","CT"],
    //  ["Bob Herm", "Test Corp", "Tampa","FL"],
    //  ["James Houston","Test Corp","Dallas","TX"],
    // ];
    const options={
      filterType:'checkbox',
    };
  return (
    <Card
      className={clsx(classes.root,className)}
      {...rest}
    >
    <CardHeader 
    title="Return Request"  
    action={
        <DateRangeComponent
          fetchdata={getreturnRequest}
          startDate={startDate}
          endDate={endDate}
        />
        } />
    <Divider/>
    <CardContent>
      {/* <Box
        p={1}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Button startIcon={<AttachMoneyIcon/>}>
          Create Invoices
        </Button>
        <Button startIcon={<ReceiptIcon/>}>
          Resend Due Invoices
        </Button>
      </Box> */}


{returnRequestLoading==true  ?
<Box
mt={5}
display="flex"
justifyContent="center"
alignItems="center"
minHeight={320}>
<CircularProgress />
</Box>:
<Box 
m={3}>
<MUIDataTable
data={data}
columns={columns}
options={options}
/>
</Box>
}
</CardContent>
</Card> 
  );
};
ReturnRequest.propTypes = {
className:PropTypes.string,
// customer:PropTypes.object.isRequired
};
export default ReturnRequest;
import React,{useEffect} from 'react';
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
  CircularProgress,
  Typography,
  makeStyles
} from '@material-ui/core';
import {fetch_returnSummary,returnSelector} from 'src/slices/return';
import DateRangeComponent from 'src/components/DateRangeButton';
import useAuth from 'src/hooks/useAuth';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
const useStyles = makeStyles((theme) => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));
const ReturnSummary=({
  
  className,
  ...rest
}) => {
  const classes = useStyles();
  const {user,logout}=useAuth();
  const dispatch=useDispatch();
  const {SummaryRequestDate,returnSummary,returnSummaryLoading}=useSelector(returnSelector);
  const startDate=SummaryRequestDate[0].startDate;
  const endDate=SummaryRequestDate[0].endDate;

  const getreturnSummary=(arg1,arg2,arg3)=>{
    dispatch(
      fetch_returnSummary(arg1,arg2,arg3)
    )
  }
  useEffect(()=>{
    console.log('returnSummary==>',returnSummary);
    console.log('loading==>',returnSummaryLoading);
    dispatch(fetch_returnSummary(startDate,endDate,user.acno));
    },[dispatch])
// const columns = ["SheetNo","Date","Shipment","PrintLoadSheet"];

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
  name:"RET_DATE",
  label:"Return Date",
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
  name:"COD_AMT",
  label:"From To",
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
  label:"Status",
  options:{
   filter:true,
   sort:true,
   setCellProps:()=>(

       {style:{minWidth:'200px',maxWidth:'200px'}}
       ),
  }
 },

 ]

// const data = [
//  ["Joe James", "Test Corp", "Yonkers", "NY"],
//  ["John Walsh", "Test Corp", "Hartford", "CT"],
//  ["Bob Herm", "Test Corp", "Tampa", "FL"],
//  ["James Houston","Test Corp","Dallas","TX"],
// ];
const data=returnSummary.detail
const options = {
  filterType: 'checkbox',
};
  return (
    <Card
      className={clsx(classes.root,className)}
      {...rest}
    >
      <CardHeader 
      title="ReturnSummary"  
      action={
      <DateRangeComponent
        fetchdata={getreturnSummary}
        startDate={startDate}
          endDate={endDate}
        />
        }
        />
      <Divider />
      <CardContent>
      {/* <Box
        p={1}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Button startIcon={<AttachMoneyIcon/>}>
          Create Invoice
        </Button>
        <Button startIcon={<ReceiptIcon/>}>
          Resend Due Invoices
        </Button>
      </Box> */}
{

// returnSummaryLoading==true?
// <Box
//             mt={5}
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             minHeight={320}>
//             <CircularProgress />
//           </Box>:

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
ReturnSummary.propTypes = {
  className:PropTypes.string,
  // customer:PropTypes.object.isRequired
};

export default ReturnSummary;

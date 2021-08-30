import React,{useEffect}from 'react';
import MUIDataTable,{ TableFilterList } from "mui-datatables";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector,useDispatch} from 'src/store';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Typography,
  CardContent,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import {fetch_approvedRequest,returnSelector} from 'src/slices/return';
import useAuth from 'src/hooks/useAuth';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
const useStyles = makeStyles((theme) => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));
const ApprovedRequest=({
  
  className,
  ...rest
}) => {
  const classes = useStyles();
  const {user,logout}=useAuth();
  const dispatch=useDispatch();
  const {approveRequest,approveRequestLoading,approveRequestError}=useSelector(returnSelector);
  useEffect(()=>{
    console.log('approved_request=>',approveRequest);
    dispatch(fetch_approvedRequest(user.acno,'A'));
    },[dispatch]);

    // const columns = ["SheetNo","Date","Shipment","PrintLoadSheet"];
    const columns = [ {
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
    // const data = [
    //  ["Joe James", "Test Corp", "Yonkers", "NY"],
    //  ["John Walsh", "Test Corp", "Hartford", "CT"],
    //  ["Bob Herm", "Test Corp", "Tampa", "FL"],
    //  ["James Houston","Test Corp","Dallas","TX"],
    // ];
    const data=approveRequest.detail;
    const options = {
      filterType:'checkbox',
    };
    console.log('approve_request',approveRequest);
  return (
    <Card
      className={clsx(classes.root,className)}
      {...rest}
    >
      <CardHeader title="Approved Request" />
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


// approveRequestLoading==true?
// <Box
// mt={5}
// display="flex"
// justifyContent="center"
// alignItems="center"
// minHeight={320}>
// <CircularProgress />
// </Box>:
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
ApprovedRequest.propTypes = {
className:PropTypes.string,
// customer:PropTypes.object.isRequired
};
export default ApprovedRequest;

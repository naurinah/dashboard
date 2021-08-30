import React from 'react';
import MUIDataTable,{ TableFilterList } from "mui-datatables";
import {Typography,makeStyles,Box,Link,Card,CardContent,CircularProgress} from '@material-ui/core';
const useStyles=makeStyles((theme)=>({
root:{
    
}
}));
export default function MultiTrack({pickup,loading}) {
    console.log('pickup=>',pickup);
    console.log('loading==>',loading);
// const columns = ["SheetNo", "Date", "Shipment", "PrintLoadSheet"];
const columns=[
    {
        name:"sheet_no",
        label:"SheetNo",
        options:{
         filter:true,
         sort:true,
         setCellProps:()=>(
{style:{
minWidth:'200px',maxWidth:'200px'}}

),
        }
       },
       {
        name:"sheet_date",
        label:"Date",
        options:{
         filter:true,
         sort:true,
         setCellProps:()=>(
             {style:{minWidth:'200px',maxWidth:'200px'}}
             ),
        }
       },
       {
        name:"shipment",
        label:"ShipmentCount",
        options: {
         filter: true,
         sort: true,
         setCellProps:()=>(
            {style:{minWidth:'200px',maxWidth:'200px'}}
            ),
        }
       },
       {
        name:"PrintLoadSheet",
        label:"PrintLoadSheet",
        options:{
         filter: true,
         sort: true,
         setCellProps:()=>(
             {style:{minWidth:'200px',maxWidth:'200px'}}
             ),
         customBodyRender:(data,type,row)=>{
             console.log(data);
            return  <Link 
            target="_blank"
            rel="noreferrer"
            href={`http://benefit.blue-ex.com/customerportal/inc/cnprncust.php?${1}`}>
            <Typography>Print</Typography>
</Link>    
        }
        }
       },
       {
        name:"PrintCn",
        label:"PrintCn",
        options:{
         filter: true,
         sort: true,
         setCellProps:()=>({style:{minWidth:'200px',maxWidth:'200px'}}),
         customBodyRender:(data,type,row)=>{
            return  <Link 
            target="_blank"
            rel="noreferrer"
            href={`http://benefit.blue-ex.com/customerportal/inc/cnprncust.php?${1}`}>
            <Typography>PrintCn</Typography>
</Link>    
        }
        }
       }
];

// const data = [
//  ["Joe James", "Test Corp", "Yonkers", "NY"],
//  ["John Walsh", "Test Corp", "Hartford", "CT"],
//  ["Bob Herm", "Test Corp", "Tampa", "FL"],
//  ["James Houston","Test Corp","Dallas","TX"],
// ];
const data=pickup;
const options = {
filterType:'checkbox',
};
return (
<div>
{loading==true? <Box
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
</div>
)
}


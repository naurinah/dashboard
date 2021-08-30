import React from 'react'
import {Box,CircularProgress} from '@material-ui/core'
import Chip from '@material-ui/core/Chip';
import MUIDataTable, { TableFilterList } from "mui-datatables";
// import TrackingDetail from './TrackingView';
// import GenericMoreButton2 from 'src/views/customer/CustomerListView/GenericMoreButton2';

export default function result({
  className,
  statement,
  loading}) {
const columns=[

  {
  name: "FPS_CODE",
  label: "Refs No",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "DATE",
  label: "Date",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name:"SDATE",
  label: "Period",
  options:{
   filter:true,
   sort:true,
  }
 },
 {
  name:"EDATE",
  label:"Period",
  options:{
   filter:true,
   sort:true,
  }
 },
 {
  name: "CODAMOUNT",
  label:"COD",
  options:{
   filter:true,
   sort:true,
  }
 },
 {
  name:"print_statement",
  label:"Print Statement",
  options:{
   filter:true,
   sort:true,
  }
 },
];
const data=statement;
const options={
  // filterType: 'checkbox',
  customToolbarSelect:(selectedRows, displayData, setSelectedRows) =>{
      // <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
  },
  // show the filter icon in the toolbar (true by default
  // responsive: 'standard',
  // rowsPerPage: 50,
  // rowsPerPageOptions: [50],
};

{/* <MUIDataTable
  data={data}
  columns={columns}
  options={options}
/> */}

return(
<div>
{loading===true ?
<Box
mt={5}
display="flex"
justifyContent="center"
alignItems="center"
minHeight={320}>
<CircularProgress />
</Box>:
<MUIDataTable
data={data}
columns={columns}
options={options}
/>
}
</div>
)
}

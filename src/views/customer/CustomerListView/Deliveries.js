import React,{useEffect,useState,memo} from 'react'
import MUIDataTable, { TableFilterList } from "mui-datatables";
import {Box,SvgIcon,IconButton,Link,CircularProgress,TableCell,Button,makeStyles} from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import {
    Edit as EditIcon,
    Disc as DiscIcon,
    ArrowRight as ArrowRightIcon,
    Search as SearchIcon,
    Eye as EyeIcon
  } from 'react-feather';
import TrackingDetail from './TrackingView';
import GenericMoreButton2 from 'src/views/customer/CustomerListView/GenericMoreButton2';
import swal from 'sweetalert';

const useStyles=makeStyles((theme)=>({
    root:{
    },
    booked: {
        backgroundColor:'#00adef',
        color:'#ffffff',
      },
      delivered:{
        backgroundColor:'#c6d53f',
        color:'#ffffff',
      },
      arrived:{
        backgroundColor:'#7e5e7b',
        color:'#ffffff',
      },
      intransit: {
        // fontWeight:'100',
        // fontSize:'10px',
        backgroundColor:'#ffb822',
        color:'#ffffff'
      },
      returned: {
        backgroundColor:'#ed1f60',
        color:'#ffffff'
      },
      arrival: {
        backgroundColor:'#333',
        color:'#ffffff'
      },
      readyforpickup:{
        backgroundColor:'#03a596',
        color:'#ffffff'
      }
        }));

const DeliveriesView=({
    className,
    customers,
    deliveries,
    loading
  })=> {
const [modal,setmodal]=useState(false);
const [btn, setbtn]=useState('');
const onShowModal=()=>{
setmodal(!modal);
  }
const classes=useStyles();
useEffect(()=>{
},[])

    const columns=[     
        {
        name:"CNNO",
        label:"Cnno",
        options:{
        //  filter:true,
         sort:true,
        }
       },
       {
        name: "CUST_REF",
        label: "Customer Reference",
        options: {
         filter: true,
         sort: true,
         display:false,
         customHeadRender:({index,...column})=>{
        return(  
<TableCell 
key={index} 
style={{minWidth:"200px",maxwidth:'200px'}}>
<span>
{column.label} +'_' 
</span>
{/* <CustomColumn label={column.label} />    */}
</TableCell>
)
         }
        }
       },


       {
        name:"CN_DATE",
        label:"Book Date",
        options:{
         filter:true,
         sort:true,
         setCellProps:()=>({style:{minWidth:"200px",maxWidth:"200px"}}),
        //  customBodyRender:(data,type,row)=>{
        //     return <span>{data}</span>
        //  }
        }
       },

       {
        name: "ORIG_CITY",
        label: "Origin City",
        options: {
         filter: true,
         sort: true,
         setCellProps:()=>({style:{minWidth:'200px',maxWidth:'200px'}}),
        }
       },
       {
        name: "DEST_CITY",
        label: "Destination City",
        options: {
         filter: true,
         sort: true,
         setCellProps:()=>({style:{minWidth:'200px',maxWidth:'200px'}}),
        }
       },
       {
        name: "PROD_VALUE",
        label: "Prod Value",
        options: {
         filter: true,
         sort: true,
         setCellProps:()=>({style:{minWidth:'200px',maxWidth:'200px'}}),
        }
       },

       {
        name:"PCS",
        label:"Pcs",
        options: {
         filter: true,
         sort: true,
         setCellProps:()=>({style:{minWidth:'200px',maxWidth:'200px'}}),
        }
       },
       {
        name:"ARRIVAL_WGT",
        label:"Arrival Weight",
        options: {
         filter:true,
         sort: true,
         setCellProps:()=>({style:{minWidth:'200px',maxWidth:'200px'}}),
        }
       },
       {
        name:"STAT_MSG",
        label:"STATUS",
        options: {
         filter: true,
         sort: true,
         setCellProps:()=>({style:{minWidth:'260px',maxWidth:'260px'}}),
         customBodyRender:(data,type,row)=>{
             // console.log('data=',data);
             // console.log('type=',type); 
            //  return <span>{data}'-'</span>
            return <Button
            variant="outlined"
            size="small"
            className={
                data=='Delivered'?
                 classes.delivered:data=='Arrived'?
                 classes.arrived:data=='Booked'?
                 classes.booked:data== 'In-Transit'?
                 classes.intransit:data=='Return to shipper'?
                 classes.returned:data=='Arrival'?
                 classes.arrival:data=='Ready For Pickup'?
                 classes.readyforpickup
                 :''
             }
           >
             {data}
           </Button>
         }


        }
       }
      ,

       {
        name:"CON_NAME",
        label:"Connection Address",
        options:{
        filter: true,
        sort: true,
        display:false,
        setCellProps:()=>({style:{minWidth:"250px",maxWidth:"250px"}}),
        customBodyRender:(data,type,row)=>{
            return <span>{data}'-'</span>    
        }
        }
       },
       {
        name:"SERVICE_CODE",
        label:"Service Code",
        options:{
         filter:true,
         sort:true,
         setCellProps:()=>({style:{minWidth:'200px',maxWidth:'200px'}}),
        }
       },
       {
        name:"CON_CONT",
        label:"Name",
        options: {
         filter: true,
         sort: true,
         setCellProps:()=>({style:{minWidth:'200px',maxWidth:'200px'}}),
        }
       }
       ,
       {
        name:"CON_ADD",
        label:"Addrees",
        options: {
         filter: true,
         sort: true,
         setCellProps:()=>({style:{minWidth:'200px',maxWidth:'200px'}}),
         display:false,
        }
       },

       {
        name:"NO_OF_ATTEMPTS",
        label:"No of Attempts",
        options: {
         filter: true,
         sort: true,
         setCellProps:()=>({style:{minWidth:'200px',maxWidth:'200px'}}),
        }
       },      
       {
        name:"CNNO",
        label:"Actions",
        options: {
        filter: false,

       
        sort: false,
        setCellProps:()=>({style:{minWidth:'250px',maxWidth:'250px'}}),
          // customBodyRenderLite:(dataIndex, rowIndex) => {
          //   return (
          //     <button onClick={() => window.alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)}>
          //       Edit
          //     </button>
          //   );
          // }

          customBodyRender:(value,tableMeta,updateValue)=>{ 
            // console.log('Row_status=>',tableMeta.rowData[8]);
            return (
            <Box  dispay="flex">
              <IconButton id={value} onClick={()=>{
                setbtn(value)
                //   renderTrackView(value)
                  }
                              }>
                            <SvgIcon 
                            fontSize="small">
                              <DiscIcon/>
                            </SvgIcon>
                          </IconButton>
                          {btn ===value?<TrackingDetail
                            data={value}
                            model={true}
                            showModal={onShowModal} />:''}
                          {tableMeta.rowData[8]==='Booked' ?
                            <GenericMoreButton2
                              cnno={{cnno:value}}
                              index={value}
                            />
                            : ''}
                            


<IconButton id={value} onClick={()=>{
                            //   renderTrackView(value)
                          }
                              }>
                                
                            <SvgIcon 
                            fontSize="small">
                              <Link 
                              target="_blank"
                              rel="noreferrer"
                              href={`http://benefit.blue-ex.com/customerportal/inc/cnprncust.php?${value}`}>
                              <PrintIcon color="action" />
  </Link>
                            </SvgIcon>
                          </IconButton>





                        </Box>
                
          )}



        }
      },
      ];
      const data=deliveries;
      const options={
        // filterType: 'checkbox',

        
        customToolbarSelect:(selectedRows,displayData,setSelectedRows) => {
            console.log('setSelectedRows==>',setSelectedRows);
            console.log('display_data===>',displayData);
            console.log('selectedRows===>',selectedRows);
            //<CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
      },
        // show the filter icon in the toolbar (true by default
        // responsive: 'standard',
        // rowsPerPage: 50,
        // rowsPerPageOptions: [50],
      };
    return (
<div>


{


loading==true ?
          <Box
            mt={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={320}>
            <CircularProgress />
          </Box>:
<Box m={3}>
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

export default memo(DeliveriesView);

import React, { useState,useEffect } from 'react';
import MUIDataTable, { TableBodyRow, TableFilterList } from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSelector, useDispatch } from 'src/store';
import { Typography, makeStyles, Box, Link, Card, CardContent, CircularProgress } from '@material-ui/core';
import EditLocation from './Editlocation';
import swal from 'sweetalert'
const useStyles = makeStyles((theme) => ({
    root: {

    }
}));
const EditRow = (id)=>{
console.log('edit_row=', id);
}
const DeleteRow=(id)=>{
console.log('delete_row=',id);
}
export default function PickupLocation({acno,pickup,loading,editfunc,deletefunc,editdata,delete_data,makedefault,default_data}) {
    const [toggle, setToggle]=useState(false);
    const [myvalue, setValue]=useState([]);
    const [refresh,setrefresh]=useState(false);
    const dispatch=useDispatch();
    
    // useEffect(()=>{
    //     console.log('deleted_data',delete_data);
    //     console.log('default_data',default_data);
    // },[default_data]);
    

    // const columns = ["SheetNo", "Date", "Shipment", "PrintLoadSheet"];

    const columns = [
        {
            name: "NAME",
            label: "Name",
            options: {
                filter: true,
                sort: true,
                setCellProps: () => (
                    {
                        style: {
                            minWidth: '200px',
                            maxWidth: '200px'
                        }
                    }
                ),
            }
        },
        {
            name: "CONTACT",
            label: "ContactNo",
            options: {
                filter: true,
                sort: true,
                setCellProps: () => (
                    {
                        style: {
                            minWidth: '200px',
                            maxWidth: '200px'
                        }
                    }
                ),
            }
        },
        {
            name: "EMAIL",
            label: "Email",
            options: {
                filter: true,
                sort: true,
                setCellProps: () => (
                    {
                        style: {
                            minWidth: '200px',
                            maxWidth: '200px'
                        }
                    }
                ),
            }
        },
        {
            name: "ORI_CITY",
            label: "Origin",
            options: {
                filter: true,
                sort: true,
                setCellProps: () => (
                    {
                        style: {
                            minWidth:'200px',
                            maxWidth:'200px'
                        }
                    }
                ),
                //          customBodyRender:(data,type,row)=>{
                //              console.log(data);
                //             return  <Link 
                //             target="_blank"
                //             rel="noreferrer"
                //             href={`http://benefit.blue-ex.com/customerportal/inc/cnprncust.php?${1}`}>
                //             <Typography>Print</Typography>
                // </Link>    
                //         }
            }
        },
        {
            name: "LOCATION",
            label: "Address",
            options: {
                filter: true,
                sort: true,
                setCellProps: () => ({
                    style: {
                        minWidth: '200px',
                        maxWidth: '200px'
                    }
                }),

                //          customBodyRender:(data,type,row)=>{
                //             return  <Link 
                //             target="_blank"
                //             rel="noreferrer"
                //             href={`http://benefit.blue-ex.com/customerportal/inc/cnprncust.php?${1}`}>
                //             <Typography>PrintCn</Typography>
                // </Link>    
                //         }
            }
        }
        ,

        {
            name: "ID",
            label: "Action",
            options: {
                filter: true,
                sort: true,
                setCellProps: () => ({
                    style:{
                        minWidth: '200px',
                        maxWidth: '200px'
                    }
                }),
                customBodyRender:(value,tableMeta,updateValue)=>{
                    return (
                        <Box
                            m={1}
                            display="flex"
                        >
                            <EditIcon
                                onClick={()=>{
                                    console.log('edit icon');
                                    setValue(tableMeta.rowData);
                                    setToggle(!toggle)
                                   
                                    // setTimeout(()=>{
                                    // },1000)
                                }}
                                // onChange={(event)=>{
                                //     updateValue
                                // }}

                                color="primary" />

                            <DeleteIcon
                                onClick={()=>{
                                    console.log('delete icon');
                                    dispatch(deletefunc(value,acno))


        
                                        if (delete_data.status == 1) {
                                    
                                            swal({
                                                title: "SUCCESS:",
                                                text: "Pickup Removed",
                                                type: "success"
                                            });
                                           
                                        } 
                                        
                                        // else if(delete_data.status != 1) {
                                        //     swal({
                                        //         title: "Error:",
                                        //         text: "Try Again",
                                        //         type: "error"
                                        //     });
                                        // }
                        
                                    
                              
                                }}
                                style={{color:"red"}}/>

<AddCircleIcon
                                onClick={() => {
                                    console.log('default');
                                    dispatch(makedefault(value,acno))

                                    if (default_data.status == 1) {
                                    
                                        swal({
                                            title: "SUCCESS:",
                                            text: "Pickup Default",
                                            type: "success"
                                        });
                                       
                                    } 
                                }
                                }
                                style={{color:"#333"}} />

                        </Box>
                    )
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

    const data = pickup;
    const options = {
        filterType: 'checkbox',
    };

  
    return (
        <div>
            {

                <Box m={3}>
{/* {
delete_data.status==1 ?
<div> {swal('Pickup Location Deleted successfully')}</div>:''} */}
                    {toggle==true && myvalue.length > 0 ? 
                    <EditLocation 
                    editfunc={editfunc} 
                    acno={acno} 
                    data={myvalue} 
                    editdata={editdata}
                    dialogPopover={toggle}
                    />
                    :false
                    }
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


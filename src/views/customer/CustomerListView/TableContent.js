import React, { useState,useEffect} from 'react'
// import EmployeeForm from "./EmployeeForm";
// import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper,Grid, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "./Components/useTable";
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import {addDays} from 'date-fns';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin:theme.spacing(5),
        padding:theme.spacing(3)
    },
    searchInput: {
        width:'20%'
    }
}))


// const headCells = [
//     { id: 'fullName', label: 'Employee Name' },
//     { id: 'email', label: 'Email Address (Personal)' },
//     { id: 'mobile', label: 'Mobile Number' },
//     { id: 'department', label: 'Department', disableSorting: true },
// ]

const headCells=[
    { id: 'CNNO', numeric: true, disableSorting: false,label:'CNNO',hidden:true},
    { id: 'CUST_REF', numeric: false, disableSorting:false, label:'CUST_REF',hidden:true},
    { id: 'BOOKED_DATE', numeric: true, disableSorting:false, label:'BOOKED_DATE',hidden:true },
    { id: 'ORIG_CITY', numeric: false, disableSorting:false, label:'ORIG_CITY',hidden:false },
    { id: 'DEST_CITY', numeric: false, disableSorting:false, label:'DEST_CITY',hidden:false },
    { id: 'PROD_VALUE', numeric: true, disableSorting:false, label:'PROD_VALUE',hidden:false },
    { id: 'PCS', numeric: true, disableSorting: false, label: 'PCS',hidden:false },
    { id: 'ARRIVAL_WGT', numeric: true, disableSorting: false, label:'ARRIVAL_WGT',hidden:false },
    { id: 'STATUS', numeric: true, disableSorting: false, label:'STATUS',hidden:false},
    { id: 'CON_NAME', numeric:true, disableSorting: false, label:'CON_NAME',hidden:false },
    { id: 'FPS_CODE', numeric:true, disableSorting: false, label:'FPS_CODE',hidden:false },
    { id: 'CON_CONT', numeric:true, disableSorting: false, label:'CON_CONT',hidden:false },
    { id: 'CON_ADD', numeric:true, disableSorting: false, label:'CON_ADD',hidden:false },
    { id: 'NO_OF_ATTEMPTS',numeric: false, disableSorting: false, label:'NO_OF_ATTEMPTS',hidden:false },
  ];



export default function Employees() {
    const classes=useStyles();
    const [records, setRecords]= useState([])
    const [filterFn, setFilterFn]= useState({ fn: items => {return items;} });
    const [datestate,setDateState]=React.useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(),5),
          key: 'selection'
        }
      ]);
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,       
    } = useTable(records, headCells, filterFn);

    useEffect(()=>{
        console.log('filterfn:=>',filterFn);
        var acno="KHI-00114";
        var formdata=new FormData();
        console.log(formdata);
      // formdata.append("request", {"acno":"KHI-00114","startdate":"2020/08/12","enddate":"2020/08/13","startlimit":"","endlimit":"","status":"All"});
      // formdata.append("startdate","2020/08/10");
      // formdata.append("enddate","2020/08/13");
      // formdata.append("startdate","2018/01/01");
      // formdata.append("enddate","2020/07/31");
      formdata.append("startdate","2020/07/01");
      formdata.append("enddate","2020/09/30");
        // formdata.append("startdate",date1result);
        // formdata.append("enddate",date2result);
        formdata.append("status", "All");
        formdata.append("acno","KHI-04324");
        // formdata.append("acno", "KHI-04618");
        formdata.append("startlimit", "");
        formdata.append("endlimit", "");
        var requestOptions={
          method: 'POST',
          body: formdata,
        };

        var formdata = new FormData();
        var obj ={startdate:'2020/07/01',enddate:'2020/09/30',status:"All",acno:'KHI-04324',startlimit:"",endlimit:""};
        // var obj = {startdate: date1result, enddate:date2result, acno: "KHI-04618" };
        var myJSON = JSON.stringify(obj);
        formdata.append("request", myJSON);
        console.log('myJSON=',myJSON);
        var requestOptions = {
          method: 'POST',
          body: formdata,
        };


        fetch("http://benefitx.blue-ex.com/api/customerportal/deliveries.php",requestOptions)
        .then(response => response.json())
        .then(result =>{
        if(result!=null){
        setRecords(result);
            }
        })
        .catch(error =>console.log('error', error));
    },[]);
    
   
    const handleSearch = e => {
        let target = e.target
        setFilterFn({
            fn: items => {
            if (target.value==""){
            return items;
                }
                else{
                return items.filter(x =>x.fullName.toLowerCase().includes(target.value));
                }
            }
        })
    }
    return (
        <Grid 
        container 
       >
            {/* <PageHeader
                title="New Employee"
                subTitle="Form design with validation"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            /> */}

            <Paper className={classes.pageContent}>
                {/* <EmployeeForm /> */}
                <Grid 
                item
                sm={12}
                md={12}
                lg={12}
                sm={12}
                xs={12}
                >
                <Toolbar>
                    <Controls.Input
                    label="Search Employees"
                    className={classes.searchInput}
                    InputProps={{
                    startAdornment:(<InputAdornment position="start">
                    <Search />
                    </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>
                </Grid>


                <Grid 
                item 
                sm={12}
                md={12}
                lg={12}
                sm={12}
                xs={12}>



                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                    recordsAfterPagingAndSorting().map(item =>
                    (<TableRow key={item.id}>
                    <TableCell component="th" id={item.id} scope="row" padding="none">
                    {item.CNNO}
                    </TableCell>
                    <TableCell >{item.CUST_REF}</TableCell>
                    <TableCell >{item.BOOKED_DATE}</TableCell>
                    <TableCell >{item.ORIG_CITY}</TableCell>
                      <TableCell >{item.DEST_CITY}</TableCell>
                      <TableCell >{item.PROD_VALUE}</TableCell>
                      <TableCell >{item.PCS}</TableCell>
                      <TableCell >{item.ARRIVAL_WGT}</TableCell>
                      <TableCell >{item.STATUS}</TableCell>
                      <TableCell >{item.CON_NAME}</TableCell>
                      <TableCell >{item.FPS_CODE}</TableCell>
                      <TableCell >{item.CON_CONT}</TableCell>
                      <TableCell >{item.CON_ADD}</TableCell>
                      <TableCell >{item.NO_OF_ATTEMPTS}</TableCell>
                    </TableRow>
                    
                    )
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
                </Grid>
            </Paper>

            </Grid>
    )
}

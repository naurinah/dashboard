import React, {useState,useEffect} from 'react';
import {
Grid, Select, Button, Paper, Tabs, Tab,
Divider, MenuItem,CircularProgress,FormControl,InputLabel,FormHelperText,makeStyles, Box, Link, TextField, Typography
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from 'src/hooks/useAuth';
import useCities from 'src/hooks/useCities';
import LocationModalView from 'src/views/LocationModal';
import clsx from 'clsx';
import TabPanel from 'src/components/Panel';
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import {useSelector,useDispatch} from 'src/store';
import {submitBooking,bookingSelector,fetch_all_locations,fetch_selected_location} from 'src/slices/booking';
import Shipments from './Shipments';
import UploadShipment from './UploadShipment';
import UploadShipmentSuccess from './UploadShipmentSuccess';
import UploadShipmentError from './UploadShipmentError';


// import propTypes from 'src/components/propTypes';

const useStyles = makeStyles((theme) => ({
    label: {
        display: 'flex',
        width: '22ch',
        //    border:'solid #333',
        // verticalAlign:'baseline'
    },
    textField: {
        marginBottom:'4',
        // marginRight: theme.spacing(5),
        width:'50ch',
        color:'#6f727d',
        // marginLeft: '10%',
        backgroundColor:'#f4f5f8'
    },
    feildContainer: {
        display:'flex',
        alignItems:'center',
        alignContent:'center',
        alignContent:'flex-start',
        // justifyContent:'space-between',
        marginBottom:theme.spacing(1)
    },
    feildBox: {
        display:'flex',
        alignItems:'center',
        // alignContent: 'center',
        // justifyContent:'space-between',
        marginBottom:theme.spacing(1)
    },
    //   label: {
    //     // padding: theme.spacing(3, 0, 2, 2),
    //     width: '50ch'
    // },
    table: {
        borderCollapse:'collapse',
        padding:'5px',
        textAlign:'center',
        margin:'7px',
        border:'solid #333'
    }
}))

const BulkImport= ({ className, ...rest }) => {
    const classes= useStyles();
    const [shipper,setShipper]=useState([]);
    const [locations,setLocation]=useState([]);
    const [toggle,setToggle]=useState(false);
    const [valid,setvalid]=useState([]);
    const [wrong,setwrong]=useState([]);
    const [data,setData]=useState([]);
    const[heading,setHeading]=useState([]);
    const [rows, setRows]=useState([]);
    const [cols, setCols]=useState([]);
    const [test,setTest]=useState([]);

    const [tabs, setTab]=useState({ value: 0 });
    const citiesDropdown=useCities;
    const {user}=useAuth();
    const {acno} = user;
    const dispatch = useDispatch();
    const {booking,booking_error,location,location_error,selected_Location,selected_location_error,location_loading,default_location} = useSelector(bookingSelector);
    const [currentTab, setCurrentTab]=useState('details');
    const tabs_ = [
      { value: 'details', label: 'UPLOAD SHIPMENT LIST'},
      { value: 'invoices', label: 'UPLOAD ERRORS'},
      { value: 'logs', label: 'UPLOAD SUCCESSFULLY'}
    ];
    const handleTabsChange = (event, value) => {
      setCurrentTab(value);
    };
    const handleChangeTab=(e, newValue) => {
        setTab({value:newValue});
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

//     const downloadLink=()=>{
// console.log('from download link');
// console.log('download link');
// fetch('https://cors-anywhere.herokuapp.com/' + fileURL, {
//     method: 'GET',
//     headers: {
//       'Content-Type':'application/pdf',
//     },
//   })
//   .then((response) =>response.blob())
//   .then((blob) => {
//     // Create blob link to download
//     const url = window.URL.createObjectURL(
//       new Blob([blob]),
//     );
//     const link = document.createElement('a');
//     link.href=url;
//     link.setAttribute(
//       'download',
//       `FileName.pdf`,
//     );
//     // Append to html link element page
//     document.body.appendChild(link);
//     // Start download
//     link.click();
//     // Clean up and remove the link
//     link.parentNode.removeChild(link);
//   });
//     }

    useEffect(()=>{
        dispatch(fetch_all_locations(acno,'all'));
        // if(location.detail!=''){
        // console.log('location_detail');
        // dispatch(fetch_selected_location(acno,'Y'));
        // }
        setLocation(location.detail);
        },[]);
        const selectHandlebar=(event)=>{
            console.log('event',event);
            console.log('value=>',event.target.value)
            console.log('id=>',event.target.id);
            dispatch(fetch_selected_location(acno,event.target.value));
                    // console.log(...selected_Location.detail[0])
                    // if(selected_Location.detail!=''){
                    // console.log('selected_location=',selected_Location.detail[0]);
                    // }
                    // const copyObject=selected_Location.detail ? {...selected_Location.detail}:[];
                    // setShipper({...selected_Location.detail});
                    // console.log(shipper);
                    // console.log('copy_object==>',copyObject);
                }

const handlechangeShipper=(e)=>{
    console.log('event',e);
    setShipper((previousState)=>{
        [e.target.name]=e.target.value
    })
}
    //  WORKING CODE ---------------------
    var custom_data=[]
    const changeHandler=(event)=>{
        // let fileObj = event.target.files[0];
        let fileObj=event;
        var datas=[];
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj,(err,resp)=>{
            console.log('rows=',resp.rows);
            console.log('cols=',resp.cols);
            console.log('Comming-fileObject==>',fileObj);

            resp.rows.map((single_row,index)=>{
                if(index==0)
                {
                 setHeading([{...single_row},...heading]);
                }
                if(index!=0){
                var indexOfLocation=citiesDropdown.findIndex(i =>i.CITY_CODE===single_row[8]);
                if(indexOfLocation!==-1)
                {
                    data.push({
                        val0:single_row[0],
                        val1:single_row[1],
                        val2:single_row[2],
                        val3:single_row[3],
                        val4:single_row[4],
                        val5:single_row[5],
                        val6:single_row[6],
                        val7:single_row[7],
                        val8:single_row[8],
                        flag:'right'});
                }
                else if(indexOfLocation===-1){
                    data.push({
                        val0:single_row[0],
                        val1:single_row[1],
                        val2:single_row[2],
                        val3:single_row[3],
                        val4:single_row[4],
                        val5:single_row[5],
                        val6:single_row[6],
                        val7:single_row[7],
                        val8:single_row[8],flag:'wrong'});
                }
                }

console.log('*',custom_data);
console.log('**',data);

                    });
            if (err){
                console.log(err);
                console.log(err.message);
            }
            else {
                console.log('else');
                console.log('else block');
                setRows(resp.rows);
                setCols(resp.cols);
            }
        });
    }
    //  WORKING CODE ---------------------
    const buttonHandler = ()=>{
    // setDialog(true);
    }

    const create_multi_pickups=(values)=>{
        // console.log('values==',values);
        // console.log('form_values',form);
        // console.log('rows==',rows);
        // console.log('cols==',cols);

        // dispatch(
        //     submitBooking(
        //         values.con_name, values.con_add, values.con_mail, values.con_cont, values.dest_country,
        //         values.dest_city, values.service_code, values.orig_city, values.pickupLocation, values.shp_name,
        //         values.shp_add, values.shp_mail, values.shp_cont,
        //         values.prod_detail, values.pcs, values.wgt,
        //         values.prod_value, values.cust_ref, values.coment,
        //         values.ptype,values.document, values.cbc,
        //         values.fragile,values.insur,values.insur_valueacno
        //     ));
    }
    console.log('test_day=',test);
    console.log('custom_data=>',custom_data);
    console.log('valid=>',data);
    console.log('heading',heading);
    console.log('wrong==>',wrong);
    return (
        <Formik
        enableReinitialize={true}
        initialValues={{
                file:null,
                service_code:'BE',
                fragile:true,
                origin_city:acno.split('-')[0],
                pickup_location:'Y',
                shipper_name:location_loading==false?selected_Location[0].NAME:'',
                shipper_email:location_loading==false?selected_Location[0].EMAIL:'',
                shipper_contact:location_loading==false?selected_Location[0].CONTACT:''
            }}
            validationSchema={Yup.object().shape({
                file:Yup.mixed().required('File is required.'),
                // file:Yup
                // .mixed()
                // .required("A file is required")
                // .test(
                //   "fileSize",
                //   "File too large",
                //   value => value && value.size <= FILE_SIZE
                // )
                // .test(
                //   "fileFormat",
                //   "Unsupported Format",
                //   value => value && SUPPORTED_FORMATS.includes(value.type)
                // ),
                service_code: Yup.string().required('Service Code is required.'),
                fragile: Yup.string().required('Fragile is required.'),
                origin_city: Yup.string().required('Origin City is required.'),
                pickup_location:Yup.string().required('Pickup Location is required.'),

            //    shipper_name:Yup.mixed().required('Shipper is required.'),
            //     shipper_email:Yup.mixed().required('Email is required.'),
            //     shipper_contact:Yup.mixed().required('Contact is required.')

                // shipper_name:Yup.string().max(10).required('Shipper is required.'),
                // shipper_email:Yup.string().required('Email is required.'),
                // shipper_contact:Yup.string().max(10).required('Contact is required.')
            })}
            onSubmit={async (values,{
                setErrors,
                setStatus,
                resetForm,
                setSubmitting}) => {
                try{
                    console.log('try_values:=>',values);
                    // create_multi_pickups(values);
                // console.log('==>',values.file);
                    changeHandler(values.file);
                    setStatus({success:true});
                    setSubmitting(false);
                    resetForm(true);
                    // changeHandler();
                }
                catch (err){
                    console.log(err);
                    console.log('message',err.message);
                    setStatus({success:false});
                    setErrors({submit:err.message});
                    setSubmitting(false);
                }
            }}
        >
            {
                ({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    touched,
                    values
                }) => (
                        <form
                            onSubmit={handleSubmit}
                            className={clsx(classes.root, className)}
                            {...rest}
                        >
                            <Grid
                                container>
                                <Grid
                                    item
                                    xs={12}
                                    lg={8}>
                                    <Box
                                        display="flex">
                                        <Typography
                                            className={classes.label}
                                            variant="h5">
                                            Booking Upload
                                    </Typography>
                                        <TextField
                                            type="file"
                                            name="file"
                                            error={Boolean(touched.file && errors.file)}
                                            helperText={touched.file && errors.file}
                                            // changeHandler
                                            onChange={
                                                (event)=>{
                                                    // console.log(handleChange);
                                                    setFieldValue("file", event.currentTarget.files[0]);
                                                  }
                                                //   handleChange
                                            }
                                            onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // onChange={changeHandler}
                                            // helperText={touched.file && errors.file}
                                            id="outlined-margin-none"
                                            margin="dense"
                                            placeholder="KHI-00114"
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        alignItems="start">
                                        <Typography
                                            className={classes.label}
                                            variant="h5">
                                            Service Code
</Typography>
                                        <FormControl
                                            margin="dense"
                                            variant="outlined"
                                            className={classes.textField}>

                                            <Select
                                                name="service_code"
                                                native
                                                error={Boolean(touched.service_code && errors.service_code)}
                                                helperText={touched.service_code && errors.service_code}
                                                onChange={handleChange}
                                            >
                                                <option value={'BE'}>BLUE EDGE</option>
                                                <option value={'BT'}>BLUE TRUNK</option>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        alignItems="start">
                                        <Typography
                                            className={classes.label}
                                            variant="h5"
                                        >
                                            Fragile:
</Typography>
                                        <FormControl
                                            margin="dense"
                                            variant="outlined"
                                            className={classes.textField}>
                                            <Select
                                                native
                                                name="fragile"
                                                error={Boolean(touched.fragile && errors.fragile)}
                                                helperText={touched.fragile && errors.fragile}
                                                onChange={handleChange}
                                            //   labelId="demo-simple-select-filled-label"
                                            //   id="demo-simple-select-filled"
                                            //   value={age}
                                            //   onChange={handleChange}
                                            >
                                                <option value={true}>Yes</option>
                                                <option value={false}>No</option>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box display="flex">
                                        <Typography
                                            className={classes.label}
                                            variant="h5">
                                            Origin City
</Typography>
                                        <FormControl
                                            margin="dense"
                                            variant="outlined"
                                            className={classes.textField}>

                                            <Select
                                                name="origin_city"
                                                // defaultValue={values.origin_city}
                                                value={(location_loading==false && default_location=='Y' ? selected_Location[0].ORI_CITY:values.orig_city
                                                || location_loading==false  ? selected_Location[0].ORI_CITY:values.origin_city)}
                                                error={Boolean(touched.origin_city && errors.origin_city)}
                                                helperText={touched.origin_city && errors.origin_city}
                                                onChange={handleChange}
                                            //   labelId="demo-simple-select-filled-label"
                                            //   id="demo-simple-select-filled"
                                            //   value={age}
                                            //   onChange={handleChange}
                                            >
            
                                                {citiesDropdown ? citiesDropdown.map((option) => (
                                                        <option
                                                            key={option.CITY_CODE}
                                                            value={option.CITY_CODE}
                                                        >
                                                            {option.CITY_NAME}
                                                        </option>
                                                    )) :
                                                        <option value="0">
                                                        </option>}  

                                            </Select>
                                        </FormControl>
                                    </Box>

                                    

                                    <Box  
                                    mt={2}
                                    display="flex">
                                        <Typography
                                            variant="h5"
                                            className={classes.label}
                                        >
                                            PickupLocation
                                    </Typography>


                                        {/* <FormControl
                                            margin="dense"
                                            variant="outlined"
                                            className={classes.textField}>
                                            <Select
                                                defaultValue={values.pickup_location}
                                                name="pickup_location"
                                                error={Boolean(touched.pickup_location && errors.pickup_location)}
                                                helperText={touched.pickup_location && errors.pickup_location}
                                                onChange={handleChange,selectHandlebar}
                                                onBlur={handleBlur}
                                            >
                                                 {location.detail ? location.detail.map((option) => (
                                                        <option
                                                            key={option.ID}
                                                            value={option.ID}
                                                        >
                                                            {option.LOCATION}
                                                        </option>
                                                    )) :
                                                        <option value="0">
                                                        </option>}

                                            </Select>
                                        </FormControl> */}


                                        <FormControl
                                                className={classes.textField}
                                                size="small"
                                                variant="outlined">
                                                <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                                                <Select
                                                    native
                                                    defaultValue={values.pickupLocation}
                                                    // error={Boolean(touched.pickupLocation && errors.pickupLocation)}
                                                    // helperText={touched.pickupLocation && errors.pickupLocation}
                                                    onChange={
                                                    handleChange,
                                                    selectHandlebar}
                                                    onBlur={handleBlur}
                                                    // label="pickupLocation"
                                                    name='pickup_location'
                                                    InputLabelProps={{
                                                        id: 'outlined-age-native-simple',
                                                      
                                                    }}
                                                >
                                                 {location.detail ? location.detail.map((option) => (
                                                        <option
                                                            key={option.ID}
                                                            value={option.ID}
                                                        >
                                                            {option.LOCATION}
                                                        </option>
                                                    )) :
                                                        <option value="0">
                                                        </option>}
                                                </Select>
                                            </FormControl>





                                    </Box>



                                    <Box 
display="flex"
justifyContent="flex-end"
alignItems="center"
>
<Button
                                                   variant="contained"
                                                   color="primary"
                                                   size="small"
                                                   onClick={()=>{
                                                       setToggle(!toggle)
                                                   }}
                                               >Add PickupLocation
</Button>




{toggle==true ? <LocationModalView dialogPopover={toggle} />:false}


</Box>
                                    {location_loading==false ?

                                    <>

                                    <Box
                                    display="flex">
                                    <Typography
                                    className={classes.label}
                                    variant="h5"
                                    align="left">
                                    Shipper Name
</Typography>
                                        <TextField
                                            type="text"
                                            name="shipper_name"
                                           
                                            // error={Boolean(touched.shipper_name && errors.shipper_name)}
                                            // helperText={touched.shipper_name && errors.shipper_name}
                                            // value={selected_Location[0].NAME}
                                            value={values.shipper_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="outlined-margin-none"
                                            margin="dense"
                                            placeholder="Test Name"
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                    </Box>

                                    <Box
                                        display="flex">
                                        <Typography
                                            className={classes.label}
                                            variant="h5"
                                            align="left">
                                            Shipper Email
</Typography>
                                        <TextField
                                            type="text"
                                            name="shipper_email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.shipper_email}
                                            // error={Boolean(touched.shipper_email && errors.shipper_email)}
                                            // helperText={touched.shipper_email && errors.shipper_email}
                                            id="outlined-margin-none"
                                            margin="dense"
                                            placeholder="test@gmail.com"
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                    </Box>

                                    <Box
                                        display="flex">
                                        <Typography
                                            className={classes.label}
                                            variant="h5" align="left">
                                            Shipper Contact
</Typography>
                                        <TextField
                                            type="text"
                                            name="shipper_contact"
                                            // error={Boolean(touched.shipper_contact && errors.shipper_contact)}
                                            // helperText={touched.shipper_contact && errors.shipper_contact}
                                            id="outlined-margin-none"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.shipper_contact}
                                            margin="dense"
                                            placeholder="03121234567"
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                    </Box>
                                    </>
                                    
                                    :  
                                    <Box
                                                display="flex"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                            >
                                                <CircularProgress />
                                            </Box>


                                            }
                                    <Box>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            // onSubmit={changeHandler}
                                            disabled={isSubmitting}
                                            style={{'margin':'5%'}}
                                        > Upload Shippments
                                        </Button>

                                    </Box>
                                </Grid>

                                <Grid item
                                    xs={12}
                                    lg={4}>

                                    <Box className={classes.root}>

                                        <Typography
                                            variant="caption"
                                            gutterBottom
                                        >
                                            • Uploading Format Information:
                                    </Typography>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            • Upload the 'xls' Format File !
                                    </Typography>

                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            • Download Your Uploading File Format Here!
                    </Typography>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            {/* <Link to="/files/upload.xls" target="_blank" download >
                                            Click Here to Download!
                    </Link> */}

                    <Link href="/files/upload.xls" target="_blank" download>Click Here to Download!</Link>

                                        </Typography>

                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    lg={12}
                                >

                                    <Paper>
                                        <Divider />
                                        {/* <Tabs
                                            value={tabs.value}
                                            onChange={handleChangeTab}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            centered>
                                            <Tab label="UPLOAD SHIPMENT LIST"  {...a11yProps(0)} />
                                            <Tab label="UPLOAD ERRORS"  {...a11yProps(1)} />
                                            <Tab label="UPLOAD SUCCESSFULLY"  {...a11yProps(2)} />
                                        </Tabs> */}


{/* <Button 
variant="contained" 
color="primary" 
onClick={(values)=>{create_multi_pickups(values)}}>
Create Shipment</Button> */}


<Box mt={3}>
<Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {tabs_.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          </Box>
          <Divider />


        <Box mt={3}>
          {
          currentTab==='details' &&   
          <UploadShipment 
          heading={heading}
          data={data} 
          values={values} />
          
          }


          {currentTab === 'invoices' &&  

<Shipments 
          data={'second tab'} 
          values={values} />}


          {currentTab === 'logs' &&      
          <Shipments 
          data={'third tab'} 
          values={values} />}
        </Box>

                                        {/* <TabPanel
                                            value={tabs.value}
                                            index={0}>

                                            <Typography
                                                variant="h3" >First Panel</Typography>

                                            <OutTable
                                                data={rows}
                                                columns={cols}
                                                // columns={}
                                                tableClassName="ExcelTable2007"
                                                tableHeaderRowClass="heading"
                                            />
                                        </TabPanel>

                                        <TabPanel value={tabs.value} index={1}>
                                            <Typography
                                                variant="h3" >Second Panel</Typography>
                                        </TabPanel>
                                        <TabPanel value={tabs.value} index={2}>

                                            <Typography
                                                variant="h3">Third Panel</Typography>

                                        </TabPanel> */}
                                    </Paper>
                                </Grid>
                            </Grid>
                            {
                                errors.submit && (
                                    <Box
                                        mt={1}>
                                        <FormHelperText error>
                                            {errors.submit}
                                        </FormHelperText>
                                    </Box>
                                )
                            }

                        </form>
                    )
            }
        </Formik>
    )
}
export default BulkImport;

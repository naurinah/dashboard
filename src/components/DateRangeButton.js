import React, {
    useRef,
    useState,
    memo
  } from 'react';
  import {
    Tooltip,
    IconButton,
    Button,
    Box,
    Popover,
    Menu,
    MenuItem,
    Breadcrumbs,
    Typography,
    makeStyles
  } from '@material-ui/core';
  import MoreIcon from '@material-ui/icons/MoreVert';
 import GetAppIcon from '@material-ui/icons/GetApp';
  import FileCopyIcon from '@material-ui/icons/FileCopy';
  import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
  import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
  import {DateRangePicker} from 'react-date-range';
  import {addDays}  from  'date-fns';
  import useAuth from 'src/hooks/useAuth';
  import 'react-date-range/dist/styles.css'; // main css file
  import 'react-date-range/dist/theme/default.css'; // theme css file
  const styles=makeStyles((theme)=>({
    root:{
      // backgroundColor: theme.palette.background.dark,
    }
  }))

  const DateRangeButton = ({fetchdata,startDate,endDate})=>{
    const moreRef = useRef(null);
    const [openMenu,setOpenMenu]=useState(false);
    const {user,logout}=useAuth();
const classes=styles();
    const [DateState,setDate]=useState([{
      startDate:startDate,
      endDate:endDate,  
      key:'selection'
    }]);
    const handleMenuOpen=()=>{
      setOpenMenu(true);
    };
    const handleMenuClose = () => {
      setOpenMenu(false);  
    
     
    }



    const handlaApply=()=>{
      setOpenMenu(false)   
      fetchdata(DateState[0].startDate,DateState[0].endDate,user.acno,true)
    
     
    }
    const changeDate=()=>{
      fetchdata(DateState[0].startDate,DateState[0].endDate)
    }
    return (
      <>
<Box 
display="flex" 
direction="column"
justifyContent="center"
alignItems="center"
 >
{`${DateState[0].startDate.toString().slice(4,10)} -
${DateState[0].endDate.toString().slice(4,10)}
`
}

<Tooltip title="More options">
<IconButton
onClick={handleMenuOpen}
ref={moreRef}
          // {...props}
>
          <MoreIcon fontSize="small"  />
        </IconButton>
      </Tooltip>
       </Box>
      {/* <Button onClick={()=>{fetchdata(DateState[0].startDate,DateState[0].endDate)}}>click</Button> */}
      {/* <Button onClick={changeDate}>click</Button> */}
      <Popover
      className={classes.root}
        anchorEl={moreRef.current}
        anchorOrigin={{
          vertical:'top',
          horizontal:'left'
        }}
        onClose={
          handleMenuClose
       
        }
        open={openMenu}
        // PaperProps={{ className: classes.menu }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
<DateRangePicker
color="black"
onChange={item =>{
setDate([item.selection]);
}}
months={2}
ranges={DateState}
direction="horizontal"
/>


<Box 
m={2}
display="flex"
flexDirection="row"
justifyContent="flex-end"
alignItems="center"
>
<Button color="primary" style={{margin:'1px'}} variant="contained" onClick={handlaApply}>Apply Button</Button>
<Button color="primary"   style={{margin:'1px'}} variant="contained" onClick={handleMenuClose}>Close Button</Button>
</Box> 
</Popover> 


</>
    );
  };  
DateRangeButton.defaultProps = {
fetchdata: (arg1) => {
    }, 
  };
  export default memo(DateRangeButton);
  
import React, {
  useRef,
  useState,
  memo,
  useEffect,
  useCallback,
} from 'react';
import {
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import MoreIcon from '@material-ui/icons/MoreVert';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'src/store';
import { fetchPickup, createPickups, deliveriesSelector,cancelConsignment} from 'src/slices/deliveries';
import useAuth from 'src/hooks/useAuth';
const useStyles = makeStyles((theme) => ({
  menu: {
    width: 256,
    maxWidth: '100%'
  },

}));

const GenericMoreButton=(props)=>{
  const { cnno }= props;
  const { index }=props;
  const classes = useStyles();
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] =useState(false);
  const [isConfirm, setConfirm] =useState(false);
  const [isCancel, setCancel] =useState(false);
  const [pickup, setpickup] =useState([]);
  const [pickupdetail, setpickupDetail] =useState([]);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { Pickup, pickupLoading, pickupError, CancelPickup, cancelPickupLoading } = useSelector(deliveriesSelector);
  const { name, acno, type } = user;

  const openPickup1 = (Cnno,Account,Name) => {
    dispatch(createPickups(Cnno,Account,Name,false));

  }

const cancelConsingmnet=(Cnno, Account, Name)=>{
console.log('account=',Account);
console.log('Name',Name);
console.log('Cnno=>',Cnno);
dispatch(cancelConsignment(Cnno, Account, Name))
  }

  // const memoizedCallback = useCallback(
  // () => {
  //           doSomething(a, b);
  //         },
  // [a, b],
  //       );
  const memoraized=useCallback(
()=>{
},[]
  )
  useEffect(() => {
    console.log('cancel=',cancelPickupLoading);
    console.log('pickup=',pickupLoading);
    setpickup(Pickup);
    setpickupDetail(Pickup.cndetail);
    if (Pickup != '') {
      if (Pickup.cndetail[0].cnstatus == 1 && isConfirm == true) {
        swal('success', 'New Pickup Sheet is Successfully Created','success')
      }
      else if (Pickup.cndetail[0].cnstatus== 0 && isConfirm== false) {
        swal('Oops', Pickup.cndetail[0].cnmessage, 'error');
      }
    }

    if(CancelPickup!=''){
      console.log('cancel_consignment=',CancelPickup);
      if (CancelPickup.detail[0].status==1 && isCancel==true) {
        swal('success', 'Pickup Sheet is Successfully Voided','success')
      }
      else if (CancelPickup.detail[0].status==0 && isCancel==false){
        swal('Oopss',CancelPickup.detail[0].message,'error');
      }

    }
  }, [Pickup,CancelPickup]);


  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    console.log('close');
    setOpenMenu(false);
  };
  return (
    <>
      <Tooltip title="Create Pickup">
        <IconButton
          onClick={handleMenuOpen}
          ref={moreRef}
          {...props}
        >
          <MoreIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handleMenuClose}
        open={openMenu}
        PaperProps={{ className: classes.menu }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem
          id={cnno.cnno}
          onClick={
            (event)=>{
              openPickup1({cnno:event.currentTarget.id},acno,name,0);
        
              swal({
                title: "Are you sure?",
                text: "Are you sure you want to Pickup this Shipment?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }
              )
              .then((isDeleted)=>{
              console.log(isDeleted);
              setConfirm(isDeleted);
                })
            }
          }
        >
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText primary="Create Pickup" />
        </MenuItem>

        <MenuItem
          id={cnno.cnno}
          onClick={
            (event) => {

              console.log('current-target=',event.currentTarget);
              cancelConsingmnet({cnno:event.currentTarget.id},acno,name);
              swal({
                title: "Are you sure?",
                text: "Are you sure void consignment?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }
              )
              .then((isVoid)=>{
              console.log('void_data==>',isVoid);
              setCancel(isVoid);
                })
            }
          }
        >
          <ListItemIcon>
            <FileCopyIcon />
          </ListItemIcon>
          <ListItemText primary="Cancel Pickup" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(GenericMoreButton);

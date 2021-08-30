import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSelector,useDispatch} from 'src/store';
import { saveUserDetail,dashboardSelector} from 'src/slices/dashboard';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import {
  Avatar,
  Box,
  ButtonBase,
  Hidden,
  Menu,
  IconButton,
  SvgIcon,
  MenuItem,
  Typography,
  makeStyles
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1)
  },
  popover: {
    width: 200
  }
}));
const Account = () => {

const classes = useStyles();
const history = useHistory();
const ref = useRef(null);
const {user,logout}=useAuth();
const { enqueueSnackbar }=useSnackbar();
const [isOpen, setOpen]=useState(false);
const dispatch=useDispatch();
const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = async () => {
    try {
      handleClose();
      await logout();
      history.push('/login');
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Unable to logout', {
        variant: 'error'
      });
    }
  };
  useEffect(()=>{
    dispatch(saveUserDetail(user));
  },[]);
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        ref={ref}
      >
        {/* <Avatar
          alt="User"
          className={classes.avatar}
          // src={user.avatar}
          src='/static/images/avatars/avatar_6.png'
        /> */}

        <Hidden smDown>
        <IconButton
        color="default"         
        >
<SvgIcon 
fontSize="small"
>
<PersonOutlineOutlinedIcon />
            </SvgIcon>
        </IconButton>
          <Typography
          variant="h6"
          color="textSecondary"
          >
            {`HELLO ${user.name}!`}
          {/* {user} */}
          {/* {data.name} */}
          </Typography>
        </Hidden>
      </Box>


      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        keepMounted
        PaperProps={{className:classes.popover}}
        getContentAnchorEl={null}
        anchorEl={ref.current}
        open={isOpen}
      >
        <MenuItem
          component={RouterLink}
          to="/profile"
        >
          Profile
        </MenuItem>
        {/* <MenuItem
          component={RouterLink}
          to="/profile"
        >
          Account
        </MenuItem> */}
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default Account;

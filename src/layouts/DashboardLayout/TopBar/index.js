import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Typography,
  Toolbar,
  makeStyles,
  SvgIcon
} from '@material-ui/core';
import { Menu as MenuIcon } from 'react-feather';
import Logo from 'src/components/Logo';
import { THEMES } from 'src/constants';
import Account from './Account';
import Contacts from './Contacts';
import Notifications from './Notifications';
import Search from './Search';
import Settings from './Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...theme.name === THEMES.LIGHT ? {
      boxShadow: 'none',
      backgroundColor: theme.palette.primary.main
    } : {},
    ...theme.name === THEMES.ONE_DARK ? {
      backgroundColor: theme.palette.background.default
    } : {},
    boxShadow:'#333',
    color:'#c1bfd0',
    backgroundColor:'#ffffff',
  },
  toolbar: {
    minHeight: 64
  },
  topCaption:{
    color:'#0047ba',
    fontStyle:'normal',
    fontWeight:'bold',
    display:'inline-block'
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>

        <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Hidden>
        <Hidden mdDown>
<Box 
ml={5}
display="flex"
justifyContent="flex-end"
alignItems="flex-end"
flexGrow={1}>
<Typography 
color="textSecondary"
variant="h6"
>Do you need help? Please call us at: 
<Typography 
color="primary"
variant="h6"
className={classes.topCaption}
>021-111-BLUE-EX (021-111-258339)</Typography>
</Typography>
</Box>
</Hidden>
<Box
ml={2}
flexGrow={1}/>
{/* <Search /> */}
        {/* <Contacts /> */}
        <Notifications />
        <Settings />
        <Box ml={2}>
          <Account />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
TopBar.propTypes={
className:PropTypes.string,
onMobileNavOpen:PropTypes.func
};
TopBar.defaultProps = {
onMobileNavOpen: () => {}
};
export default TopBar;

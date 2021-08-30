/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  Button,
  ListSubheader,
  Typography,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import {
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  ShoppingCart as ShoppingCartIcon,
  Folder as FolderIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  UserPlus as UserPlusIcon,
  AlertCircle as AlertCircleIcon,
  Trello as TrelloIcon,
  User as UserIcon,
  Layout as LayoutIcon,
  Edit as EditIcon,
  DollarSign as DollarSignIcon,
  Mail as MailIcon,
  MessageCircle as MessageCircleIcon,
  PieChart as PieChartIcon,
  Share2 as ShareIcon,
  Users as UsersIcon,
  PlusCircle as PlusCircleIcon,
} from 'react-feather';
import Logo from 'src/components/Logo';
import useAuth from 'src/hooks/useAuth';
import NavItem from './NavItem';

const sections = [
  
  {
    // subheader: 'Reports',
    items: [
        {
          title:'Dashboard',
          icon:PieChartIcon,
          href:'/dashboard'
        },
    ]
  },
  {
    // subheader:'Management',
    items: [
      {
        title:'Shipmments',
        icon:BriefcaseIcon,
        href:'#',
        items: [
          {
            title:'Deliveries',
            href:'/deliveries'
          },
          {
            title:'Pickups',
            href:'/pickup'
          },
          {
            title:'Multi-Track',
            href:'/tracking'
          },

          {
            title:'Bulk Import',
            href:'/upload-booking'
          },
          {
            title:'Return Request',
            href:'/return-requests'
          }
        ]
      },
      {
        title: 'Settlement',
        icon:AlertCircleIcon,
        href: '#',
        items:[
          {
            title:'Statements',
            href:'/statements'
          },
        ]
      },

      // {
      //   title:'test_Componnet',
      //   icon:'test_Componnet',
      //   href:'#',
      //   items:[
      //     {
      //       title:'tester_123',
      //       href:'/test_123'
      //     },
      //     {
      //       title:'tester_124',
      //       href:'/test_124'
      //     },
      //   ]
      // },
      {
        title: 'Support',
        icon:UsersIcon,
        href: '#',
        items: [
          {
          title:'Developer Center',
          href:'/developer-center'
          },
          {
            title:'KnowledgeBase',
            href:'/faqs'
          },
          {
            title:'Video Guides',
            href:'/guides'
          },
          {
            title:'Release Notes',
            href:'/release-notes'
          },
        ]
      },
      {
        title:'Account',
        icon:TrelloIcon,
        href:'#',
        items:[
          {
            title:'Profile',
            href:'/profile'
          },
          {
            title:'Pickup Location',
            href:'/pickup-locations'
          },
          {
            title: 'Services',
            href: '#'
          },
        ]
      } ,
      
      // {
      //   title: 'Credentials',
      //   icon: UsersIcon,
      //   href:'#',
      //   items: [
      //     {
      //       title: 'Login',
      //       href: '/login-unprotected',
      //       icon: LockIcon
      //     },
      //     {
      //       title: 'Register',
      //       href: '/register-unprotected',
      //       icon: UserPlusIcon
      //     },

      //     {
      //       title: 'Logout',
      //       href:'/',
      //       icon: UserPlusIcon
      //     }
      //   ]
      // },
    ]
  },
  {
    // subheader: 'Reports',
    items: [
        {
          title:'Logout',
          icon: UserPlusIcon,
          href:'/login'
        },
    ]
  },
  
];

function renderNavItems({
  items,
  pathname,
  depth = 0
}) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({acc,item, pathname, depth }),
        []
      )}
    </List>
  );
}
function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth
}) {
  const key = item.title + depth;
  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });
    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },

  createShipment:{
    bordwr:'solid #eee',
    padding:theme.spacing(2),
    width:'100%',
    backgroundColor:'#0047ba',
    color:'#ffffff',
    textAlign:'center',
    borderRadius:'50px',
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {

    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar 
      options={{ suppressScrollX: true }}>
        {/* <Hidden lgUp>
          <Box
            p={2}
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden> */}


        <Box p={2}>
          {/* <Box
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/app/account">
              <Avatar
                alt="User"
                className={classes.avatar}
                src={user.avatar}
              />
            </RouterLink>
          </Box> */}



          <Box
            mt={2}
            textAlign="center"
          >
            {/* <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {user.name}
            </Link> */}
            {/* <Typography
              variant="body2"
              color="textSecondary"
            >
              Your tier:
              {' '}
              <Link
                component={RouterLink}
                to="/pricing"
              >
                {user.tier}
              </Link>
            </Typography> */}

            {/* <Button
          color="primary"
          variant="contained"
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
        Create Shipment
        </Button> */}

        {/* <Link
        component={RouterLink}
        to="/create-shipment"
        underline="none"
              >
                Create Shipment
              </Link> */}


              {/* <Link
            variant="body1"
            color="inherit"
            to="/create-shipment"
            component={RouterLink}
          > Create Shipment</Link> */}

{/* <RouterLink to="create-shipment"  underline="none"> */}
   <Button 
    component={RouterLink}
    to="/create-shipment"
   variant="contained" 
   startIcon={
    <SvgIcon fontSize="small">
      <PlusCircleIcon />
    </SvgIcon>
  }
   color="primary">
   Create Shipment
   </Button>
  {/* </RouterLink> */}

  {/* <Button 
   variant="link"
   color="primary"
   className={classes.signInButton}
   startIcon={
   <SvgIcon 
   fontSize="small">
   <PlusCircleIcon />
 </SvgIcon>
 }
   href="/create-shipment"
>
Create Shipment
</Button> */}

          </Box>
        </Box>
        {/* <Divider /> */}
        <Box p={2}>
          {sections.map((section) =>(
            <List
              key={section.subheader}
              subheader={(
                <ListSubheader 
                  disableGutters
                  disableSticky
                >
                  {/* {section.subheader} */}
                </ListSubheader>
              )}
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname
              })}
            </List>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          <Box
            p={2}
            borderRadius="borderRadius"
            bgcolor="background.dark"
          >
            <Typography
              variant="h6"
              color="textPrimary"
            >
              Need Help?
            </Typography>
            <Link
              variant="subtitle1"
              color="secondary"
              component={RouterLink}
              to="/login"
            >
             Logout
            </Link>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{paper:classes.desktopDrawer}}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;

import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TrackingDetail from './TrackingView';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Paper,
  TableContainer,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableSortLabel,
  TableRow,
  Tabs,
  TextField,
  Typography,
  Toolbar,
  CircularProgress,
  makeStyles
} from '@material-ui/core';


import {
  Edit as EditIcon,
  Disc as DiscIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon,
  Eye as EyeIcon
} from 'react-feather';

import swal from 'sweetalert';
import getInitials from 'src/utils/getInitials';
import GenericMoreButton2 from 'src/views/customer/CustomerListView/GenericMoreButton2';
import {
  Download as DownloadIcon,
  Upload as UploadIcon
} from 'react-feather';

import { MoreHoriz } from '@material-ui/icons';
const tabs = [
  {
    value: 'all',
    label: 'All'
  },
  {
    value: 'hasAcceptedMarketing',
    label: 'Accepts Marketing'
  },
  {
    value: 'isProspect',
    label: 'Prospect'
  },
  {
    value: 'isReturning',
    label: 'Returning'
  }
];

const sortOptions = [
  {
    value: 'updatedAt|desc',
    label: 'Last update (newest first)'
  },
  {
    value: 'updatedAt|asc',
    label: 'Last update (oldest first)'
  },
  {
    value: 'orders|desc',
    label: 'Total orders (high to low)'
  },
  {
    value: 'orders|asc',
    label: 'Total orders (low to high)'
  }
];

const applyFilters = (customers, query, filters) => {
  return customers.filter((customer) => {
    let matches = true;
    if (query) {
      const properties = ['CNNO', 'CNNO'];
      let containsQuery = false;
      properties.forEach((property) => {
        if (customer[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value && customer[key] !== value) {

        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (customers, page, limit) => {
  return customers.slice(page * limit, page * limit + limit);
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};


const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a,b,orderBy)
    : (a, b) => -descendingComparator(a,b,orderBy);
};


const applySort = (customers, sort) => {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = customers.map((el,index) =>[el,index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(3)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  table: {
    tableLayout: 'auto',
    minWidth: 340,
    // minWidth: 650,
    // marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '300',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary,
    },
    '& tbody td': {
      fontWeight: '100',
      paddingRight: 4,
      paddingLeft: 6,

    },
    '& tbody tr:hover': {
      backgroundColor:'#fffbf2',
      cursor:'pointer',
    },
  },


  booked: {
    width:'150px',
    backgroundColor:'#00adef',
    color:'#ffffff',
  },
  delivered: {
    width: '150px',
    backgroundColor:'#c6d53f',
    color:'#ffffff',
  },
  arrived: {
    width:'150px',
    backgroundColor:'#7e5e7b',
    color:'#ffffff',
  },
  intransit: {
    width:'150px',
    backgroundColor:'#ffb822',
    color:'#ffffff'
  },
  returned: {
    width:'150px',
    backgroundColor:'#ed1f60',
    color:'#ffffff'
  },
  arrival: {
    width:'150px',
    backgroundColor:'#efefef',
    color:'#ffffff'
  },
  readyforpickup:{
    width:'150px',
    backgroundColor:'#03a596',
    color:'#ffffff'
  }
}));


const Results = ({
  className,
  customers,
  deliveries,
  loading,
  ...rest
}) => {

  // CNNO
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [limit, setLimit] = useState(10);
  const pages = [50, 100, 150];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [modal, setmodal] = useState(false);
  const [btn, setbtn] = useState('');
  const handleSortRequest =cellId => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId);
  }
  const [filters, setFilters] = useState({
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null
  });

  const handleTabsChange = (event, value) =>{
    const updatedFilters = {
      ...filters,
      hasAcceptedMarketing: null,
      isProspect: null,
      isReturning: null
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }
    setFilters(updatedFilters);
    setSelectedCustomers([]);
    setCurrentTab(value);
  };

  const handleQueryChange = (e) => {

    console.log(e);
    e.persist();
    // setQuery(event.target.value);
    let target = e.target;
    console.log(target);

    setFilterFn({
      fn: items => {
        if (target.value == "") {
          console.log(target.value);
          return items;
        }
        else {
          console.log(target.value);
          return items.filter(
            x => x.CNNO.toLowerCase().includes(target.value) || x.STAT_MSG.toLowerCase().includes(target.value)
          );
        }
      }
    })
  };

  const onShowModal = () => {
    setmodal(!modal)
  }

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handleSelectAllCustomers = (event) => {
    setSelectedCustomers(event.target.checked
      ? deliveries.map((deliverie) => deliverie.CNNO)
      : []);
  };


  const handleSelectOneCustomer = (event, customerId) => {
    if (!selectedCustomers.includes(customerId)) {
      setSelectedCustomers((prevSelected) => [...prevSelected, customerId]);
    } else {
      setSelectedCustomers((prevSelected) => prevSelected.filter((id) => id !== customerId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const filteredCustomers = applyFilters(deliveries, query, filters);
  // const sortedCustomers = applySort(filteredCustomers, sort);

  // const paginatedCustomers = applyPagination(sortedCustomers, page, limit);
  const enableBulkOperations = selectedCustomers.length > 0;
  const selectedSomeCustomers = selectedCustomers.length > 0 && selectedCustomers.length < deliveries.length;
  const selectedAllCustomers = selectedCustomers.length === deliveries.length;
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
  const headCells = [
    { id: 'CNNO', numeric: true, disableSorting: false, disablePadding: false, label: 'CN#', hidden: true },
    { id: 'CUST_REF', numeric: true, disableSorting: false, disablePadding: false, label: 'Ship Date', hidden: true },
    { id: 'BOOKED_DATE', numeric: true, disableSorting: false, disablePadding: false, label: 'Arrival Date', hidden: true },
    { id: 'ORIG_CITY', numeric: false, disableSorting: false, disablePadding: false, label: 'Customer', hidden: false },
    { id: 'DEST_CITY', numeric: false, disableSorting: false, disablePadding: false, label: 'Address', hidden: false },
    { id: 'PROD_VALUE', numeric: true, disableSorting: false, disablePadding: false, label: 'Contact', hidden: false },
    { id: 'PCS', numeric: true, disableSorting: false, disablePadding: false, label: 'Customer Ref', hidden: false },
    { id: 'ARRIVAL_WGT', numeric: true, disableSorting: false, disablePadding: false, label: 'Cod', hidden: false },
    { id: 'STATUS', numeric: true, disableSorting: false, disablePadding: false, label: 'Weight', hidden: false },
    { id: 'CON_NAME', numeric: true, disableSorting: false, disablePadding: false, label: 'Pieces', hidden: false },
    { id: 'FPS_CODE', numeric: true, disableSorting: false, disablePadding: false, label: 'From to', hidden: false },
    { id: 'CON_CONT', numeric: true, disableSorting: false, disablePadding: false, label: 'Comment', hidden: false },
    { id: 'CON_ADD', numeric: true, disableSorting: false, disablePadding: false, label: 'Status', hidden: false },
    { id: 'NO_OF_ATTEMPTS', numeric: true, disableSorting: false, label: 'Actions', hidden: false },
  ];
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  // return(
  //   <TrackingDetail
  //   data={CNNO}
  //   model={modal}
  //   showModal={onShowModal} />
  //       );

  const renderTrackView = (cnno) => {
    setbtn(cnno);
   
  }

  const recordsAfterPagingAndSorting = () => {
    return stableSort(filterFn.fn(deliveries), getComparator(order, orderBy))
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      {/* <Button onClick={()=>{console.log(recordsAfterPagingAndSorting())}}>sort</Button> */}
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >

        {/* <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          onChange={handleQueryChange}
          placeholder="Search Deliveries"
          value={query}
          variant="outlined"
        /> */}
        <Toolbar>
          <TextField
            className={classes.searchInput}
            InputProps={{
              startAdornment: (<InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>)
            }}
            onChange={handleQueryChange}
            placeholder="Search Deliveries"
            variant="outlined"
          />
        </Toolbar>

        <Box flexGrow={1} />
        {/* <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{native:true}}
          value={sort}
          variant="outlined"
        >

          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >

              {option.label}
            </option>
          ))}
        </TextField> */}

        <Button>
          Import
          </Button>
        <Button>
          Export
          </Button>
      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllCustomers}
              indeterminate={selectedSomeCustomers}
              onChange={handleSelectAllCustomers}
            />

            <Button
              variant="outlined"
              className={classes.bulkAction}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              className={classes.bulkAction}
            >
              Edit
            </Button>
          </div>
        </div>
      )}
      <PerfectScrollbar>
        {loading == true ?
          <Box
            mt={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={320}>
              
            <CircularProgress />
          </Box> :

          <Box
            minWidth={600}>
            <Table
              className={classes.table}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={selectedAllCustomers}
                      indeterminate={selectedSomeCustomers}
                      onChange={handleSelectAllCustomers}
                    />
                  </TableCell>
                  {
                    headCells.map(headCell => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right':'left'}
                        // align={'left'}
                        padding={headCell.disablePadding ?'none' :'default'}
                        // padding={'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                      >

                        {
                          headCell.disableSorting ? headCell.label :    
                            <TableSortLabel
                              active={orderBy === headCell.id}
                              direction={orderBy === headCell.id ? order : 'asc'}
                              onClick={() => { handleSortRequest(headCell.id) }}>
                              {headCell.label}
                            </TableSortLabel>
                        }
                      </TableCell>))
                  }        </TableRow>
              </TableHead>
              <TableBody>
                {recordsAfterPagingAndSorting().map((customer, index) => {
                  const isCustomerSelected = selectedCustomers.includes(customer.CNNO);
                  return (
                    <TableRow
                      hover
                      key={customer.CNNO}
                      selected={isCustomerSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isCustomerSelected}
                          onChange={(event) => handleSelectOneCustomer(event, customer.CNNO)}
                          value={isCustomerSelected}
                        />
                      </TableCell>

                      <TableCell>
                        {customer.CNNO}
                      </TableCell>
                      <TableCell>{customer.CN_DATE}</TableCell>
                      <TableCell>{customer.ARRIVAL_DATE}</TableCell>
                      <TableCell>{customer.CON_NAME}</TableCell>
                      <TableCell>{customer.CON_ADD}</TableCell>
                      <TableCell>Contact...</TableCell>
                      <TableCell>{customer.CUST_REF}</TableCell>
                      <TableCell>{customer.PROD_VALUE}</TableCell>
                      <TableCell>{customer.WGT}</TableCell>
                      <TableCell>{customer.PCS}</TableCell>
                      <TableCell>{`${customer.ORIG_CITY} -> ${customer.DEST_CITY}`}</TableCell>
                      <TableCell>{customer.COMENT}</TableCell>
                      <TableCell>

                        <Button
                          className={
                            customer.STAT_MSG == 'Delivered'?
                              classes.delivered : customer.STAT_MSG == 'Arrived' ?
                                classes.arrived : customer.STAT_MSG == 'Booked' ?
                                  classes.booked : customer.STAT_MSG == 'In-Transit' ?
                                    classes.intransit : customer.STAT_MSG == 'Return to shipper' ?
                                      classes.returned : customer.STAT_MSG == 'Arrival' ?
                                        classes.arrival : customer.STAT_MSG == 'Ready For Pickup' ? classes.readyforpickup : ''
                          }
                        >
                          {customer.STAT_MSG}
                        </Button>
                      </TableCell>
                      <TableCell>{customer.DDATE}</TableCell>
                      <TableCell>
                        <Box
                          dispay="flex"
                        >
                          <IconButton onClick={() => {renderTrackView(customer.CNNO) }}>
                            <SvgIcon fontSize="small">
                              <DiscIcon />
                            </SvgIcon>
                          </IconButton>
                          
                          {btn === customer.CNNO ?<TrackingDetail
                            data={customer.CNNO}
                            model={true}
                            showModal={onShowModal} /> : ''}
                          {customer.STAT_MSG == 'Booked' ?
                            <GenericMoreButton2
                              cnno={{cnno:customer.CNNO }}
                              index={index}
                            />
                            : ''}

                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

          </Box>
        }
      </PerfectScrollbar>
      <TablePagination
        // component="div"
        // count={filteredCustomers.length}
        // onChangePage={handlePageChange}
        // onChangeRowsPerPage={handleLimitChange}
        // page={page}
        // rowsPerPage={limit}
        // rowsPerPageOptions={[5, 10, 25]}
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={filterFn.fn(deliveries).length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

Results.defaultProps = {
  customers: []
};

export default Results;

import React,{useState,useCallback,useEffect}from 'react';
import { Box,
    Container,
    Divider,
    Tab,
    Tabs,makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import ReturnRequest from './ReturnRequest';
import ReAttemptRequest from './ReAttemptrequest';
import ApprovedRequest from './ApprovedRequest';
import ReturnSummary from './ReturnSummary';
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    }
  }));

const ReturnRequestView=(props)=> {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [customer, setCustomer] = useState(null);
    const [currentTab, setCurrentTab] = useState('0');
    const tabs=[
      { value: '0', label:'RETURN REQUEST'},
      { value: '1', label:'APPROVED REQUEST'},
      { value: '2', label:'REATTEMPT REQUEST'},
      { value: '3', label:'RETURN SUMMARY'}
    ];

    const handleTabsChange = (event, value)=>{
      console.log('event',event);
      console.log('value',value);
      setCurrentTab(value);
    };
    const getCustomer = useCallback(async () => {
      try {
const response = await axios.get('/api/customers/1');

        if (isMountedRef.current) {
          // setCustomer(response.data.customer);
        }
      } catch (err) {
   
      }
    }, [isMountedRef]);
  
    useEffect(() => {
     
      getCustomer();
    }, [getCustomer]);
  
    // if (!customer) {
    //   return null;
    // }
    return (
        <Page
        className={classes.root}
        title="Return Request"
      >
        <Container 
        maxWidth={false}>
          <Header />
          <Box mt={3}>
            <Tabs
              onChange={handleTabsChange}
              scrollButtons="auto"
              value={currentTab}
              variant="scrollable"
              textColor="secondary"
            >
              {tabs.map((tab) => (
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
            {currentTab ==='0' && <ReturnRequest/>}
            {currentTab ==='1' && <ApprovedRequest/>}
            {currentTab ==='2' && <ReAttemptRequest/>}
            {currentTab ==='3' && <ReturnSummary/>}
          </Box>


        </Container>
      </Page>
    )
}
export default ReturnRequestView;

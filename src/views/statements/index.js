import React,{useState,useEffect} from 'react';
import Header from './header';
import Page from 'src/components/Page';
import Results from './result';
import {Container,Box,Card,CardHeader,makeStyles} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import {useSelector,useDispatch} from 'src/store';
import {dashboardSelector,fetch_statementList} from 'src/slices/dashboard';
import DateRangeComponent from 'src/components/DateRangeButton';


const styles= makeStyles((theme)=>({
    root:{
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
      }
}));

function Statements(){  
// const [statements,setStatements]=useState([]);
// console.log(statements);
const dispatch=useDispatch();
const {
  statements,
  statementsError,
  statementsLoading,
  ShipmentDate
  }=useSelector(dashboardSelector);
  const startDate=ShipmentDate[0].startDate;
  const endDate=ShipmentDate[0].endDate;
  const {user}=useAuth();
const getStatements=(arg1,arg2,arg3)=>{
  dispatch(
    fetch_statementList(arg1,arg2,arg3)
  )
}



useEffect(()=>{  
dispatch(fetch_statementList(startDate,endDate,user.acno));
   },[dispatch]);
const classes=styles();

return(
<Page
className={classes.root}
title="Statements"
>
<Container 
maxWidth={false}>
<Header />    
<Card>
<CardHeader
action={<DateRangeComponent
startDate={startDate}
endDate={endDate}
fetchdata={getStatements}
/>
}
title="Statement List"
/>
<Box mt={3}>
<Results  
loading={statementsLoading} 
statement={statements}
/>
</Box>
</Card>
</Container>
</Page>
    )
}
export default Statements;
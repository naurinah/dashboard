import React from 'react';
import {Grid,Box,Container,makeStyles} from '@material-ui/core';
import Page from 'src/components/Page';
import CreatePickup from './createPickup';
import Header from './Header';
const styles=makeStyles((theme)=>({
root:{
  backgroundColor:theme.palette.background.dark,
  minHeight:'100%',
  paddingTop:theme.spacing(3),
  paddingBottom:theme.spacing(3)
},
}));
const PickupView=()=>{
const classes=styles();
return (
        <Page
      className={classes.root}
      title="Customer List"
    >
       <Container maxWidth={false}>
       <Header/>
       <Box mt={3}
      >
       <CreatePickup/>
       </Box>
       </Container>
       </Page>
    )
}
export default PickupView;

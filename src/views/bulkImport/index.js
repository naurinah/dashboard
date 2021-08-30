import React from 'react';
import Header from './header';
import Page from 'src/components/Page';
import BulkImport from './BulkImport';
import {Container,Box,Card,CardHeader,CardContent,makeStyles} from '@material-ui/core';
const useStyles=makeStyles((theme)=>({
    root:{
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3) 
    }
}))
const BookingView=(props)=>{
const classes=useStyles();
console.log('classes',classes);
return (
<Page
className={classes.root}
title="Upload Shipments"
>
<Container 
maxWidth={false}>
<Header />    
<Box mt={3}>
<Card>
  <CardHeader
  title="UPLOAD SHIPMENTS"
  />
 <CardContent>
<BulkImport/>
</CardContent>
</Card>
</Box>
</Container>
</Page>
    )
}
export default BookingView;

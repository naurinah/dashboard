import React from 'react';
import {Grid,Container,Box} from '@material-ui/core'
import Page from 'src/components/Page';
import Header from './header';
import CreateShipment from './createShipment';

const createShipmentView=()=>{
    console.log('createshipment');
console.log('createShipment View');
    
    return (
<Container 
 maxWidth={false}
>
    <Page
       title="Create Shipment"
    >
<Header/>
        <Box mt={2}>
        <CreateShipment/>
        </Box>
    </Page>
</Container>
    )
}

export default createShipmentView;



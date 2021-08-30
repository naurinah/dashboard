import React from 'react'
import Page from 'src/components/Page';
import Header from './Header';
import {Container,Box,makeStyles} from '@material-ui/core';
const Styles=makeStyles((theme)=>({
    root:{
        
    }
    }))
const videoGuide=()=>{
    const classes=Styles();
    return (
        <Page
        className={classes.root}
        title="Developer Center"
        >
            <Header/>
            <Container 
            maxWidth="lg">
            <Box 
            mt={6}>
        {/* <DeveloperCenter/> */}
        </Box>
        </Container>
        </Page>
    )
}

export default videoGuide;

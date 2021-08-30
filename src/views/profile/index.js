import React from 'react'
import {Typography} from '@material-ui/core';
import {Card,CardHeader,CardContent,Container,Box,makeStyles} from '@material-ui/core';
import Header from './header';
import ProfileViewComponent from './profileView';
import Page from 'src/components/Page';
const styles= makeStyles((theme)=>({
    root:{
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
      }
}));
 function profile() {
    const classes=styles();
    return (
      <Page
    className={classes.root}
    title="Profile"
    >
    <Container 
    maxWidth="lg"
      >
    <Header />
    
    <Box mt={3}>
    <ProfileViewComponent/>
    </Box>
    </Container>
    </Page>
    )
}
export default profile;

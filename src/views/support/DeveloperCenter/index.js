import React from 'react';
import {makeStyles,Box,Container,Typography} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import DeveloperCenter from './DeveloperCenter';
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    }
  }));
const DeveloperCenterView=()=>{
const classes=useStyles();
    return (
        <Page
        className={classes.root}
        title="Developer Center"
        >
            <Header/>
            <Container 
            maxWidth={false}>    
            <Box 
            display="flex"
            justifyContent="space-between"
            mt={3}>
        <DeveloperCenter/>
        </Box>
        </Container>
        </Page>
    )
  }
export default DeveloperCenterView;
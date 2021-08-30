import React from 'react';
import MultiTrack from './MultiTrack';
import Page from 'src/components/Page';
import {Container,Card,CardContent,Box,makeStyles} from '@material-ui/core'
import Header from './Header';
const useStyles = makeStyles((theme) => ({
    root:{
      backgroundColor:theme.palette.background.dark,
      minHeight:'100%',
      paddingTop:theme.spacing(3),
      paddingBottom:theme.spacing(3)}
  }));
const MultiTrackView=()=>{
    const classes =useStyles();
    return (
        <Page
        className={classes.root}
        title="MultiTrack"
        >
            <Container maxWidth={false}>
            <Header />
      <Box mt={3}>
      <MultiTrack/>
        </Box>
            </Container>
        </Page>
    )
}
export default MultiTrackView;

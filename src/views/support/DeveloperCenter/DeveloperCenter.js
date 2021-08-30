import React ,{useState}from 'react';
// import {ApiListView} from './Components';
import Page from 'src/components/Page';
import Header from './Header';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import ApiView from './ApiList';
import {Typography,Container,Box,Paper,Card,CardContent,
CardHeader, Grid, Divider, Button,makeStyles } from '@material-ui/core';
const useStyles=makeStyles((theme)=>({
    root:{
        backgroundColor:theme.palette.background.dark,
        minHeight:'100%',
        paddingTop:theme.spacing(3),
        paddingBottom:theme.spacing(3)
    }
}))
const DeveloperCenter=(props)=>{
console.log('props',props);
const classes=useStyles();
return (
   <Card>
       <CardHeader
        title="Api Detail"
      />      
       <Grid 
       container>
        <Grid item 
        xs={12}
        lg={4}
        >      
<ApiView/>
</Grid>
<Grid item
 xs={12}
 lg={4}
>
<ApiView/>
</Grid>
<Grid item
 xs={12}
 lg={4}
>
<ApiView/>
</Grid>

<Grid item
 xs={12}
 lg={4}
>
<ApiView/>
</Grid>

<Grid item
 xs={12}
 lg={4}
>
<ApiView/>
</Grid>

<Grid item
 xs={12}
 lg={4}
>
<ApiView/>
</Grid>

<Grid item
 xs={12}
 lg={4}
>
<ApiView/>
</Grid>

<Grid item
 xs={12}
 lg={4}
>
<ApiView/>
</Grid>

<Grid item
 xs={12}
 lg={4}
>
<ApiView/>
</Grid>
    </Grid>
   </Card>
        )
}

export default DeveloperCenter;
import React, { Component } from 'react'
import { Typography, Box, Link ,makeStyles} from '@material-ui/core';
import { Card,Link as RouterLink, withRouter} from 'react-router-dom';
const useStyles=makeStyles((theme)=>({
    root: {
        border: '1px inset rgba(69, 65, 78, 0.08)',
        boxShadow: '0px 0px 3px 2px rgba(69, 65, 78, 0.08)',
        padding: theme.spacing(5,5,5,5),
        // boxShadow:'5px 10px #eeeeee',
        // flexBasis:'10%'
        // flexGrow:1
    },
    BoxLayout: {
        // display:'flex',
        // flexBasis:'50'
    },
    linkLayout: {
        padding: theme.spacing(2,5,2,5),
        margin: theme.spacing(2),
        // border: 'solid #ddd',
        textAlign: 'center',
        // flex:1

    }
}))
const ApiList=(props)=>{
const classes=useStyles();
console.log('classes=>',classes);
const {view,urllink,imgName}=props;
return (
            <div className={classes.root}>
                    <Link
                       className={classes.linkLayout}
                        component={RouterLink}
                        variant="body2"
                        // to="/developer-center/open-api-json"
                        to={`/developer-center/${urllink}`}
                        underline="none"
                    >
                        <img 
                        // src='./images/api/openapixml.png'
                        src={`./React/images/api/${imgName}`}
                         alt="image-not-found" />
                    </Link>
            </div>
        )
    
}

export default ApiList;

import React from 'react'
import {makeStyles,Typography} from '@material-ui/core';
const styles=makeStyles((theme)=>({
root:{

}
}))
const Header=()=>{
const classes=styles();
console.log('classes',classes);
    return (
        <div>
            <Typography 
            variant="h3"
            gutterBottom
            >
        Knowledge Base
            </Typography>
        </div>
    )
}
export default Header;

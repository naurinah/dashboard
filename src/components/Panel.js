import React from 'react'
import {Typography,Box} from '@material-ui/core';
const  Panel=(props)=>{
        console.log('from tab-panel.......',props);
        const {children,value,index,...other }= props;
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
    )
}

export default Panel;

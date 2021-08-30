import React from 'react';
const  propsTypes=(index)=>{
    console.log('index',index);
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls':`scrollable-auto-tabpanel-${index}`,
      };
}


export default propsTypes;
import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
const checkBox = () => {

console.log('checkBox');
    return (
        <>
            <FormControlLabel
                control={<Checkbox name="checkedC" />}
                label="Uncontrolled" />
        </>
    )
}
export default checkBox;

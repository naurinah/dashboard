import React from 'react';
import {Switch,makeStyles,FormControlLabel} from '@material-ui/core';
const iosStyles=makeStyles((theme)=>({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
      },
      switchBase: {
        padding: 1,
        '&$checked': {
          transform: 'translateX(16px)',
          color: theme.palette.common.white,
          '& + $track': {
            backgroundColor:'#0047ba',
            opacity: 1,
            border: 'none',
          },
        },
        '&$focusVisible $thumb': {
          color:'#0047ba',
          border:'6px solid #fff',
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
      },
      checked: {},
      focusVisible: {},
}));
const  IosSwitch=(props)=>{
console.log(props)

console.log('switch case');
const classes=iosStyles();
console.log('ios-switch=>',IosSwitch);


return (
  <FormControlLabel
  value="start"
  control={
    <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase:classes.switchBase,
          thumb:classes.thumb,
          track:classes.track,
          checked:classes.checked,
        }}
        {...props}
      />
  }
  label="Document"
  labelPlacement="start"
/>

    )
}
export default IosSwitch;

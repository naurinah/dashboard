import React,{useState} from 'react';
import {DateRangePicker} from 'react-date-range';
import {addDays}  from  'date-fns';
import {Typography} from '@material-ui/core'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
export default function DateComponent() {
    const [DateState,setDate]=useState([{
        startDate:addDays(new Date(),5),
        endDate:new Date(),
        key:'selection'
    }]);

    return (
        <>
       <DateRangePicker
                    onChange={item => {
                    console.log('current-item',item);
                    setDate([item.selection])
                      }}
                    showSelectionPreview={true}
                    showDateDisplay={true}
                    moveRangeOnFirstSelection={false}
                    disabled={false}
                    months={2}
                    ranges={DateState}
                    direction="horizontal"
                            />
        </>
    )
}

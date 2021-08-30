import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {Divider,Card,Box,CardHeader,useTheme} from '@material-ui/core';
const Chart2 = ({data:dataProp,summaryData,title,props,...rest})=>{
  
  console.log('title==>',title);
  const theme = useTheme();
  const data = {
    datasets: dataProp.datasets.map(((dataset) =>({
      ...dataset,
      borderWidth:2,
      borderColor: theme.palette.background.default,
      hoverBorderColor: theme.palette.background.default
    }))),
    labels: dataProp.labels
  };
  

  useEffect(()=>{

  },[])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 65,
    legend: {
      display: false
    },
    layout: {
      padding: 0
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      caretSize: 10,
      yPadding: 20,
      xPadding: 20,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.background.dark,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
      callbacks:{
        label(tooltipItem, _data) {
          const label = _data.labels[tooltipItem.index];
          const value = _data.datasets[0].data[tooltipItem.index];
          return `${label}: ${value}`;
        }
      }
    }
  };

//   const options={
//     responsive: true,
//     maintainAspectRatio: false,
//       animation: false,
//       cutoutPercentage: 65,
//     // title: {
//     //     display:'Testing Graph',
//     //     text: 'Largest Cities In .... Container' + 'avvv',
//     //     fontSize: 25
//     // },
//     legend: {
//       display: false,
//         displayTitle:true,
//         displayLegend:true,
//         legendPosition:'right',
//         location:'City'
//     }
// };

  return (
      <Box
        p={3}
        position="relative"
        minHeight={320}
      >

        <Doughnut
          // height={360}
      data={data}
      options={options}
      {...rest}
    />
         
      </Box>
  );
};

Chart2.propTypes={
  className: PropTypes.string,
  data: PropTypes.object.isRequired
};

export default React.memo(Chart2);

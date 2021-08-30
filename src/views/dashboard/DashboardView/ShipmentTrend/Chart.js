import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  fade,
  makeStyles,
  useTheme
} from '@material-ui/core';
import { YouTube } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  }
}));

const Chart = ({
  className,
  data: dataProp,
  labels,
  a,
  y,
  shipdata,
  ...rest
}) => {

  console.log('y=value]', y);
  console.log('a=value]', a);
  console.log('a==>', a);
  console.log('y==>', y);
  console.log('shipdata=>',shipdata);


  const classes = useStyles();
  const theme = useTheme();
  const data = (canvas) => {
    // const ctx = canvas.getContext('2d');
    // const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    // gradient.addColorStop(0, fade(theme.palette.secondary.main, 0.2));
    // gradient.addColorStop(0.9, 'rgba(255,255,255,0)');
    // gradient.addColorStop(1, 'rgba(255,255,255,0)');
    return {
      labels:y,
      datasets: [
        {
          label: 'shipment Trend',
          data: a,
          // backgroundColor: gradient,
          borderColor: theme.palette.secondary.main,
          pointBorderColor:theme.palette.background.default,
          pointBorderWidth:3,
          pointRadius:6,
          pointBackgroundColor:theme.palette.secondary.main
        }
      ],
     
    };
  };

  const chartData = {
    // labels:['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
    labels: y,
    datasets: [
      {
        // label: 'Population',
        // data: [
        //     617594,
        //     181045,
        //     153060,
        //     106519,
        //     105162,
        //     95072
        // ],
        // backgroundColor: [
        //     'rgba(255, 99, 132, 1)',
        //     'rgba(54, 162, 235, 1)',
        //     'rgba(255, 206, 86, 1)',
        //     'rgba(75, 192, 192, 1)',
        //     'rgba(153, 102, 255, 1)',
        //     'rgba(255, 159, 64, 1)',
        //     'rgba(255, 99, 132, 1)'
        // ]
        // label: 'Shippment Trend',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle:'miter',
        pointBorderColor:'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: a
      }
    ]
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    legend: {
      display: false
    },
    layout: {
      padding: 0
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.secondary
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          },
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
            maxTicksLimit: 7,
            // callback: (value) => (value > 0 ? `${value}k` : value)
          }
        }
      ]
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
      backgroundColor: theme.palette.background.default,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
      callbacks: {
        title: () => { },
        // label: (tooltipItem) => {
        //   console.log('tooltip==', tooltipItem);
        //   console.log('tooltip==]y==]', tooltipItem.yLabel);
        //   console.log('tooltip==x===]', tooltipItem.xLabel);
        //   let label = `Income: ${tooltipItem.yLabel}`;
        //   if (tooltipItem.yLabel > 0) {
        //     label += 'K';
        //   }
        //   return label;
        // }
      }
    }
  };
  return (
    <div
      className={clsx(classes.root,className)}
      {...rest}
    >
      <Line
        data={data}
        // options={options}
     
      />
    </div>
  );
};

Chart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired
};
export default Chart;

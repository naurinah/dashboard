import React from "react";
import Chart from "react-apexcharts";
const Donutchart = props => {
const { donutData, id, labels, chartOptions } = props;
console.log(id);
console.log('donut=',donutData);
console.log('labels=',labels);
console.log('chart-options',chartOptions);
const chartdata = {
  // options: {
    
  //   labels: ['A', 'B', 'C', 'D', 'E']
  // },
  plotOptions: {
    pie: {
      startAngle: 0,
      expandOnClick: true,
      offsetX: 0,
      offsetY: 0,
      customScale: 1,
      dataLabels: {
          offset: 0,
          minAngleToShowLabel: 10
      }, 
      donut: {
        size: '105%',
        background: 'transparent',
        labels: {
          show: false,
          name: {
            show: false,
            fontSize: '22px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            color: undefined,
            offsetY: -10,
            formatter: function (val) {
              return val
            }
          },
          value: {
            show: false,
            fontSize: '16px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            color: undefined,
            offsetY: 16,
            formatter: function (val) {
              return val
            }
          },
          total: {
            show: true,
            showAlways: false,
            label: 'Total',
            fontSize: '22px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            color: '#373d3f',
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b
              }, 0)
            }
          }
        }
      },      
    }
  },

  series: [44, 55, 41, 17, 15]

};


var options = {
  series: [44, 55, 41, 17, 15],
  chart: {
  type: 'donut',
},
responsive: [{
  breakpoint: 480,
  options: {
    chart: {
      width: 200
    },
    legend: {
      position: 'bottom'
    }
  }
}]
};
  return (
    <Chart
    
      // height={400}
    //   series={donutData}
    // options={options}
    //   series={[50,70,41,80,15,90]}
    //   type="donut"
    options={chartdata.plotOptions} series={chartdata.series} type="donut" width="380"
    />
  );
};
export default Donutchart;
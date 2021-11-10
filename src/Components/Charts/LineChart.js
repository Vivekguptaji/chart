
import ReactApexChart from "react-apexcharts";
let sprintName = [];
function LineChart(props) {
    const chartName = props.chartName;  
    let series = [{
        name: 'IBM Delivered StoryPoint',
        type: 'column',
        data: [83, 11, 22, 27, 13, 22, 37, 41]
    }, {
        name: 'IBM Resolved Defects',
        type: 'column',
        data: [44, 55, 41, 67, 22, 43, 21, 31]
    }, {
        name: 'AVG SP',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52]
        },
        {
            name: 'Linear (IBM Delivered StoryPoint)',
            type: 'line',
            data: [23, 11, 22, 27, 13, 22, 37, 21]
        }];
    let options = {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
        },
        stroke: {
            width: [0, 2, 5],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '50%'
            }
        },
            
        fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [0,1,2,3]
          },
        // labels: ['21.16 (Aug)', '21.17 (Aug)', '21.18 (Aug)', '21.19 (Aug)',
        // '21.20 (Aug)', '21.21 (Aug)', '21.22 (Aug)', '21.23 (Aug)', 
        // ],
         labels:props.data.series,
        markers: {
            size: 0
        },
        xaxis: {
            type: 'Points'
        },
        yaxis: {
            title: {
                text: 'Points',
            },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " points";
                    }
                    return y;
            
                }
            }
        }
    } 
    return (<div id="chart" className="chartTitle"> { props.chartName} Velocity V/S Defects
        <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>)
}
export default LineChart;
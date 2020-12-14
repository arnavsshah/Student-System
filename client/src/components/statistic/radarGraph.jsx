import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import Chart from "react-apexcharts";
import axios from "axios";
import { Container } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    stats:{
        marginTop: theme.spacing(3)
    },

}));

export default function DesplayStatistic(props) {
    const classes = useStyles();
    const [data, setData] = React.useState({
        
        series: [{
            name: 'Students',
            data: props.data2,
          }],
          options: {
            chart: {
              height: 350,
              type: 'radar',
            },
            dataLabels: {
              enabled: true
            },
            plotOptions: {
              radar: {
                size: 270,
                polygons: {
                  strokeColors: '#e9e9e9',
                  fill: {
                    colors: ['#f8f8f8', '#fff']
                  }
                }
              }
            },
            title: {
              text: ''
            },
            colors: ['#FF4560'],
            markers: {
              size: 4,
              colors: ['#fff'],
              strokeColor: '#FF4560',
              strokeWidth: 2,
            },
            tooltip: {
              y: {
                formatter: function(val) {
                  return val
                }
              }
            },
            xaxis: {
              categories: props.data1
            },
            yaxis: {
              tickAmount: 7,
              labels: {
                formatter: function(val, i) {
                  if (i % 2 === 0) {
                    return val
                  } else {
                    return ''
                  }
                }
              }
            }
          },
    })

    return(
        <Chart
        options={data.options}
        series={data.series}
        type="radar" 
        height={600}
        />

    )
}
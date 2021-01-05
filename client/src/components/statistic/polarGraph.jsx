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
var c = ['#00FFFF', '#191970', '#DC143C', '#B8860B', '#9400D3', '#228B22', '#7CFC00']
export default function DesplayStatistic(props) {
    const max = 50
    var data2 = props.data2.map( e =>{
        return (e * 100)/max;
    })
    const classes = useStyles();
    const [data, setData] = React.useState({
        series: data2,
            options: {
              chart: {
                height: 390,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  offsetY: 0,
                  startAngle: 0,
                  endAngle: 270,
                  hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                  },
                  dataLabels: {
                    name: {
                      show: true,
                    },
                    value: {
                      show: true,
                    }
                  }
                }
              },
              colors: c,
              labels: props.data1,
              legend: {
                show: true,
                floating: true,
                fontSize: '16px',
                position: 'left',
                offsetX: 370,
                offsetY: 15,
                labels: {
                  useSeriesColors: true,
                },
                markers: {
                  size: 0
                },
                formatter: function(seriesName, opts) {
                  return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                },
                itemMargin: {
                  vertical: 3
                }
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  legend: {
                      show: false
                  }
                }
              }]
            },
          
          
    })

    return(
        <Chart
        options={data.options}
        series={data.series}
        type="radialBar"
        height={500}
        />

    )
}
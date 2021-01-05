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
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: props.data1,
            }
        },
        series: [
            {
                name: "Students",
                data: props.data2,
                // data: val
            }
        ]
    })

    return(
        <Chart
            options={data.options}
            series={data.series}
            type="bar"
            width="800"/>

    )
}
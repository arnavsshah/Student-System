import React from "react";
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
    const [val, setVal] = React.useEffect([]) 
    const [data, setData] = React.useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ['CS', 'IT', 'EXTC', 'ELECTRICAL', 'MECH']
            }
        },
        series: [
            {
                name: "Students",
                data: [2, 3, 5, 5, 5],
                // data: val
            }
        ]
    })

    axios({
        method: 'get',
        url: 'http://localhost:5000/statistic',
        withCredentials: true,
        })
        .then((res)=>{
          setData(res.data);
          
          // console.log(res.data);
        })
    return(
        <Container maxWidth="md" className = {classes.stats}>
            <Chart
                    options={data.options}
                    series={data.series}
                    type="bar"
                    width="900"
                />
        </Container>
        
    )
}
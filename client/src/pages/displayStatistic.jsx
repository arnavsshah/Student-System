import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import Chart from "react-apexcharts";
import axios from "axios";
import { Container,Typography, Divider } from "@material-ui/core";
import BarGraph from '../components/statistic/barGraph';
const useStyles = makeStyles((theme) => ({
    stats:{
        marginTop: theme.spacing(3)
    },

}));

export default function DesplayStatistic(props) {
    const classes = useStyles();
    const [val, setVal] = React.useState({}) 
    useEffect(()=>
    axios({
        method: 'get',
        url: 'http://localhost:5000/statistics',
        withCredentials: true,
        })
        .then((res)=>{
            console.log(res.data);
            setVal(res.data);
          
          console.log(val);
        }),[]
    )
    return(
        <Container maxWidth="md" className = {classes.stats}>
            <Typography></Typography>
            {val.department && 
            <div>
                <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom fontFamily='Segoe UI'>
                    Distribution of Students in all Departments 
                </Typography>
                <BarGraph data1 = {val.department.department} data2 = {val.department.count}/>
                <Divider/>
                <br/>
            </div>
            }
            {val.score && 
            <div>
                <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom fontFamily='Segoe UI'>
                    Average Score of all Students across all Departments 
                </Typography>
                <BarGraph data1 = {val.score.department} data2 = {val.score.score}/>
                <Divider/>
                <br/>
            </div>
            }
            {val.sem && 
            <div>
                <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom fontFamily='Segoe UI'>
                    Distribution of Student across all Departments of your Semester 
                </Typography>
                <BarGraph data1 = {val.sem.department} data2 = {val.sem.count}/>
                <Divider/>
                <br/>
            </div>
            }
        </Container>
        
    )
}
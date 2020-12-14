import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import axios from "axios";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Container, Typography, Divider,Box } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import SwipeableViews from "react-swipeable-views";
import BarGraph from '../components/statistic/barGraph';
import RadarGraph from '../components/statistic/radarGraph';
import PolarGraph from '../components/statistic/polarGraph';
const useStyles = makeStyles((theme) => ({
    stats: {
        marginTop: theme.spacing(3)
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        maxWidth: "100%",
        flexGrow: 1
      },

}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`
    };
}

export default function DesplayStatistic(props) {
    const classes = useStyles();
    const [val, setVal] = React.useState({})
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
      const handleChangeIndex = (index) => {
        setValue(index);
      };
    useEffect(() =>
        axios({
            method: 'get',
            url: 'http://localhost:5000/statistics',
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data);
                setVal(res.data);

                console.log(val);
            }), []
    )
    return (
            <div className={classes.root} >
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Your Portfolio" {...a11yProps(0)} />
                        <Tab label="Distribution of Your Skills across VJTI" {...a11yProps(1)} />
                        <Tab label="Distribution of Students in all Departments" {...a11yProps(2)} />
                        <Tab label="Average Score of all Students across all Departments" {...a11yProps(3)} />
                        <Tab label=" Distribution of Students across all Departments of your Semester" {...a11yProps(4)} />
                        {/* <Tab label="Based on Your Favourite Authors" {...a11yProps(3)} /> */}
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
               
                <TabPanel
                    value={value}
                    index={0}
                    dir={theme.direction}
                >
                    {/* <Container maxWidth="md" className={classes.stats}> */}
                        {val.attribute &&
                            <div>
                                <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom fontFamily='Segoe UI'>
                                    Your Portfolio
                            </Typography>
                                <PolarGraph data1={val.attribute.attributes} data2={val.attribute.count} />
                                <Divider />
                            </div>
                        }
                    {/* </Container> */}
                </TabPanel>


                <TabPanel value={value} index={1} dir={theme.direction}>

                    <Container maxWidth="md" className={classes.stats}>
                        {val.skill &&
                            <div>
                                <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom fontFamily='Segoe UI'>
                                    Distribution of Your Skills across VJTI
                                </Typography>
                                <RadarGraph data1={val.skill.skill} data2={val.skill.count} />
                                <Divider />
                                <br />
                            </div>
                        }
                    </Container>
                </TabPanel>

                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Container maxWidth="md" className={classes.stats}>
                        {val.department &&
                            <div>
                                <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom fontFamily='Segoe UI'>
                                    Distribution of Students in all Departments
                                </Typography>
                                <BarGraph data1={val.department.department} data2={val.department.count} />
                                <Divider />
                                <br />
                            </div>
                        }
                    </Container>
                </TabPanel>

                <TabPanel value={value} index={3} dir={theme.direction}>
                    <Container maxWidth="md" className={classes.stats}>
                    {val.score &&
                        <div>
                            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom fontFamily='Segoe UI'>
                                Average Score of all Students across all Departments
                            </Typography>
                            <BarGraph data1={val.score.department} data2={val.score.score} />
                            <Divider />
                            <br />
                        </div>
                    }
                    </Container>
                </TabPanel>

                <TabPanel value={value} index={4} dir={theme.direction}>
                    <Container maxWidth="md" className={classes.stats}>
                        {val.sem &&
                            <div>
                                <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom fontFamily='Segoe UI'>
                                    Distribution of Students across all Departments of your Semester
                                </Typography>
                                <BarGraph data1={val.sem.department} data2={val.sem.count} />
                                <Divider />
                                <br />
                            </div>
                        }
                    </Container>
                </TabPanel>
                </SwipeableViews>
            </div>

    )
}
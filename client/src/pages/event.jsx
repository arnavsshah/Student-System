import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, InputBase, Container } from "@material-ui/core";
import EventCard from "../components/event/eventCard";
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
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
let data1 = [];
let data2 = [];
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        maxWidth: "100%",
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
    },
    bookCard: {
        display: "flex",
        flexDirection: "row"
    },
    search: {
        position: 'relative',
        // borderRadius: theme.shape.borderRadius,
        borderColor: "red",
        backgroundColor: fade(theme.palette.primary.light, 0.2),
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.light, 0.10),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingRight: theme.spacing(4),
            width: '90vw',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'primary',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
}));
// axios({
//   method: 'get',
//   url: 'http://localhost:5000/library',
//   withCredentials: true,
// })
//   .then((res) => {
//     data1 = res.data.interestBased;
//     data2 = res.data.bookBased;
//     data3 = res.data.categoryBased;
//     data4 = res.data.authorBased;
//     console.log("data1 ", data1)
//     // console.log(res.data);
//   })

export default function Event(props) {
    const classes = useStyles();
    const theme = useTheme();
    let history = useHistory();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    //   if(!props.isLogin){
    //     history.push("/login");
    //   }

    return (
        <div className={classes.root}>

            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="A" {...a11yProps(0)} />
                    <Tab label="B" {...a11yProps(1)} />
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
                    className={classes.bookCard}
                >

                    <Container >
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <EventCard
                            bookName='book'
                            available={false}
                            imgUrl=""
                        />
                        <EventCard
                            bookName='book'
                            available={false}
                            imgUrl=""
                        />
                        <EventCard
                            bookName='book'
                            available={false}
                            imgUrl=""
                        />
                    </Container>

                    {/* <Grid container spacing={1}>
                        {data1.map((book) => {
                            return (
                                <LibraryCard
                                    bookName={book.name}
                                    available={book.issued === 'false'}
                                    imgUrl={book.image_url}
                                />
                                // <h1>hello</h1>
                            );
                        })
                        }
                    </Grid> */}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Container >
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <EventCard
                            bookName='book'
                            available={false}
                            imgUrl=""
                        />
                    </Container>
                    


                    {/* <Grid container spacing={1}>
                        {data2.map((book) => {
                            return (
                                <LibraryCard
                                    bookName={book.name}
                                    available={book.issued === 'false'}
                                    imgUrl={book.image_url}
                                />
                                // <h1>hello</h1>
                            );
                        })
                        }
                    </Grid> */}
                </TabPanel>

            </SwipeableViews>
        </div>
    );
}

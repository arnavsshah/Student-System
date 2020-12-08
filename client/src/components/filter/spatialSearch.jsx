import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// import ListSubheader from "@material-ui/core/ListSubheader";
import {
    List,
    ListItem,
    TextField,
    ListItemText,
    Collapse,
    Divider,
    Button
} from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing(4)
    },
    submitButton: {
        margin: theme.spacing(1)
        // marginLeft: theme.spacing(5)
    }
}));

export default function StudentList() {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        place: "",
        distance: 1,
        nearbyWorking: 1,
        nearbyStudying: 1,
        startYear: 2020,
    });
    const handleclickButton = (event) => {
        // console.log(state);
        console.log(event.target.parentElement.name, state[event.target.parentElement.name]);
        //here add what to do after clicking filter button
    };
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
        // console.log(event.target)
    };
    

    const classes = useStyles();
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <List>
                <ListItem color="primary" button onClick={handleClick}>
                    <ListItemText secondary="Spatial Search" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Divider />
                        <ListItem>
                            <div>
                            <ListItemText secondary="Search By Place/Locality" />
                            </div>
                       
                            <TextField
                                name="place"
                                label="Place"
                                value={state.place}
                                
                                onChange={handleChange}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                name="place"
                                className={classes.submitButton}
                                onClick={handleclickButton}
                            >
                                Search
                            </Button>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <div>
                            <ListItemText secondary="Search Within Distance" />
                            </div>
                            <TextField
                                name="distance"
                                label="Distance"
                                type="number"
                                value={state.distance}
                                InputProps={{ inputProps: { min: 1 } }, {
                                    endAdornment: <InputAdornment position="start">Km</InputAdornment>,
                                }}
                                onChange={handleChange}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                name="distance"
                                className={classes.submitButton}
                                onClick={handleclickButton}
                            >
                                Search
                            </Button>
                        </ListItem>
                        <Divider />

                        <ListItem>
                            <div>
                                <ListItemText secondary="Search Student Working Within Distance" />
                            </div>
                            <TextField
                                name="nearbyWorking"
                                label="Distance"
                                type="number"
                                value={state.nearbyWorking}
                                InputProps={{ inputProps: { min: 1 } }, {
                                    endAdornment: <InputAdornment position="start">Km</InputAdornment>,
                                }}
                                onChange={handleChange}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                name="nearbyWorking"
                                className={classes.submitButton}
                                onClick={handleclickButton}
                            >
                                Search
                            </Button>
                        </ListItem>
                        <Divider />

                        <ListItem>
                            <div>
                                <ListItemText secondary="Search Student Studying Within Distance" />
                            </div>
                            <TextField
                                name="nearbyStudying"
                                label="Distance"
                                type="number"
                                value={state.nearbyStudying}
                                InputProps={{ inputProps: { min: 1 } }, {
                                    endAdornment: <InputAdornment position="start">Km</InputAdornment>,
                                }}
                                onChange={handleChange}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                name="nearbyStudying"
                                className={classes.submitButton}
                                onClick={handleclickButton}
                            >
                                Search
                            </Button>
                        </ListItem>
                        <Divider />

                        <ListItem>
                            <div>
                                <ListItemText secondary="Search By Start year" />
                            </div>
                            <TextField
                                name="startYear"
                                label="Start Year"
                                type="number"
                                value={state.startYear}
                                InputProps={{ inputProps: { min: 0, max: 2020 } }}
                                onChange={handleChange}
                            />
                            
                            <Button
                                variant="contained"
                                color="primary"
                                name="startYear"
                                className={classes.submitButton}
                                onClick={handleclickButton}
                            >
                                Search
                            </Button>
                        </ListItem>
                        <Divider />
                        <ListItem>

                        </ListItem>
                        <Divider />

                        <Divider />
                    </List>

                    <Divider />
                </Collapse>
            </List>
        </>
    );
}

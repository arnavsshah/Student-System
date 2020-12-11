import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from 'react-router-dom';
import SchoolIcon from '@material-ui/icons/School';
import MyMenu from './MyMenu';
import { useCookies } from "react-cookie";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();
    const [cookies, setCookie] = useCookies();
    console.log("cookies", cookies.user)
    console.log("navbar", props)
    const isLoggedIn = props.isLoggedIn;
    let loginButton, signupButton;
    //uncomment this
    if (!isLoggedIn) {
        loginButton =  <Button color="inherit" href="../login">Login</Button>;
        signupButton = <Button color="inherit" href="../signup">Signup</Button>;
    } else {
        loginButton = <Button color="inherit">Profile</Button>;
        signupButton = <Button color="inherit">Logout</Button>;
    }

    //comment this after presentation
    

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MyMenu/>
                    </IconButton>
                   
                    <Typography variant="h6" className={classes.title}>
                        Student System
                    </Typography>
                    <SchoolIcon/>
                    {loginButton}
                    {signupButton}
                    {/* <Button color="inherit" href="../login">
                        <Typography variant="h7" className={classes.title}>
                            Hostel
                        </Typography>
                    </Button>
                    <Button color="inherit" href="../login">
                        <Typography variant="h7" className={classes.title}>
                            Search
                        </Typography>   
                    </Button>
                    <Button color="inherit" href="../login">
                        <Typography variant="h7" className={classes.title}>
                            Library 
                        </Typography>   
                    </Button>
                    <Button color="inherit" href="../login">
                        <Typography variant="h7" className={classes.title}>
                            Profile
                        </Typography>    
                    </Button>
                    <Button color="inherit" href="../login">
                        <Typography variant="h7" className={classes.title}>
                            Logout
                        </Typography>
                    </Button> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}

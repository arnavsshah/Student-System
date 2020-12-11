import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SchoolIcon from '@material-ui/icons/School';
// import MyMenu from './MyMenu';
import { useCookies } from "react-cookie";
// import axios from "axios";
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
    let history = useHistory();
    const doLogout = ()=>{
        props.setIsLogin(false)
        history.replace('/login')
    } 
    let navButton;
    //uncomment this
    if (!props.isLogin) {
        navButton =  <div> 
            <Button color="inherit" href="../login">Login</Button>
            <Button color="inherit" href="../signup">Signup</Button>
        </div>;
    } else {
        navButton = <div>
                <Button color="inherit" onClick = {()=>history.push('/event')}>Event</Button>
                <Button color="inherit" onClick = {()=>history.push('/profile')}>Profile</Button>
                <Button color="inherit" onClick = {()=>history.push('/filter')}>Search</Button>
                <Button color="inherit" onClick = {()=>history.push('/library')}>Library</Button>
                <Button color="inherit" onClick = {doLogout}>Logout</Button>
        </div>
    }

    //comment this after presentation
    

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MyMenu/>
                    </IconButton> */}
                   
                    <Typography variant="h6" className={classes.title}>
                        Student System
                    </Typography>
                    <SchoolIcon/>
                    {navButton}
                    {/* {loginButton}
                    {signupButton} */}
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

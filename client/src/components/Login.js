import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Link, Grid, Typography, Container} from "@material-ui/core";
import VpnKeySharpIcon from "@material-ui/icons/VpnKeySharp";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
const initialValues = {
    email: '',
    password: '',
  }
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function Login(props) {
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = useState(initialValues);
    const handleFormChange = (e)=> {
        const key = e.target.name;
        const value = e.target.value;
        setValues(preValue => ({
          ...preValue,
          [key]: value,
        }))
        // console.log(values);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event.target);
        console.log('handle submit')
        // const data1 = JSON.stringify(values); 
        // console.log(`Search Data : ${data1}`); 
        axios({
            method: 'post',
            url: 'http://localhost:5000/users/login',
            withCredentials: true,
            data: values,
        })
        .then((res) => {
            if(res.data=="Successfully Authenticated"){
                props.setIsLogin(true)
                console.log(res);
                history.replace('/profile');
            }
        })
        .catch(err => {
            console.error(err);
        });
    // alert('An essay was submitted: ' + this.state.value);

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VpnKeySharpIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit} method="post">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value = {values.email}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value = {values.password}
                                onChange={handleFormChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Typography, Link, Grid, FormControlLabel, TextField, CssBaseline, Button, Avatar, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

// import IconButton from '@material-ui/core/IconButton';
// import Collapse from '@material-ui/core/Collapse';
// import CloseIcon from '@material-ui/icons/Close';

const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    college_id: '',
    password: '',
    password_check: '',
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

export default function SignUp() {
    const classes = useStyles();
    const alert = useAlert();
    const history = useHistory();
    const [values, setValues] = useState(initialValues);
    const [open, setOpen] = React.useState(false);
    // const [openAlert, setOpenAlert] = useState(false);
    // var err = [];
    const handleFormChange = (e) => {
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
        // console.log(event.target.firstName.value);
        // const data1 = JSON.stringify(values); 
        // console.log(`Search Data : ${data1}`); 
        axios({
            method: 'post',
            url: 'http://localhost:5000/users/register',
            data: values
        })
            .then((res) => {
                if (res.data.errors) {
                    const e = res.data.errors;
                    // res.data.errors.forEach(e => {
                    //     alert.show(e)
                    // })
                    
                    // console.log(e)
                    // console.log(Object.keys(e).length);
                    for(let i = 0; i<Object.keys(e).length; i++){
                        // console.log(e[i]['msg']);
                        alert.error(e[i]['msg']);
                    }
                        
                }
                else {
                    // console.log(res.data);
                    alert.success('Success')
                    history.replace('/login');

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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {/* <Collapse in={open}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {err && err[0]['msg']}
                    </Alert>
                </Collapse> */}

                <form className={classes.form} noValidate onSubmit={handleSubmit} method="post">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                // autoComplete="fname"
                                name="first_name"
                                variant="outlined"
                                required
                                fullWidth
                                id="first_name"
                                label="First Name"
                                value={values.first_name}
                                onChange={handleFormChange}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="last_ame"
                                label="Last Name"
                                name="last_name"
                                value={values.last_name}
                                onChange={handleFormChange}
                            // autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={values.email}
                                onChange={handleFormChange}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="college_id"
                                label="College Id"
                                name="college_id"
                                value={values.college_id}
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
                                value={values.password}
                                autoComplete="current-password"
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password_check"
                                label="Confirm Password"
                                type="password"
                                id="passwordCheck"
                                value={values.password_check}
                                onChange={handleFormChange}
                            // autoComplete="current-password"
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
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

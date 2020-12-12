import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, TextField } from "@material-ui/core";
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useHistory } from "react-router-dom";
const initialValues = {
    name: '',
    title: '',
    description: '',
    date: '31/12/2020',
    prize: '',
    prerequistes: '',
    coordinator: '',
    contact: '',
    comments: '',
    image_url: '',
}
const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0)
    },
    total: {
        fontWeight: 700
    },
    title: {
        marginTop: theme.spacing(2)
    },
    // input: {
    //     display: 'none',
    //   },
}));

let data = []
export default function Course(props) {
    const [values, setValues] = useState(initialValues);
    const classes = useStyles();
    const history = useHistory();
    const handleFormChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues(preValue => ({
            ...preValue,
            [key]: value,
        }))
    }
    const addData = (e) => {
        // data.push(values);
        setValues(preValue => ({
            ...preValue,
            name: '',
            title: '',
            description: '',
            date: '31/12/2020',
            prize: '',
            prerequistes: '',
            coordinator: '',
            contact: '',
            comments: '',
            image_url: '',
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event.target);
        // console.log('handle submit')
        if (values.name !== '') {
            data.push(values);
        }
        console.log(data)
        //     axios({
        //         method: 'post',
        //         url: 'http://localhost:5000/profile/courses',
        //         withCredentials: true,
        //         data: data,
        //     })
        //     .then(() => {
        //       // console.log('done');
        //       // history.replace('/profile');
        //       setValues(preValue => ({
        //         ...preValue,
        //         name: ''
        //       }))
        //       data = [];
        //       props.setFlag(!props.flag);
        //       props.handleClosePopUp();
        //       props.setAnchorEl(null);
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Add Event Details
      </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Club Name"
                        fullWidth
                        value={values.name}
                        onChange={handleFormChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Title"
                        fullWidth
                        value={values.title}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="description"
                        name="description"
                        label="Description"
                        fullWidth
                        value={values.description}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="date"
                        name="date"
                        // label="Date"
                        type='date'
                        fullWidth
                        value={values.date}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="prerequistes"
                        name="prerequistes"
                        label="Prerequistes"
                        fullWidth
                        value={values.prerequistes}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="coordinator"
                        name="coordinator"
                        label="Coordinator Name"
                        fullWidth
                        value={values.coordinator}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="contact"
                        name="contact"
                        label="Coordinator Contact Number"
                        fullWidth
                        value={values.contact}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        // required
                        id="comments"
                        name="comments"
                        label="Other Comments"
                        fullWidth
                        value={values.comments}
                        onChange={handleFormChange}
                    />
                </Grid>
                <br/>
                <Grid item xs={12}>
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload
                     </Button>
                </label>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                </Grid>

                <Grid item style={{ marginTop: 16 }}>
                    <Button
                        type="button"
                        variant="contained"
                        onClick={addData}
                    // disabled={submitting || pristine}
                    >
                        Reset
                    </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                    // disabled={submitting}
                    >
                        Submit
          </Button>
                </Grid>
            </Grid>
        </>
    );
}

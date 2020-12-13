import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, TextField } from "@material-ui/core";
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useHistory } from "react-router-dom";
const initialValues = {
    club_name: '',
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
export default function AddEvents(props) {
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
            club_name: '',
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
        // if (values.name !== '') {
        //     data.push(values);
        // }
        // console.log("event form ",values)
        axios({
            method: 'post',
            url: 'http://localhost:5000/event',
            withCredentials: true,
            data: values,
        })
            .then(() => {
                console.log('done event form');
                // history.replace('/profile');
                setValues(preValue => ({
                    ...preValue,
                    club_name: '',
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
                props.handleClosePopUp();
            })
            .catch(err => {
                console.error(err);
            });
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
                        id="club_name"
                        name="club_name"
                        label="Club Name"
                        fullWidth
                        value={values.club_name}
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
                        id="prize"
                        name="prize"
                        label="Prize"
                        type = "number"
                        InputProps={{ inputProps: { min: 0} }}
                        fullWidth
                        value={values.prize}
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
                <br />
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

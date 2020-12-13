import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, TextField } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
const initialValues = {
    title: '',
    content: '',
    class: ''
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
export default function Notice(props) {
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
            title: '',
            content: '',
            class: ''
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event.target);
        // console.log('handle submit')
        // if (values.name !== '') {
        //     data.push(values);
        // }
        // console.log(data)
        // props.setFlag(!props.flag);
        axios({
            method: 'post',
            url: 'http://localhost:5000/notice',
            withCredentials: true,
            data: values,
        })
        .then(() => {
            // console.log('done creating notice');
            // history.replace('/profile');
            setValues(preValue => ({
            ...preValue,
            name: ''
            }))
            // props.setFlag(!props.flag);
            props.handleClosePopUp();
            // props.setAnchorEl(null);
        })
        .catch(err => {
            console.error(err);
        });
    }

    return (
        <>
        <Typography variant="h6" gutterBottom>
                Add Notice Details
      </Typography>
            <Grid container spacing={2}>
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
                        id="content"
                        name="content"
                        label="Content"
                        fullWidth
                        value={values.content}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="class"
                        name="class"
                        label="Class"
                        fullWidth
                        value={values.class}
                        onChange={handleFormChange}
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

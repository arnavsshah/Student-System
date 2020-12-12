import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, TextField } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
const initialValues = {
    floor: '',
    room: '',
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
            floor: '',
            room: '',
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
                <strong>Add Hostel Preference</strong>
        </Typography>
        <Typography variant="h6" gutterBottom align = 'center'>
                <strong>Note </strong>
        </Typography>
        <Typography variant="h6" gutterBottom>
                <strong>Block A is for first year students</strong>
        </Typography>
        <Typography variant="h6" gutterBottom>
                <strong>Block B is for Second year students</strong>
        </Typography>
        <Typography variant="h6" gutterBottom>
                <strong>Block C is for Third year and fourth year students</strong>
        </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="floor"
                        name="floor"
                        label="Add your Floor preferenece"
                        type = "number"
                        InputProps={{ inputProps: { min: 0, max: 8 } }}
                        fullWidth
                        value={values.floor}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="room"
                        name="room"
                        type = "number"
                        label="Add your Room preference"
                        fullWidth
                        InputProps={{ inputProps: { min: 0, max: 20} }}
                        value={values.room}
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

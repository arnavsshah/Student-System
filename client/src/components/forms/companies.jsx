import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, TextField } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
const initialValues = {
    name: '',
    field: '',
    website: '',
    startDate: '',
    endDate: '',
    position: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''

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
    }
}));
const data = []
export default function Company(props) {
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
        data.push(values);
        setValues(preValue => ({
            ...preValue,
            name: '',
            field: '',
            website: '',
            startDate: '',
            endDate: '',
            position: '',
            companyAddress: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event.target);
        // console.log('handle submit')
        if(values.name!==''){
          data.push(values);
        }
        console.log(data)
        axios({
            method: 'post',
            url: 'http://localhost:5000/profile/companies',
            withCredentials: true,
            data: data,
        })
        .then(() => {
          // console.log('done');
        //   history.replace('/profile');

        setValues(preValue => ({
            ...preValue,
            name: '',
            field: '',
            website: '',
            startDate: '',
            endDate: '',
            position: '',
            companyAddress: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        }))
        data = [];
        props.setFlag(!props.flag);
        props.handleClosePopUp();
        props.setAnchorEl(null);
        })
        .catch(err => {
            console.error(err);
        });
      }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Add Your Company Details
      </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Company Name"
                        fullWidth
                        value={values.name}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="field"
                        name="field"
                        label="Field"
                        fullWidth
                        value={values.field}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="website"
                        name="website"
                        label="Website"
                        fullWidth
                        value={values.website}
                        onChange={handleFormChange}
                    />
                </Grid>

                <Grid item xs={12}>

                    <TextField
                        id="startDate"
                        label="Start Date"
                        name="startDate"
                        type="date"
                        value={values.startDate}
                        onChange={handleFormChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="endDate"
                        label="End Date"
                        name="endDate"
                        type="date"
                        value={values.endDate}
                        onChange={handleFormChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="position"
                        name="position"
                        label="Position"
                        fullWidth
                        value={values.position}
                        onChange={handleFormChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="companyAddress"
                        name="companyAddress"
                        label="Address"
                        fullWidth
                        value={values.companyAddress}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        value={values.city}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        value={values.state}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="postalCode"
                        name="postalCode"
                        label="Zip / Postal code"
                        fullWidth
                        value={values.postalCode}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        value={values.country}
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
                        Add Company
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

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Typography, TextField, Grid, Button, makeStyles } from "@material-ui/core";
import axios from "axios";
const initialValues = {
  name: '',
  score: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  degree: '',
  startDate: '',
  endDate: '',
}
const useStyles = makeStyles(theme => {
  root: {
    margin: theme.spacing(0.5)
  }

});
export default function SchoolForm() {
  const [values, setValues] = useState(initialValues);
  const history = useHistory();
  const handleFormChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setValues(preValue => ({
      ...preValue,
      [key]: value,
    }))
    // console.log(values);
  };
  const reset = (e) => {
    setValues(preValue => ({
      ...preValue,
      name: '',
      score: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      degree: '',
      startDate: '',
      endDate: '',

    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target);
    // console.log('handle submit')
    // console.log(data)
    // const data1 = JSON.stringify(values); 
    // console.log(`Search Data : ${data1}`); 
    axios({
        method: 'post',
        url: 'http://localhost:5000/profile/institutes',
        data: values,
    })
    .then(() => {
      // console.log('done');
      history.replace('/profile');
    })
    .catch(err => {
        console.error(err);
    });
}

  const classes = useStyles;
  return (
    <form id='schoolform'>
      <Typography variant="h6" gutterBottom>
        School Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="School name"
            fullWidth
            value={values.name}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="degree"
            name="degree"
            label="Degree"
            fullWidth
            value={values.degree}
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
            id="score"
            name="score"
            type="number"
            label="SSC Percentage"
            value={values.score}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            value={values.address}
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
            onClick={reset}
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
    </form>
  );
}


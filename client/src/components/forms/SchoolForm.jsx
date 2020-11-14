import React, { useState, useEffect } from "react";
import { Typography, TextField, FormControlLabel, Checkbox, Grid, Button, makeStyles } from "@material-ui/core";
const initialValues = {
  schoolName: '',
  sscMarks: '',
  schoolAddress: '',
  city: '',
  state: '',
  zip: '',
  country: ''
}
const useStyles = makeStyles(theme => {
  root: {
    margin: theme.spacing(0.5)
  }

});
export default function SchoolForm() {
  const [values, setValues] = useState(initialValues);
  const handleFormChange = (e)=> {
    const key = e.target.name;
    const value = e.target.value;
    setValues(preValue => ({
      ...preValue,
      [key]: value,
    }))
    console.log(values);
  };
  const classes = useStyles;
  return (
    <form id = 'schoolform'>
      <Typography variant="h6" gutterBottom>
        School Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="schoolName"
            name="schoolName"
            label="School name"
            fullWidth
            value = {values.schoolName}
           onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="sscMarks"
            name="sscMarks"
            type="number"
            label="SSC Percentage"
          value = {values.sscMarks}
          onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="schoolAddress"
            name="schoolAddress"
            label="Address"
            fullWidth
          value = {values.schoolAddress}
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
          value = {values.city}
          onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
          value = {values.state}
          onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
          value = {values.zip}
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
          value = {values.country}
          onChange={handleFormChange}
          />
        </Grid>
        <Grid item style={{ marginTop: 16 }}>
          <Button
            type="button"
            variant="contained"
            // onClick={reset}
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
            // disabled={submitting}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}


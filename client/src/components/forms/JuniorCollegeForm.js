import React, { useState, useEffect } from "react";
import {Typography,Button, Grid, TextField, FormControlLabel, Checkbox, makeStyles} from "@material-ui/core";

const initialValues = {
  jrCollegeName: '',
  hscMarks: '',
  CETScore: '',
  JEEMainsScore: '',
  collegeAddress: '',
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
export default function JuniorCollegeForm() {

  const [values, setValues] = useState(initialValues);
  const classes = useStyles;
  const handleFormChange = (e)=> {
    const key = e.target.name;
    const value = e.target.value;
    setValues(preValue => ({
      ...preValue,
      [key]: value,
    }))
    console.log(values);
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Junior College Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="jrCollegeCName"
            name="jrCollegeName"
            label="Junior College name"
            fullWidth
            value = {values.jrCollegeName}
            onChange={handleFormChange}
            // autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="hscMarks"
            name="hscMarks"
            type="number"
            label="HSC Percentage"
            fullWidth
            value = {values.hscMarks}
            onChange={handleFormChange}
            // autoComplete="shipping address-line1"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="CETScore"
            name="CETScore"
            label="CET Score"
            type="number"
            fullWidth
            value = {values.CETScore}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="JEEMainsScore"
            name="JEEMainsScore"
            label="JEE Mains Score"
            type="number"
            fullWidth
            value = {values.JEEMainsScore}
            onChange={handleFormChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="collegeAddress"
            name="collegeAddress"
            label="Address"
            fullWidth
            value = {values.collegeAddress}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="collegeCity"
            name="city"
            label="City"
            fullWidth
            value = {values.city}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="collegeState"
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
    </>
  );
}
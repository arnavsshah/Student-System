import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function JuniorCollegeForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Junior College Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="jrCollegeCName"
            name="jrCollegName"
            label="Junior College name"
            fullWidth
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
            // autoComplete="shipping address-line1"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="CETScore"
            name="CETScore"
            label="CET Score"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="JEEMainsScore"
            name="JEEMainsScore"
            label="JEE Mains Score"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="collegeAddress"
            name="collegeAddress"
            label="Address"
            fullWidth
            autoComplete="college address-line"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="collegeCity"
            name="collegecity"
            label="City"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="collegeState"
            name="collegeState"
            label="State/Province/Region"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

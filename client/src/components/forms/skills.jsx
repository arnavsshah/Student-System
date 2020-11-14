import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid,Button,Typography, TextField} from "@material-ui/core";

const initialValues = {
  skill: '',
  
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

export default function Skill() {
  const [values, setValues] = useState(initialValues);
  const classes = useStyles();
  const handleFormChange = (e)=> {
    const key = e.target.name;
    const value = e.target.value;
    setValues(preValue => ({
      ...preValue,
      [key]: value,
    }))
    console.log(values)
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Add Your Skills
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TextField
            required
            id="skill"
            name="skill"
            label="Skill"
            fullWidth
            value = {values.skill}
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

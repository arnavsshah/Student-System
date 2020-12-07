import React, { useState, useEffect } from "react";
import { makeStyles, Typography, TextField, Grid, Button } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialValues = {
  projectName: '',
  description: ''
}

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(1)
  }
}));
const data = []
export default function Project(props) {
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
    // console.log(values);
  };
  const  addData = (e) => {
    data.push(values);
    setValues(preValue => ({
      ...preValue,
      projectName: '',
      description: ''
    }))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target);
    // console.log('handle submit')
    if(values.projectName!==''){
      data.push(values);
    }
    console.log(data)
    axios({
        method: 'post',
        url: 'http://localhost:5000/profile/projects',
        withCredentials: true,
        data: data,
    })
    .then(() => {
      // console.log('done', res.user);
      // window.location.reload();
      props.handleClosePopUp();
    })
    .catch(err => {
        console.error(err);
    });
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Add Your Project
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="projectName"
            name="projectName"
            label="Project name"
            fullWidth
            value={values.projectName}
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
        <Grid item >
          <Button
            type="button"
            variant="contained"
            onClick={addData}
          // disabled={submitting || pristine}
          >
            Add Project
          </Button>
        </Grid>
        <Grid item>
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

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid,Button,Typography, TextField} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
const initialValues = {
  name: '',
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
export default function Skill(props) {
  const [values, setValues] = useState(initialValues);
  // const classes = useStyles();
  const history = useHistory();
  const handleFormChange = (e)=> {
    // const key = e.target.name;
    const value = e.target.value;
    setValues(preValue => ({
      ...preValue,
      name: value,
    }))
    // console.log(values)
  }
  const addData = (e) => {
    // console.log("push")
    data.push(values);
    // console.log(data)
    setValues(preValue => ({
      ...preValue,
      name: ''
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
        url: 'http://localhost:5000/profile/skills',
        withCredentials: true,
        data: data,
    })
    .then( ()=> {
      // console.log('done');
      // history.replace('/profile');
      props.handleClosePopUp();
    })
    .catch(err => {
        console.error(err);
    });
  }
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Add Your Skills
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Skill"
            fullWidth
            value = {values.name}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item style={{ marginTop: 16 }}>
          <Button
            type="button"
            variant="contained"
            name="name"
            onClick={addData}
            // disabled={submitting || pristine}
          >
            Add Skill
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

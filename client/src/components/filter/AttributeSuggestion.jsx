import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
// import ListSubheader from "@material-ui/core/ListSubheader";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  Button
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  submitButton: {
    margin: theme.spacing(1)
    // marginLeft: theme.spacing(5)
  }
}));

export default function AttributeSuggestion(props) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    attribute: ""
  });
  const handleclickButton = (event) => {
    console.log(state);
    axios({
      method: 'post',
      url: 'http://localhost:5000/search/attributeSuggestion',
      withCredentials: true,
      data: state,
    })
      .then((res) => {
        console.log('atrribut ldkkd')
        setState(preValue => ({
          ...preValue,
          attribute: ""
        }))
        props.setQueryData(res.data);
        props.setScreenCounter(3);
      })
      .catch(err => {
        console.error(err);
      });
    //here add what to do after clicking filter button
  };
  const handleChange = (event) => {
    // console.log(event.target.name);
    setState({ ...state, ["attribute"]: event.target.value });
    // console.log(state);
  };

  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <List>
        <ListItem color="primary" button onClick={handleClick}>
          <ListItemText secondary="Attribute Suggestion" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Divider />
            {/* department radio */}
            <ListItem>
              <FormControl component="fieldset">
                <FormLabel component="legend">Attribute</FormLabel>
                <RadioGroup
                  aria-label="department"
                  name="department"
                  value={state.department}
                  color="primary"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="skill"
                    control={<Radio color="primary" />}
                    label="Skill"
                  />
                  <FormControlLabel
                    value="course"
                    control={<Radio color="primary" />}
                    label="Course"
                  />
                  <FormControlLabel
                    value="project"
                    control={<Radio color="primary" />}
                    label="Project"
                  />
                  <FormControlLabel
                    value="achievement"
                    control={<Radio color="primary" />}
                    label="Achievement"
                  />
                  <FormControlLabel
                    value="club"
                    control={<Radio color="primary" />}
                    label="Club"
                  />
                  <FormControlLabel
                    value="company"
                    control={<Radio color="primary" />}
                    label="Company"
                  />
                </RadioGroup>
              </FormControl>
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="primary"
            className={classes.submitButton}
            onClick={handleclickButton}
          >
            Filter
          </Button>
          <Divider />
        </Collapse>
      </List>
    </>
  );
}

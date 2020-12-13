import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
// import ListSubheader from "@material-ui/core/ListSubheader";
import {
  List,
  ListItem,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  TextField,
  ListItemText,
  Collapse,
  Checkbox,
  Divider,
  FormControlLabel,
  Button
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MyChip from "./MyChip";
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

export default function StudentList(props) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    myClass: false,
    department: "",
    semester: "0",
    skills: [],
    skillsValue: "",
    institutes: [],
    institutesValue: "",
    courses: [],
    coursesValue: "",
    projects: [],
    projectsValue: "",
    achievements: [],
    achievementsValue: "",
    researchPapers: [],
    researchPapersValue: "",
    clubs: [],
    clubsValue: "",
    interests: [],
    interestsValue: "",
    languages: [],
    languagesValue: "",
    companies: [],
    companiesValue: ""
  });
  const handleclickButton = (event) => {
    // console.log(state);
    console.log("filter data", state)
    axios({
      method: 'post',
      url: 'http://localhost:5000/search/student',
      withCredentials: true,
      data: state,
    })
      .then((res) => {
        // console.log('done');
        // history.replace('/profile');
        //   console.log('great')
        
        setState(preValue => ({
          ...preValue,
          myClass: false,
          department: "",
          semester: 0,
          skills: [],
          skillsValue: "",
          institutes: [],
          institutesValue: "",
          courses: [],
          coursesValue: "",
          projects: [],
          projectsValue: "",
          achievements: [],
          achievementsValue: "",
          researchPapers: [],
          researchPapersValue: "",
          clubs: [],
          clubsValue: "",
          interests: [],
          interestsValue: "",
          languages: [],
          languagesValue: "",
          companies: [],
          companiesValue: ""
        }))
        props.setQueryData(res.data);
        props.setScreenCounter(2);
        // console.log('f');
        // props.setMapData(res.data)
        // console.log("ressss", res.data)

      })
      .catch(err => {
        console.error(err);
      });
    //here add what to do after clicking filter button
  };
  const handleChangeMyClass = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleChangeDepartment = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleChangeSemester = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
    // console.log(state);
  };
  const handleKeyDown = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
      let v = evt.target.id + "Value";
      var value = state[v].trim();
      if (state[evt.target.id].includes(value) || state[v] === "") {
        setState({
          ...state,
          [v]: ""
        });
      } else {
        setState({
          ...state,
          [evt.target.id]: [...state[evt.target.id], value],
          [v]: ""
        });
      }
      // console.log(state);
    }
  };

  const handleChange = (evt) => {
    // console.log(evt.target.id);
    let v = evt.target.id + "Value";
    setState({
      ...state,
      [v]: evt.target.value
    });
  };

  const handleDelete = (item, id) => {
    // let v = id+ "Value";
    setState({
      ...state,
      [id]: state[id].filter((i) => i !== item)
    });
  };

  const handlePaste = (evt) => {
    evt.preventDefault();
    // var paste = evt.clipboardData.getData("text");
    // setState((preValue) => ({
    //   ...preValue,
    //   [evt.target.id]: [...state.items, paste]
    // }));
  };

  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <List>
        <ListItem color="primary" button onClick={handleClick}>
          <ListItemText secondary="Student" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Divider />
            {/* my class checkbox */}
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.myClass}
                    onChange={handleChangeMyClass}
                    name="myClass"
                    color="primary"
                  />
                }
                label="My Class"
              />
            </ListItem>
            <Divider />
            {/* department radio */}
            <ListItem>
              <FormControl component="fieldset">
                <FormLabel component="legend">Department</FormLabel>
                <RadioGroup
                  aria-label="department"
                  name="department"
                  value={state.department}
                  color="primary"
                  onChange={handleChangeDepartment}
                >
                  <FormControlLabel
                    value="Computer Engineering"
                    control={<Radio color="primary" />}
                    label="CS"
                  />
                  <FormControlLabel
                    value="Information Technology"
                    control={<Radio color="primary" />}
                    label="IT"
                  />
                  <FormControlLabel
                    value="Electronics and Telecommunications Engineering"
                    control={<Radio color="primary" />}
                    label="EXTC"
                  />
                  <FormControlLabel
                    value="Electrical Engineering"
                    control={<Radio color="primary" />}
                    label="Electrical Engineering"
                  />
                  <FormControlLabel
                    value="Mechanical Engineering"
                    control={<Radio color="primary" />}
                    label="Mech"
                  />
                  <FormControlLabel
                    value="Civil Engineering"
                    control={<Radio color="primary" />}
                    label="Civil"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio color="primary" />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </ListItem>
            <Divider />
            {/* semester */}
            <ListItem>
              <TextField
                name="semester"
                label="Semester"
                type="number"
                value={state.semester}
                InputProps={{ inputProps: { min: 0, max: 8 } }}
                onChange={handleChangeSemester}
              />
            </ListItem>
            <Divider />
            <MyChip
              state={state}
              handleDelete={handleDelete}
              handleKeyDown={handleKeyDown}
              handleChange={handleChange}
              handlePaste={handlePaste}
              content="skills"
            />
            <Divider />
            <MyChip
              state={state}
              handleDelete={handleDelete}
              handleKeyDown={handleKeyDown}
              handleChange={handleChange}
              handlePaste={handlePaste}
              content="institutes"
            />
            <Divider />
            <MyChip
              state={state}
              handleDelete={handleDelete}
              handleKeyDown={handleKeyDown}
              handleChange={handleChange}
              handlePaste={handlePaste}
              content="courses"
            />
            <Divider />
            <MyChip
              state={state}
              handleDelete={handleDelete}
              handleKeyDown={handleKeyDown}
              handleChange={handleChange}
              handlePaste={handlePaste}
              content="projects"
            />
            <Divider />
            <MyChip
              state={state}
              handleDelete={handleDelete}
              handleKeyDown={handleKeyDown}
              handleChange={handleChange}
              handlePaste={handlePaste}
              content="achievements"
            />
            <Divider />
            <MyChip
              state={state}
              handleDelete={handleDelete}
              handleKeyDown={handleKeyDown}
              handleChange={handleChange}
              handlePaste={handlePaste}
              content="researchPapers"
            />
            <Divider />
            <MyChip
              state={state}
              handleDelete={handleDelete}
              handleKeyDown={handleKeyDown}
              handleChange={handleChange}
              handlePaste={handlePaste}
              content="clubs"
            />
            <Divider />
            <MyChip
              state={state}
              handleDelete={handleDelete}
              handleKeyDown={handleKeyDown}
              handleChange={handleChange}
              handlePaste={handlePaste}
              content="interests"
            />
            <Divider />
            <MyChip
              state={state}
              handleDelete={handleDelete}
              handleKeyDown={handleKeyDown}
              handleChange={handleChange}
              handlePaste={handlePaste}
              content="languages"
            />
            <Divider />
            <MyChip
              state={state}
              handleDelete={handleDelete}
              handleKeyDown={handleKeyDown}
              handleChange={handleChange}
              handlePaste={handlePaste}
              content="companies"
            />
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

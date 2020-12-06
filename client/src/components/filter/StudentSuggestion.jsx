import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import ListSubheader from "@material-ui/core/ListSubheader";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Checkbox,
  Divider,
  FormControlLabel,
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

export default function StudentSuggestion() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    isSkill: false,
    isInstitute: false,
    isCourse: false,
    isProject: false,
    isAchievement: false,
    isResearchPaper: false,
    isInterest: false,
    isLanguage: false,
    isCompany: false
  });
  const handleclickButton = (event) => {
    console.log(state);
    //here add what to do after clicking filter button
  };
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <List>
        <ListItem color="primary" button onClick={handleClick}>
          <ListItemText secondary="Student Suggestion" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Divider />
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.myClass}
                    onChange={handleChange}
                    name="isSkill"
                    color="primary"
                  />
                }
                label="Skill"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.myClass}
                    onChange={handleChange}
                    name="isInstitute"
                    color="primary"
                  />
                }
                label="Institute"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.myClass}
                    onChange={handleChange}
                    name="isCourse"
                    color="primary"
                  />
                }
                label="Course"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.myClass}
                    onChange={handleChange}
                    name="isProject"
                    color="primary"
                  />
                }
                label="Project"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.myClass}
                    onChange={handleChange}
                    name="isAchievement"
                    color="primary"
                  />
                }
                label="Achievement"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.myClass}
                    onChange={handleChange}
                    name="isResearchPaper"
                    color="primary"
                  />
                }
                label="ResearchPaper"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.myClass}
                    onChange={handleChange}
                    name="isInterest"
                    color="primary"
                  />
                }
                label="Interest"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.myClass}
                    onChange={handleChange}
                    name="isLanguage"
                    color="primary"
                  />
                }
                label="Language"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.myClass}
                    onChange={handleChange}
                    name="isCompany"
                    color="primary"
                  />
                }
                label="Company"
              />
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

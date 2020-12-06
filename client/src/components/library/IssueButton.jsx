import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { red, green } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(4),
      padding: theme.spacing(1)
    }
  },
  issue: {
    backgroundColor: green[500]
  },
  notAvailable: {
    backgroundColor: red[500]
  }
}));

export default function IssueButtons(props) {
  const classes = useStyles();
  if (props.available === true) {
    return (
      <div className={classes.root}>
        <Button
          className={classes.issue}
          variant="contained"
          href="#contained-buttons"
        >
          Issue
        </Button>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Button
          className={classes.notAvailable}
          variant="contained"
          href="#contained-buttons"
        >
          Unavailable
        </Button>
      </div>
    );
  }
}

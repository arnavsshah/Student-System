import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { red, green } from "@material-ui/core/colors";
import PopUp from "../PopUp";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // margin: theme.spacing(1),
      // padding: theme.spacing(1),
      width: "100%"
    }
  },
  issue: {
    backgroundColor: green[500],

  },
  notAvailable: {
    backgroundColor: red[500]
  }
}));

export default function IssueButtons(props) {
  const classes = useStyles();
  const [flag, setFlag] = useState(false);
  const handleClosePopUp = ()=>{
    setFlag(false);
  }
  const handleIssue = () => {

    axios({
      method: 'post',
      url: 'http://localhost:5000/library/issue',
      withCredentials: true,
      data: {id: props.id},
    })
      .then(() => {
        // console.log("done with issue")
        props.setReload(!props.reload);
        setFlag(!flag);
        
      })
      .catch(err => {
        console.error(err);
      });

  }
  if (props.available === true) {
    return (
      <div className={classes.root}>
        <Button
          className={classes.issue}
          // variant="contained"
          href="#contained-buttons"
          onClick={handleIssue}
        >
          Issue
        </Button>
        <PopUp openPopup={flag} handleClosePopUp={handleClosePopUp}>
          <h5>Collect your book from Library</h5>
        </PopUp>
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

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  FormControl,
  FormLabel,
  TextField
} from "@material-ui/core";
import "./MyChip.css";
import { blue } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    // paddingLeft: theme.spacing(4)
  },
  chip: {
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  },
  tagItem: {
    backgroundColor: blue
  }
}));
export default function MyChip(props) {
  const classes = useStyles();
  return (
    <>
      <ListItem className={classes.nested}>
        {/* <div>
          {props.content} 
          
        </div>
        <br/> */}
        <FormControl component="fieldset">
          <FormLabel component="legend">{props.content}</FormLabel>
          <div className={classes.chip}>
            {props.state[props.content] &&
              props.state[props.content].map((item) => (
                <div
                  className="tag-item "
                  style={{
                    backgroundColor: "#3f51b5",
                    color: "white"
                  }}
                  key={item}
                >
                  {item}
                  <button
                    type="button"
                    className="button"
                    onClick={() => props.handleDelete(item, props.content)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            <TextField
              fullWidth
              value={props.state[props.content + "Value"]}
              placeholder={"add " + props.content}
              id={props.content}
              onKeyDown={props.handleKeyDown}
              onChange={props.handleChange}
              onPaste={props.handlePaste}
            />
          </div>
        </FormControl>
      </ListItem>
    </>
  );
}

import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Image from 'material-ui-image'
// import ImageList from '@material-ui/core/ImageList';
// import ImageListItem from '@material-ui/core/ImageListItem';
// import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { Typography, Grid } from "@material-ui/core";
import IssueButton from "./IssueButton";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    borderWidth: 2,
    borderColor: "fff",
    backgroundColor: `#f8f8ff`,

    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    // minHeight: "20%",
    // maxHeight: "80%",
    maxHeight: "100%",
    minWidth: "20%",
    flexDirection: "column"
  },
  im: {
    height: '220px',
    width: '180px'
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    // paddingLeft: theme.spacing(1),
    // paddingBottom: theme.spacing(1)
  },
  issueButton: {
    // display: "flex",
    // float: "bottom",
    // paddingBottom: theme.spacing(1)
  }
}));

export default function MediaControlCard(props) {
  const classes = useStyles();
  // const theme = useTheme();
  let image1 = "../images/hostel.png"
  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.im}
          // style={{height: 0, paddingTop: '56.25%'}}
          image = 'http://ecx.images-amazon.com/images/I/61mnXb83KkL.jpg'
          // component = 'img'
          title="Live from space album cover"
        />
        {/* <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography>{props.bookName}</Typography>
            <Typography>Author - {props.bookAuthor}</Typography>
          </CardContent>
          <IssueButton
            className={classes.issueButton}
            available={props.available}
          />
        </div> */}
      </Card>
      <IssueButton
            className={classes.issueButton}
            available={props.available}
      />
      </div>
    </Grid>
  );
}

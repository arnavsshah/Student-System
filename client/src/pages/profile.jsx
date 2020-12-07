import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Button, Grid, Paper } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import MyMenu from "../components/profile/profileMenu";
import Container from "@material-ui/core/Container";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    width: "100%"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

export default function ImgMediaCard() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const p = {
    name: 'Arnav Shah',
    content: `Lorem Ipsum is simply dummy text of the printing and typesettingindustry. 
    Lorem Ipsum has been the industry's standard dummy text
    ever since the 1500s, when an unknown printer took a galley of type
    and scrambled it to make a type specimen book. It has survived not
    only five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s
    with the release of Letraset sheets containing Lorem Ipsum passages,
    and more recently with desktop publishing software like Aldus
    PageMaker including versions of Lorem Ipsum.`,
    schoolDetails: {
      title: '',
      schoolName: 'school',
      sscMarks: '100'
    },
    collegeDetails: {
      collegeName: 'jrCollegeName',
      hscMarks: '100'
    }

  }
  const handleClick = (event) => {

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Card className={classes.root} >
        <CardActions>
          <Avatar
            lt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large}
          // className={classes.large}
          />
          <Grid item xs={9}></Grid>
          <MyMenu />
        </CardActions>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {p.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {p.content}
          </Typography>
        </CardContent>

      </Card>

      {(() => {
        if (p.studentDetails) {
          return (<Card className={classes.root} >
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                School details
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>School Name: </strong>{p.schoolDetails.schoolName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>SSC Marks: </strong> {p.schoolDetails.sscMarks}
              </Typography>
            </CardContent>
          </Card>
          )
        }
      }
      )()
      }


      <Card className={classes.root} >
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            College details
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>College Name: </strong>{p.collegeDetails.collegeName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>HSC Marks: </strong> {p.collegeDetails.hscMarks}
          </Typography>
        </CardContent>
      </Card>
    </Container>

  );
}

import React, {useEffect, useState} from "react";
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
import ProfileMap from "../components/mapbox/profileMap"
import { Container, Divider,Link } from "@material-ui/core";
import Axios from "axios";
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

export default function Profile() {
  const classes = useStyles();
  const [p, setP] = useState(
    {
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
      projects: [
        { name: 'AA', description: 'aaa' },
        { name: 'BB', description: 'bbb' }
      ],
      achievements: [
        { title: 'YY', description: 'yyy' },
        { title: 'ZZ', description: 'zzz' },
      ],
      skills: [
        { name: 'q' },
        { name: 'qq' },
      ],
      institutes: [
  
      ],
      interests: [
  
      ],
      courses: [
  
      ],
      languages: [
  
      ],
      clubs: [
  
      ],
      researchPapers: [
  
      ],
      companies: [
        { name: "Google", field: "Technical", website: 'https://www.google.com', startDate: '22/01/2020', endDate: '', position: "SE", address: 'US' }
      ],
    }
  )
  // useEffect(()=>
  //   Axios.get("http://localhost:5000/profile")
  //   .then((res)=>{
  //     setP(res.data);
  //     console.log(p);
  //   })
  // )
  // const handleClick = (event) => {

  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      {/* <ProfileMap/> */}
      <Card className={classes.root} >
        <ProfileMap width='90vw' height = '50vh'/>
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

      {/* institute */}
      { p.institutes.length !== 0 &&
        <Card className={classes.root} >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Educations
            </Typography>
          </CardContent>
          <Divider />
          {p.institutes.length &&
            p.institutes.map((element) => {
              return (
                <div>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Name: </strong>{element.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Degree: </strong> {element.degree}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Start Date: </strong> {element.startDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>End Date: </strong> {element.endDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Score: </strong> {element.score}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Address: </strong> {element.address}
                    </Typography>
                  </CardContent>
                  <Divider />
                </div>
              )
            })
          }
        </Card>
      }



      {/* achievements */}
      { p.achievements.length !== 0 &&
        <Card className={classes.root} >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Achievements
            </Typography>
          </CardContent>
          <Divider />

          {p.achievements.length &&
            p.achievements.map((element) => {
              return (
                <div>
                  <CardContent>

                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Title: </strong>{element.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Description: </strong> {element.description}
                    </Typography>

                  </CardContent>
                  <Divider />
                </div>
              )
            })
          }
        </Card>
      }

      {/* skills */}

      { p.skills.length !== 0 &&
        <Card className={classes.root} >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Skills
            </Typography>
          </CardContent>
          <Divider />

          {p.skills.length &&
            p.skills.map((element) => {
              return (
                <div>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {element.name}
                    </Typography>
                  </CardContent>
                  <Divider />
                </div>
              )
            })
          }
        </Card>
      }
      {/* interests */}

      { p.interests.length !== 0 &&
        <Card className={classes.root} >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Interests
            </Typography>
          </CardContent>
          <Divider />

          {p.interests.length &&
            p.interests.map((element) => {
              return (
                <div>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {element.name}
                    </Typography>
                  </CardContent>
                  <Divider />
                </div>
              )
            })
          }
        </Card>
      }

      {/* courses */}

      { p.courses.length !== 0 &&
        <Card className={classes.root} >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Courses
            </Typography>
          </CardContent>
          <Divider />

          {p.courses.length &&
            p.courses.map((element) => {
              return (
                <div>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {element.name}
                    </Typography>
                  </CardContent>
                  <Divider />
                </div>
              )
            })
          }
        </Card>
      }

      {/* languages */}

      { p.languages.length !== 0 &&
        <Card className={classes.root} >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Languages
            </Typography>
          </CardContent>
          <Divider />

          {p.languages.length &&
            p.languages.map((element) => {
              return (
                <div>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {element.name}
                    </Typography>
                  </CardContent>
                  <Divider />
                </div>
              )
            })
          }
        </Card>
      }

      {/* projects */}
      { p.projects.length !== 0 &&
        <Card className={classes.root} >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Projects
            </Typography>
          </CardContent>
          <Divider />

          {p.projects.length &&
            p.projects.map((project) => {
              return (
                <div>
                  <CardContent>

                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Name: </strong>{project.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Description: </strong> {project.description}
                    </Typography>

                  </CardContent>
                  <Divider />
                </div>
              )
            })
          }
        </Card>
      }
      {/* clubs */}
      { p.clubs.length !== 0 &&
        <Card className={classes.root} >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Clubs
            </Typography>
          </CardContent>
          <Divider />
          {p.clubs.length &&
            p.clubs.map((element) => {
              return (
                <div>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Name: </strong>{element.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Start Date: </strong> {element.startDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>End Date: </strong> {element.endDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Position: </strong> {element.position}
                    </Typography>
                  </CardContent>
                  <Divider />
                </div>
              )
            })
          }
        </Card>
      }

      {/* ResearchPaper */}
      { p.researchPapers.length !== 0 &&
        <Card className={classes.root} >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Research Paper
            </Typography>
          </CardContent>
          <Divider />

          {p.researchPapers.length &&
            p.researchPapers.map((element) => {
              return (
                <div>
                  <CardContent>

                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Title: </strong>{element.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Description: </strong> {element.description}
                    </Typography>

                  </CardContent>
                  <Divider />
                </div>
              )
            })
          }
        </Card>
      }

      {/* companies */}
      { p.companies.length !== 0 &&
        <Card className={classes.root} >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Companies
            </Typography>
          </CardContent>
          <Divider />
          {p.companies.length &&
            p.companies.map((element) => {
              return (
                <div>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Name: </strong>{element.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Field: </strong> {element.field}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Website: </strong>  <a href={element.website}>{element.website}</a> 
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Start Date: </strong> {element.startDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>End Date: </strong> {element.endDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Position: </strong> {element.position}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Address: </strong> {element.address}
                    </Typography>
                  </CardContent>
                  <Divider />
                </div>
              )
            })
          }
        </Card>
      }


    </Container>
  );
}

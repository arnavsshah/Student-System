import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
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
import DisplayNotice from "../components/profile/displayNotice";
import DisplayHostel from "../components/profile/displayHostel";
import ProfileMap from "../components/mapbox/profileMap"
import { Container, Divider,Link } from "@material-ui/core";
import PopUp from "../components/PopUp";
import EventForm from "../components/forms/addEvent"
import NoticeForm from "../components/forms/createNotice"
import HostelForm from "../components/forms/hostelForm"
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    width: "100%"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  bg:{
    // borderStartEndRadius: '25%',
    // borderEndEndRadius: '25%',
    // borderStartStartRadius: '25%',
    // borderEndStartRadius: '25%'
  }
}));
// let notices = [
//   {
//     title: 'SGD submission',
//     content: 'Submit project report before 14 dec'
//   },
//   {
//     title: 'WIM submission',
//     content: 'I will destroy your life'
//   }
// ];
let hostel = {
  block: 'A',
  floor: '1',
  room: '12'
}
let si = 4;
export default function Profile(props) {
  const classes = useStyles();
  let history = useHistory();
  const [flag, setFlag] = useState(false);
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [openCreateNotice, setOpenCreateNotice] = useState(false);
  const [displayNotice, setDisplayNotice] = useState(false);
  const [hostelInfo, setHostelInfo] = useState(false);
  const [displayHostelInfo, setDisplayHostelInfo] = useState(false);
  const [p, setP] = useState(
    {
      name: '',
      content: ``,
      projects: [
        // { name: 'AA', description: 'aaa' },
        // { name: 'BB', description: 'bbb' }
      ],
      achievements: [
        // { title: 'YY', description: 'yyy' },
        // { title: 'ZZ', description: 'zzz' },
      ],
      skills: [
        // { name: 'q' },
        // { name: 'qq' },
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
        // { name: "Google", field: "Technical", website: 'https://www.google.com', startDate: '22/01/2020', endDate: '', position: "SE", address: 'US' }
      ],
      user:{

      },
      isTeaching: null,
      notices:[

      ]
    }
  )
  // if(!props.isLogin){
  //     history.push("/login");
  // }
  let bg = null;
  let bg2 = null;
  var currentlyTeaching;
  var hasHostel;
  useEffect(()=>
  axios({
    method: 'get',
    url: 'http://localhost:5000/profile/',
    withCredentials: true,
    })
    .then((res)=>{
      setP(res.data);
      console.log("notice",res.data.notices);
      // console.log(res.data);
    }),[flag]
  )
  const handleEventButton = (event) => {
    setOpenCreateEvent(!openCreateEvent);
  };
  const handleDisplayNoticeButton = (event) => {
    setDisplayNotice(!displayNotice);
  };
  const handleNoticeButton = (event) => {
    setOpenCreateNotice(!openCreateNotice);
  };
  const handleHostelForm = (event) => {
    setHostelInfo(!hostelInfo);
  };
  const handleHostelView = (event) => {
    setDisplayHostelInfo(!displayHostelInfo);
  };
  
  
  if(p.isTeaching){
    console.log("userrrrrr ",p.user)
      si=6;
      bg = <div>
        <Button variant="contained" 
            color="primary" 
            className={classes.bg}  
            size="medium" 
            onClick={handleNoticeButton}
          >
            Add Notice
          </Button>
          <PopUp openPopup={openCreateNotice} handleClosePopUp={handleNoticeButton}>
            <NoticeForm handleClosePopUp={handleNoticeButton}/>
          </PopUp>
      </div>
  }
  else{

    bg = <div>
    <Button variant="contained" 
        color="primary" 
        className={classes.bg}  
        size="medium" 
        onClick={handleDisplayNoticeButton}
      >
        Check Notice
      </Button>
      <PopUp openPopup={displayNotice} handleClosePopUp={handleDisplayNoticeButton}>
        <DisplayNotice notices = {p.notices} handleClosePopUp={handleDisplayNoticeButton} flag = {openCreateNotice} setFlag = {setOpenCreateEvent}/>
      </PopUp>
    </div>
    if(hasHostel){
      bg2 =<div>
      <Button variant="contained" 
        color="primary" 
        className={classes.bg}  
        size="medium" 
        onClick={handleHostelView}
      >
        Check Hostel
      </Button>
      <PopUp openPopup={displayHostelInfo} handleClosePopUp={handleHostelView}>
        <DisplayHostel hostel = {hostel} handleClosePopUp={handleHostelView}/>
      </PopUp>
      </div>
    }
    else{
      bg2 = <div>
        <Button variant="contained" 
        color="primary" 
        className={classes.bg}  
        size="medium" 
        onClick={handleHostelForm}
      >
      Apply For Hostel
      </Button>
      <PopUp openPopup={hostelInfo} handleClosePopUp={handleHostelForm}>
        <HostelForm hostel = {hostel}/>
      </PopUp>
      </div>
    }
  }
  

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
            alt="Abhishek" src="$" className={classes.large}
            height= '0'
            color='primary'
          // className={classes.large}
          />
          <Grid item xs={si}></Grid>
          {bg2}
          <Button variant="contained" 
            color="primary" 
            className={classes.bg}  
            size="medium" 
            onClick={handleEventButton}
          >
            Create Event
          </Button>
          <PopUp openPopup={openCreateEvent} handleClosePopUp={handleEventButton}>
            <EventForm handleClosePopUp={handleEventButton}/>
          </PopUp>
          {bg}
          <MyMenu setFlag = {setFlag} flag = {flag}/>

        </CardActions>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {"Abhishek Nair"}
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

          {p.achievements &&
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

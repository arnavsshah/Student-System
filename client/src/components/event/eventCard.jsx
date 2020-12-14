import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import EventDetails from './eventDetails'
import { StarRate } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(1),
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    flex: '1 0 auto',
    
  },
  cover: {
    height: '220px',
    width: '40vw'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),

  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function EventCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  // console.log(props.data)
  let data = props.data; 
  // console.log("inside event",data);
  // let data = { 
  //   club_name : "Technovanza", 
  //   title : "Smart City", 
  //   description : "The word Smart City gets thrown around a lot, especially lately. But what does it really mean? It is the city of your dreams with the execution in reality, it is a near utopia where technologies can solve our problems. A Smart City has solution to our everyday inconveniences and interruptions, whether it be the early warnings for calamities or the simple alarm that goes off on the probability of security breach. It has residential, industrial, economical, transportation, energy resources and environmental sectors. Though technology is an answer to most of our problems, an ideal Smart City has the contribution of its people to make it a better place. So, if you think you have what it takes to make this world just a bit better, we at TECHNOVANZA ’19 invite you to come and play to win in Making your ideas stem into the real world and plan your very own SMART CITY.",
  //   date : "2020-12-27", 
  //   prize : 20000, 
  //   prerequistes : "A team should consist of minimum 2 and maximum 4 members.", 
  //   coordinator : "Rushikesh Kejkar", 
  //   contact : "9518506462", 
  //   comments : "The team need to report on time at the venue", 
  //   image_url : "", 
  // };
  // console.log(data)
  const handleClick = (event) =>{
    history.push({
      pathname: '/eventDetails',
      state: data
  });
  let linkArr = [
    'https://technovanza2014.files.wordpress.com/2014/12/vrcevent.jpg',
    "http://www.telehouse.com/wp-content/uploads/2017/06/Telehouse-blog-6-1-17.png",
  ]
  }
  let image_url;
  if(data.image_url.length>0){
    image_url = data.image_url;
  }
  else{
    image_url = 'https://img.collegepravesh.com/2016/01/VJTI.jpg'
  }
  return (
    <Card className={classes.root} onClick = {handleClick}>
      <div className={classes.details}>
      <CardMedia
        className={classes.cover}
        image={image_url}
        title="event"
      />
        <CardContent className={classes.content}>
          <Typography variant="h5" >
            <strong>Club Name - </strong>{data.club_name}
          </Typography>
          <Typography variant="h5">
            <strong>Title - </strong>{data.title}
          </Typography>
          <Typography variant="h5">
            <strong>Description - </strong>{data.description.substring(0, 50)}...
          </Typography>
          <Typography variant="h5">
            <strong>Date - </strong>{data.date}
          </Typography>
          <Typography variant="h5">
            <strong>Co-ordinator - </strong>{data.coordinator}
          </Typography>
          <Typography variant="h5">
            <strong>Contact No. - </strong>{data.contact} 
          </Typography>
          
          
        </CardContent>
        {/* <div className={classes.controls}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div> */}
      </div>
      
    </Card>
  );
}

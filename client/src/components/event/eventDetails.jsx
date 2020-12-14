import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { Container, Typography, Paper, Card, CardMedia, Button } from "@material-ui/core";
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import ContactPhoneOutlinedIcon from '@material-ui/icons/ContactPhoneOutlined';
import EmojiPeopleOutlinedIcon from '@material-ui/icons/EmojiPeopleOutlined';
import axios from "axios";
const useStyles = makeStyles((theme) => ({
    
    submitButton: {
        margin: theme.spacing(1)
        // marginLeft: theme.spacing(5)
    },
    details: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(2)
    },
    toolbarTitle: {
        flexGrow: 1,
    },
}));
export default function Details() {
    const location = useLocation();
    // console.log("props",location.state.club_name);
    const classes = useStyles();
    let data = location.state;
    let bg;
    const handleClick = (e) => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/event/register',
            withCredentials: true,
            data: {event_id: data.event_id},
        })
        .then(() => {
            console.log('doneeeee')
            data.has_registered = true;
        })
        .catch(err => {
            console.error(err);
        });
    // console.log('hhhhhh')
    }
    // data.is_registered = true;
    if (data.has_registered) {
        bg = <Button variant="contained" color="#667778" component="span" fullWidth ="true" >
                Already Register
            </Button>
    }
    else{
        bg = <Button variant="contained" color="primary" component="span" fullWidth ="true" onClick = {handleClick}>
                Register
            </Button>
    }
    return (
        // <Paper variant="outlined" className = 'details'>
        <Card>


            <Container maxWidth="md" className='details'>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom fontFamily = 'Segoe UI'>
                    {data.club_name}
                </Typography>
                <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
                    {data.title}
                </Typography>
                <CardMedia
                    // className={classes.im}
                    style={{ height: 0, paddingTop: '56.25%' }}
                    image={data.image_url}
                // component = 'img'
                // title={props.bookName}
                />
                <br />

                <Typography variant="h5" align="center" color="textSecondary" component="p" fontFamily='Segoe UI'>
                    {data.description}
                </Typography>

                <br />
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    {data.prerequistes}
                </Typography>
                <br />
                <Typography variant="h5" color="textSecondary" align="center" component="p">
                    <strong> <DateRangeOutlinedIcon /> {data.date} </strong>
                </Typography>
                <br />
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    <strong>Contact</strong>
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    {data.coordinator} <EmojiPeopleOutlinedIcon />
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    {data.contact} <ContactPhoneOutlinedIcon />
                </Typography>
                <br />
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    <strong>Prize: </strong>
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    {data.prize}
                </Typography>
                <br />
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    <strong>{data.comments}</strong>
                </Typography>
                <br />
                {bg}
                <br/>
                <br/>

            </Container >
        </Card>
    )
}
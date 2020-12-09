import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { Typography, Grid, Avatar } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        borderWidth: 2,
        borderColor: "fff",
        backgroundColor: `#f8f8ff`,

        margin: theme.spacing(1),
        padding: theme.spacing(1),
        // minHeight: "20%",
        // maxHeight: "80%",
        maxHeight: "80%",
        minWidth: "20%",
        flexDirection: "column"
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        // backgroundColor: deepOrange[500],
        backgroundColor: `#f8f8ff`,
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
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    issueButton: {
        display: "flex",
        float: "bottom"
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
      },
}));

export default function MediaControlCard(props) {
    const classes = useStyles();
    // const theme = useTheme();

    return (
        <Grid item lg={12}>
            <Card className={classes.root}>
                {/* <CardMedia
          className={classes.cover}
          image="https://unsplash.com/photos/LkUWyFVeNAg"
          title="Live from space album cover"
        /> */}
                <div className={classes.details}>
                    <CardContent className={classes.content}>

                        <Grid container direction="row" spacing={1}>
                            <Grid item lg={1}>
                                <Avatar
                                    className={classes.purple}
                                    style={{ height: '70px', width: '70px' }}
                                    alt={props.name} src="$" className={classes.large}
                                >
                                    </Avatar>
                            </Grid>
                            <Grid item lg={11}>
                                <Grid container spacing={1} >
                                    <Grid item lg={6}>
                                        <Typography>Name - {props.data.name}</Typography>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Typography>Email - {props.data.email}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} >
                                    <Grid item lg={6}>
                                        <Typography>Semester - {props.data.semester}</Typography>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Typography>Department - {props.data.department}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} >
                                    <Grid item lg={6}>
                                        <Typography>Year - {props.data.year}</Typography>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Typography>Age - {props.data.age}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>

                                    <Typography>Address - {props.data.address}</Typography>
                                </Grid>
                            </Grid>

                        </Grid>

                    </CardContent>
                </div>
            </Card>
        </Grid>
    );
}

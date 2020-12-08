import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Divider,
  IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import StudentList from "../components/filter/Student";
import TeacherList from "../components/filter/Teacher";
import AlumniList from "../components/filter/Alumni";
import StudentSuggestion from "../components/filter/StudentSuggestion";
import AttributeSuggestion from "../components/filter/AttributeSuggestion";
import SpatialSearch from "../components/filter/spatialSearch"
import ProfileMap from "../components/mapbox/profileMap"
const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }
}));

export default function PersistentDrawerRight() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const mainScreen = <ProfileMap width='90vw' height = '70vh'/>
//   const mainScreen = <Typography paragraph>
//   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//   eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
//   dolor purus non enim praesent elementum facilisis leo vel. Risus at
//   ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
//   quisque non tellus. Convallis convallis tellus id interdum velit
//   laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
//   adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
//   integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
//   eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
//   quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
//   vivamus at augue. At augue eget arcu dictum varius duis at consectetur
//   lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
//   faucibus et molestie ac.
// </Typography>
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Student System
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar> 
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        {/* <ProfileMap width='90vw' height = '70vh'/> */}
        {mainScreen}
      </main> 
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <StudentList />
        <TeacherList />
        <AlumniList />
        <StudentSuggestion />
        <AttributeSuggestion />
        <SpatialSearch/>
      </Drawer>
    </div>
  );
}

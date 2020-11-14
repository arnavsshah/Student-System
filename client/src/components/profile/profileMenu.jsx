import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, Fab, Modal,ListItemText, MenuItem, Menu, IconButton } from "@material-ui/core/";
import NavigationIcon from "@material-ui/icons/Navigation";
import AchievementForm from "../forms/Achievement";
import SchoolForm from "../forms/SchoolForm";
import JuniorCollegeForm from "../forms/JuniorCollegeForm";
import PopUp from "../PopUp";
import SkillForm from "../forms/skills"


const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  // avatar: {
  //   backgroundColor: red[500],
  // },
}));

export default function CustomizedMenus() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const [openPopup, setOpenPopup] = useState(false);
  const [open, setOpen] = React.useState(false);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [state, setState] = useState({school: false, jrCollege: false, achievement:false, skills:false});
  const handlePopup = (e) =>{
    const name = e.target.offsetParent.id;
    // console.log(name);
    setState(prevState => ({
      ...prevState,
      [name]: !prevState.name
  }));
  }
  


  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div style={{ float: "right" }}>
      <Fab
        variant="extended"
        onClick={handleClick}
        aria-controls="customized-menu"
        color="primary"
      >
        Add Profile Section
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </Fab>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick = { handlePopup} id = 'school'>
          <ListItemText primary="School Information"/>
          <PopUp openPopup = {state.school}>
            <SchoolForm/>
          </PopUp>
        </StyledMenuItem>

        <StyledMenuItem onClick ={ handlePopup} id ='jrCollege'>
          <ListItemText primary="Junior College Information" />
          <PopUp openPopup = {state.jrCollege}>
            <JuniorCollegeForm/>
          </PopUp>
        </StyledMenuItem>

        <StyledMenuItem onClick ={ handlePopup} id ='achievement'>
          <ListItemText primary="Achievements" />
          <PopUp openPopup = {state.achievement}>
            <AchievementForm/>
          </PopUp>
        </StyledMenuItem>

        <StyledMenuItem onClick ={ handlePopup} id ='skills'>
          <ListItemText primary="Skills" />
          <PopUp openPopup = {state.skills}>
            <SkillForm/>
          </PopUp>
        </StyledMenuItem>
        
        
      </StyledMenu>
    </div>
  );
}

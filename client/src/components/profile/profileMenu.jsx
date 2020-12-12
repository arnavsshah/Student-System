import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, Fab, Modal, ListItemText, MenuItem, Menu, IconButton } from "@material-ui/core/";
import AchievementForm from "../forms/achievements";
import SchoolForm from "../forms/SchoolForm";
import JuniorCollegeForm from "../forms/JuniorCollegeForm";
import PopUp from "../PopUp";
import SkillForm from "../forms/skills"
import InterestForm from "../forms/interests"
import CouresForm from "../forms/courses"
import LanguageForm from "../forms/languages"
import ClubForm from "../forms/clubs"
import ProjectForm from "../forms/projects"
import ResearchPaperForm from "../forms/researchPapers"
import CompanyForm from "../forms/companies"


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

export default function CustomizedMenus(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const [openPopup, setOpenPopup] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // console.log("check this",anchorEl)
    ////check this afterwards
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  let [state, setState] = useState({
    school: false,
    jrCollege: false,
    achievements: false,
    skills: false,
    interests: false,
    courses: false,
    languages: false,
    researchPapers: false,
    clubs: false,
    projects: false,
    companies: false
    
  });
  const handlePopup = (e) => {
    const name = e.target.offsetParent.id;
    console.log('ggg',e);
    if (name) {
      setState(prevState => ({
        ...prevState,
        [name]: !prevState.name
      }));
      setAnchorEl(null);
    }

  }

  const handleClosePopUp = (e) => {
    setState(prevState => ({
      ...prevState,
      // [name]: !prevState.name
      school: false,
      jrCollege: false,
      achievements: false,
      skills: false,
      interests: false,
      courses: false,
      languages: false,
      researchPapers: false,
      clubs: false,
      projects: false,
      companies: false
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
        <StyledMenuItem onClick={handlePopup} id='school'>
          <ListItemText primary="School Information" />
          <PopUp openPopup={state.school} handleClosePopUp={handleClosePopUp}>
            <SchoolForm handleClosePopUp={handleClosePopUp} flag = {props.flag} setFlag = {props.setFlag} setAnchorEl={setAnchorEl}/>
          </PopUp>
        </StyledMenuItem>

        <StyledMenuItem onClick={handlePopup} id='jrCollege'>
          <ListItemText primary="Junior College Information" />
          <PopUp openPopup={state.jrCollege} handleClosePopUp={handleClosePopUp}>
            <JuniorCollegeForm handleClosePopUp={handleClosePopUp} flag = {props.flag} setFlag = {props.setFlag} setAnchorEl={setAnchorEl}/>
          </PopUp>
        </StyledMenuItem>

        <StyledMenuItem onClick={handlePopup} id='achievements'>
          <ListItemText primary="Achievements" />
          <PopUp openPopup={state.achievements} handleClosePopUp={handleClosePopUp}>
            <AchievementForm handleClosePopUp={handleClosePopUp} flag = {props.flag} setFlag = {props.setFlag} setAnchorEl={setAnchorEl}/>
          </PopUp>
        </StyledMenuItem>

        <StyledMenuItem onClick={handlePopup} id='skills'>
          <ListItemText primary="Skills" />
          <PopUp openPopup={state.skills} handleClosePopUp={handleClosePopUp}>
            <SkillForm handleClosePopUp={handleClosePopUp} flag = {props.flag} setFlag = {props.setFlag} setAnchorEl={setAnchorEl}/>
          </PopUp>
        </StyledMenuItem>

        <StyledMenuItem onClick={handlePopup} id='interests'>
          <ListItemText primary="Interests" />
          <PopUp openPopup={state.interests} handleClosePopUp={handleClosePopUp}>
            <InterestForm handleClosePopUp={handleClosePopUp} flag = {props.flag} setFlag = {props.setFlag} setAnchorEl={setAnchorEl}/>
          </PopUp>
        </StyledMenuItem>

        <StyledMenuItem onClick={handlePopup} id='courses'>
          <ListItemText primary="Courses" />
          <PopUp openPopup={state.courses} handleClosePopUp={handleClosePopUp}>
            <CouresForm handleClosePopUp={handleClosePopUp} flag = {props.flag} setFlag = {props.setFlag} setAnchorEl={setAnchorEl}/>
          </PopUp>
        </StyledMenuItem>

        <StyledMenuItem onClick={handlePopup} id='languages'>
          <ListItemText primary="Languages" />
          <PopUp openPopup={state.languages} handleClosePopUp={handleClosePopUp}>
            <LanguageForm handleClosePopUp={handleClosePopUp} flag = {props.flag} setFlag = {props.setFlag} setAnchorEl={setAnchorEl}/>
          </PopUp>
        </StyledMenuItem>

        <StyledMenuItem onClick={handlePopup} id='projects'>
          <ListItemText primary="Projects" />
          <PopUp openPopup={state.projects} handleClosePopUp={handleClosePopUp}>
            <ProjectForm handleClosePopUp={handleClosePopUp} flag = {props.flag} setFlag = {props.setFlag} setAnchorEl={setAnchorEl}/>
          </PopUp>
        </StyledMenuItem>

        <StyledMenuItem onClick={handlePopup} id='clubs'>
          <ListItemText primary="Clubs" />
          <PopUp openPopup={state.clubs} handleClosePopUp={handleClosePopUp}>
            <ClubForm handleClosePopUp={handleClosePopUp} flag = {props.flag} setFlag = {props.setFlag} setAnchorEl={setAnchorEl}/>
          </PopUp>
        </StyledMenuItem>

        <StyledMenuItem onClick={handlePopup} id='researchPapers'>
          <ListItemText primary="ResearchPaper" />
          <PopUp openPopup={state.researchPapers} handleClosePopUp={handleClosePopUp}>
            <ResearchPaperForm handleClosePopUp={handleClosePopUp} flag = {props.flag} setFlag = {props.setFlag} setAnchorEl={setAnchorEl}/>
          </PopUp>
        </StyledMenuItem>

        <StyledMenuItem onClick={handlePopup} id='companies'>
          <ListItemText primary="Companies" />
          <PopUp openPopup={state.companies} handleClosePopUp={handleClosePopUp}>
            <CompanyForm handleClosePopUp={handleClosePopUp} flag = {props.flag} setFlag = {props.setFlag} setAnchorEl={setAnchorEl}/>
          </PopUp>
        </StyledMenuItem>


      </StyledMenu>
    </div>
  );
}

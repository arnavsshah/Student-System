import React from 'react';

import { useHistory } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MenuIcon from '@material-ui/icons/Menu'
export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
   
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const history = useHistory();
  return (
      
    <div>
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon/>
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem nClick={handleClose}>
            <a  onClick={() => history.push('/')}>Home</a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <a  onClick={() => history.push('/')}>Profile</a>
        </MenuItem>
       
        <MenuItem onClick={handleClose}>
            <a  onClick={() => history.push('/addData')}>Add data</a>
        </MenuItem>
      </Menu>
    </div>
  );
}

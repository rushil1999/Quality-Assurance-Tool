import React, { Component, useCallback, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from './authentication/ProvideAuth';
const NavBar = () => {

  // const history = useNavigate();
  // const redirectToDashboard = () => {
  //     history('/Dashboard');
  // }
  const contextValue = useContext(AuthContext);
  const { isAuthenticated, user, logout } = contextValue;
  console.log(contextValue);
  return (
    <div style={{ marginBottom: '20px' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Spartan QA Tool
          </Typography>
          {isAuthenticated ?
            (<Button>
              <Typography style={{color:'white'}} variant="h7" component="div" sx={{ flexGrow: 1 }}>
                {user.firstName}
              </Typography>

            </Button>) :
            (<Button onClick={() => { logout() }}>Logout</Button>)}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
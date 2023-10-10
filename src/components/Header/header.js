import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as To } from 'react-router-dom';


export default function Header() {
  return (
    <Box sx={{ flexGrow: 1  }}>
      <AppBar position="static">
        <Toolbar style={{backgroundColor:"#3f51b5"}}>
          <ShoppingCartIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </ShoppingCartIcon>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-Shop.com
          </Typography>
          <To to="/"> <Button style={{color:'white'}}>Sign Up</Button></To>
          <To to="/login" ><Button style={{color:'white'}} >Log In</Button></To>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
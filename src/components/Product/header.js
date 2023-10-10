import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as To } from 'react-router-dom';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';


export default function Head() {

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '20vw',
            '&:focus': {
              width: '25vw',
            },
          },
        },
      }));
      
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{backgroundColor:"#3f51b5"}} >
            <Grid container justifyContent="space-between">
              <Grid item >
              <Grid container >
                <Grid item alignSelf="center" >
              <ShoppingCartIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </ShoppingCartIcon>
          </Grid>
          <Grid item alignSelf="center" >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-Shop.com
          </Typography>
          </Grid>
          </Grid>
              </Grid>
              <Grid item >
              <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={()=>{console.log("hello");}}
            />
          </Search>
              </Grid>
              <Grid item>
                <Grid container spacing={1}>
                <Grid item>
                <To to="/products" ><Button style={{color:"white"}} >Home</Button></To>
                  </Grid> 
                  
                <Grid item>
                <To to="/login" ><Button onClick={()=>{localStorage.clear();}} style={{color:'white', backgroundColor:'red'}} >Log Out</Button></To>
                  </Grid> 
              
          </Grid>
              </Grid>
              </Grid>       
        </Toolbar>
      </AppBar>
    </Box>
  );
}

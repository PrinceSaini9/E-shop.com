import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header/header';
import { Link as To } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { Stack } from '@mui/material';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/PrinceSaini9/E-shop.com">
        E-Shop.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LoginIn(props) {

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  let col = (msg==="Login successfully")?"success":"error"
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      const userEmail= data.get('email');
      const userPassword= data.get('password');
      props.postData(userEmail,userPassword,setOpen,setMsg);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
      <Stack position="fixed" sx={{ width: '30%', right: 10 }} >
                        <Collapse in={open}>
                            <Alert severity={col} variant="filled" style={{ fontSize: 12 }} onClose={() => { setOpen(false); }}>{msg}</Alert>
                        </Collapse>
                    </Stack>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://media.istockphoto.com/id/1475106137/photo/shopping-online-cardboard-box-with-a-shopping-cart-logo-in-a-trolley-on-laptop-keyboard.jpg?s=612x612&w=0&k=20&c=q2EU_gZtF4MTXleRucN2op-YHPDIZbIboLN3SHPe7OI=)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{backgroundColor:"#3f51b5"}}
              >
                Sign In
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item >
                  <To to="/" variant="body2">
                    Don't have an account? Sign Up
                  </To>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
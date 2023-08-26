import * as React from 'react';
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import callAPI from '../callAPI.jsx'

function Copyright (props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        BigBrain
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

// Wrapper -> SignUp
export default function SignUp ({ onSuccess }) {
  const [method] = React.useState('POST');
  const [path] = React.useState('admin/auth/register');
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [emailWarning, setEmailWarning] = React.useState()
  const [passwordWarning, setPasswordWarning] = React.useState()
  const [errorMessage, setErrorMessage] = React.useState('');

  // prevent button from submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  // input validations
  function isValidEmail (email) {
    console.log(email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      return true
    } else {
      return false
    }
  }

  // set email value, check validity and show warning
  function emailChange (emailInput) {
    const email = emailInput.target.value
    setEmail(email);
    if (isValidEmail(email)) {
      setEmailWarning(false);
    } else {
      setEmailWarning(true);
    }
  }

  // set password, check validity and show warning
  function passwordChange (passwordInput) {
    const password = passwordInput.target.value
    setPassword(password);
    if (password.includes(' ') === true) {
      setPasswordWarning(true);
    } else {
      setPasswordWarning(false);
    }
    console.log(passwordWarning);
  }

  // // add input to payload object
  // setPayLoad({
  //   ...payload,
  //   email,
  //   password,
  //   name,
  // })

  // register function
  async function register () {
    console.log(email, password, name)
    callAPI(method, path, '', { email, password, name })
      .then((token) => { onSuccess(token) })
      .catch((error) => setErrorMessage(error.message))
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <br />
        <Stack>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Stack>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(name) => setName(name.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(email) => emailChange(email)}
                />
                {emailWarning && <p style={{ color: 'red' }}>Please enter a valid email address</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(password) => passwordChange(password)}
                />
                {passwordWarning && <p style={{ color: 'red' }}>Please enter a valid password with no space</p>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={register}
              disabled={emailWarning || passwordWarning}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

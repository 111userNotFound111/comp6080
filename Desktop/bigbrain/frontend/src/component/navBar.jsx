import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import createQuiz from './createQuiz';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { ReactComponent as BrainIcon } from '../assets/bigBrain.svg';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const LogoBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const LogoText = styled(Typography)({
  fontFamily: 'Roboto',
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#fff',
});
function CreateModal () {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newQuizName, setNewQuizName] = React.useState('')
  const [confirmIsDisabled, confirmSetIsDisabled] = useState(true);
  useEffect(() => {
    if (newQuizName.length > 0) {
      confirmSetIsDisabled(false);
    } else {
      confirmSetIsDisabled(true);
    }
  }, [newQuizName]);
  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>New Quiz</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            create a quiz
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            name:
          </Typography>
          <Input value={newQuizName} onChange={(name) => { if (name.target) setNewQuizName(name.target.value) }} type="text" />
          <Button variant="contained" onClick={() => { createQuiz(newQuizName); handleClose(); window.location.href = '/dashboard'; }} disabled={confirmIsDisabled} sx={{ m: 2 } } >Confirm</Button>
          <Button variant="outlined" onClick={handleClose}>close</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default function DashboardNavBar () {
  const navigate = useNavigate();
  const location = useLocation();
  function Logout () {
    localStorage.clear();
    navigate('/');
  }
  if (location.pathname === '/dashboard') {
    return (
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
            <div><CreateModal /></div>
            <Button color="inherit" onClick={Logout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  if (location.pathname.includes('/playingGame') || location.pathname.includes('/result') || location.pathname.includes('/editGame') || location.pathname.includes('/showPrevious')) {
    return (
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Toolbar>
          <Button color="inherit" onClick={
                () => {
                  navigate('/dashboard');
                }
          }>Dashboard</Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
            <Button color="inherit" onClick={Logout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  if (location.pathname.includes('/') || location.pathname === '/player') {
    return (
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
            <Toolbar>
              <LogoBox>
                <BrainIcon width="50px" height="50px" style={{ marginRight: '10px' }} />
                <LogoText variant="h5">Big Brain</LogoText>
              </LogoBox>
            </Toolbar>
        </AppBar>
      </Box>
    )
  } else {
    return (
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
            <div><CreateModal /></div>
            <Button color="inherit" onClick={Logout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

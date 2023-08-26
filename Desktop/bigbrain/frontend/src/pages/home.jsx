import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import NavBar from '../component/navBar';
import PersonIcon from '@mui/icons-material/Person';
import GamesIcon from '@mui/icons-material/Games';

// this is player join part

function home () {
  const navigate = useNavigate();
  function onClickAdmin () {
    if (localStorage.getItem('token') === null) {
      navigate('/signIn');
    } else {
      navigate('/dashboard');
    }
  }
  return (
    <div>
      <NavBar/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button startIcon={<PersonIcon />} onClick={onClickAdmin} sx={{ width: '300px', height: '100px', fontSize: '32px', padding: '16px', margin: '16px', backgroundColor: '#4dabf5', color: '#fff', '&:hover': { backgroundColor: '#1976d2' } }}>Admin</Button>
          <Button startIcon={<GamesIcon />} onClick={() => navigate('/player')} sx={{ width: '300px', height: '100px', fontSize: '32px', padding: '16px', margin: '16px', backgroundColor: '#66bb6a', color: '#fff', '&:hover': { backgroundColor: '#43a047' } }}>Player</Button>
        </div>
      </div>
    </div>

  )
}

export default home;

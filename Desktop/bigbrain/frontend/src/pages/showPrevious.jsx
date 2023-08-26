// import libraries
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import components
import { Button } from '@mui/material';
import NavBar from '../component/navBar.jsx';
import callAPI from '../callAPI.jsx';
export default function ShowPrevious () {
  const [sessions, setSessions] = useState([]);
  const { quizid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllsession();
  }, []);
  async function fetchAllsession () {
    callAPI('GET', `admin/quiz/${quizid}`, localStorage.getItem('token'), {})
      .then((data) => {
        setSessions(data.oldSessions);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', height: '80vh', marginTop: '20px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {sessions.map((session) => (
        <div key={session} style={{ marginBottom: '1rem' }}>
          To sessionId: {session}
          <Button variant="contained" onClick={ () => navigate(`/result/${session}`)}>
            Navigate
          </Button>
        </div>
      ))}
        </div>
      </div>
    </div>
  );
}

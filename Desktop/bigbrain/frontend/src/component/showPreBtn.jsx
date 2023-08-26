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
    callAPI('GET', `admin/quiz/${quizid}`, localStorage.getItem('token'), {})
      .then((data) => {
        setSessions(data.questions.oldSessions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [quizid]);

  function handleNavigate (sessionId) {
    navigate(`/result/${sessionId}`);
  }

  return (
    <div>
      <NavBar />
      {sessions.map((session) => (
        <div key={session.sessionId}>
          To {session.sessionId}
          <Button variant="contained" onClick={() => handleNavigate(session.sessionId)}>
            Navigate
          </Button>
        </div>
      ))}
    </div>
  );
}

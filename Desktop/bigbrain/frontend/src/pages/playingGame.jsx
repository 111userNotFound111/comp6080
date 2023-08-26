import * as React from 'react';
import NavBar from '../component/navBar.jsx'; // 重命名组件
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import callAPI from '../callAPI.jsx'
import { useEffect } from 'react'

// this is edit quiz profile function
function playingGame () {
  // this is the session id
  const { sessionId } = useParams();
  const { quizId } = useParams();
  const [open, setOpen] = React.useState(true);
  const [result, setResult] = React.useState(null);
  const [stage, setStage] = React.useState(0);
  const [questionLength, setQuestionLength] = React.useState(-2);
  const [msg, setMsg] = React.useState('Click next question to start the question');
  const [resultDisable, setResultDisable] = React.useState(true);
  const navigate = useNavigate();
  const handleSuccess = () => {
    setResult(0);
  };

  // const handleError = () => {
  // setResult(0);
  // };
  const question = () => {
    callAPI('GET', `admin/session/${sessionId}/status`, localStorage.getItem('token'), '').then((data) => {
      setQuestionLength(data.results.questions.length);
    }).catch((error) => {
      console.log(error);
    });
  };
  useEffect(() => {
    question();
  }, []);

  const handleNextButtonClick = () => {
    console.log('stage,length', stage, questionLength);
    if (stage !== questionLength && stage !== isNaN) {
      setStage(stage + 1);
      callAPI('POST', `admin/quiz/${quizId}/advance`, localStorage.getItem('token'), '').then((data) => {
        console.log('data', data);
      }).catch((err) => {
        setMsg('The game is over');
        console.log(err);
      });
      setMsg(`Question ${stage + 1}`);
    } else {
      setMsg('The game is over');
      callAPI('POST', `admin/quiz/${quizId}/end`, localStorage.getItem('token'), '').catch(() => {
        setMsg('The game is over');
      });
      setResultDisable(false);
    }
    handleSuccess();
  };

  const handleEndButtonClick = () => {
    setMsg('The game is over');
    callAPI('POST', `admin/quiz/${quizId}/end`, localStorage.getItem('token'), '').catch(() => {
      setMsg('The game is over');
    }).catch((error) => {
      console.log(error);
    });
    setResultDisable(false);
    handleSuccess();
  };

  const handleResultClick = () => {
    navigate(`/result/${sessionId}`);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  function handleDashboard () {
    navigate('/dashboard');
  }
  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1>{ msg }</h1>
          <Button variant="contained" onClick={handleNextButtonClick}>Next question</Button>
          {result === 0 && <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="already started"
            action={action}
          />}
          <br />
          <Button variant="contained" onClick={handleEndButtonClick}>End</Button>
          <br />
          <Button variant='contained' disabled={resultDisable} onClick={handleResultClick}>view result</Button>
          <br />
          <Button variant='contained' disabled={resultDisable} onClick={handleDashboard}>  DashBoard  </Button>
        </div>
      </div>
    </>
  )
}

export default playingGame;

// input quiz id, output a card with with the basic info
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { useState, useEffect } from 'react';
import CallAPI from '../callAPI.jsx';
import CardMedia from '@mui/material/CardMedia';
import StartQuiz from './startQuizModal.jsx';
import { Button, Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Hayden from '../assets/defaultThumbnail.jpeg'
function deleteQuiz (quizId) {
  CallAPI('DELETE', `admin/quiz/${quizId}`, localStorage.getItem('token'), '');
  window.location.href = '/dashboard';
}

export default function showQuizInCard (inputQuizId) {
  const [quizId] = useState(inputQuizId.inputQuizId);
  const [quizName, setQuizName] = useState('');
  const [quizThumbnail, setQuizThumbnail] = useState('');
  const [timelimit, setTimelimit] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    CallAPI('GET', `admin/quiz/${inputQuizId.inputQuizId}`, localStorage.getItem('token'), '').then((data) => {
      setQuizName(data.name);
      // console.log('data tyhunnail', data.thumbnail);
      if (data.thumbnail !== null) {
        setQuizThumbnail(data.thumbnail);
      } else {
        setQuizThumbnail(Hayden);
      }
      let time = 0;
      console.log('data', data.questions);
      data.questions.forEach((res) => {
        console.log('time', res);
        time = time + parseInt(res.timeLimit);
      });
      setTimelimit(time);
    }).catch(() => {
      console.log('error in showQuizInCard');
    });
  }, [])

  function handleEditQuiz () {
    navigate(`/editGame/${quizId}`);
  }
  function handleShowPreQuiz () {
    navigate(`/showPrevious/${quizId}`);
  }
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick = {() => deleteQuiz(inputQuizId.inputQuizId) } >
              <ClearIcon />
          </IconButton>
        }
        />
        <CardContent>
        <Typography variant="h5" component="div">
          name: {quizName}
        </Typography>
        <Typography variant="body2" component="div" color="text.secondary">
          id: {quizId}
        </Typography>
        <CardMedia
        component="img"
        height="220"
        width="220"
        image={quizThumbnail}
        alt="quiz thumbnail"
      />
      <Typography variant="body2">
        time required: {timelimit}(s)
        <br />
        <br />
      </Typography>
          <Button variant="contained" onClick={handleShowPreQuiz} >Show preivous session</Button>
        </CardContent>
        <CardActions>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <Button variant="contained" onClick={handleEditQuiz} id={quizId}>edit Quiz</Button>
            </Grid>
            <Grid item>
              <StartQuiz inputQuizId={inputQuizId.inputQuizId} />
      </Grid>
    </Grid>
        </CardActions>
      </Card>
    </Box>
  );
}

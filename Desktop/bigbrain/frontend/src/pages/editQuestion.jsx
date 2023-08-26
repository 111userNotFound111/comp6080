import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Checkbox, Button } from '@mui/material';
import CustomTextField from '../component/customTextField';
import NavBar from '../component/navBar'
import Hayden from '../assets/defaultThumbnail.jpeg'
import styled from 'styled-components';

const NewIframe = styled('iframe')({
  width: '400px',
  height: '400px',
  '@media (max-width: 500px)': {
    width: '100%',
  },
});
const Thumbnail = styled('img')({
  maxWidth: '70%',
  maxHeight: '400px',
  '@media (max-width: 1280px)': {
    maxWidth: '70%',
  },
  '@media (max-width: 850px)': {
    maxWidth: '70%',
    maxHeight: '70%',
  },
});
export default function editQuestion ({ setUpdatedQuestion }) {
  console.log('edit question function starts')
  const { quizId, questionIndex } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const questionsArray = location.state;
  console.log('questions Array ', location.state)
  const question = questionsArray[questionIndex]
  const [title, setTitle] = useState(question.title);
  const [timeLimit, setTimeLimit] = useState(question.timeLimit);
  const [pointsAllocated, setPointsAllocated] = useState(question.pointsAllocated);
  const [thumbnail, setThumbnail] = useState(question.thumbnail);
  const [answer, setAnswer] = useState(Object.values(question.answer));
  const [correctAnswer, setCorrectAnswer] = useState(Object.values(question.correctAnswer));

  function handleCheckboxChange (index) {
    const newCorrectAnswer = [...correctAnswer];
    newCorrectAnswer[index] = !newCorrectAnswer[index];
    setCorrectAnswer(newCorrectAnswer);
  }

  function handleOptionChange (index, value) {
    const newAnswer = [...answer];
    newAnswer[index] = value;
    setAnswer(newAnswer);
  }

  // convert base64 back to image
  function convertImg (thumbnail) {
    const image = new Image();
    image.src = thumbnail;
    return image;
  }
  // convert img to base64
  function handleImageChange (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setThumbnail(base64);
    };
    reader.readAsDataURL(file);
  }
  // pass updated questions back to editGame
  function handleSubmit (event) {
    event.preventDefault();
    const updatedQuestion = {
      title,
      thumbnail,
      timeLimit,
      pointsAllocated,
      correctAnswer,
      answer,
    }
    const newQuestionArray = [...questionsArray];
    newQuestionArray[questionIndex] = updatedQuestion;
    setUpdatedQuestion(newQuestionArray);
    navigate(`/editGame/${quizId}`)
  }

  function setUrl (inputURL) {
    setThumbnail(inputURL);
  }
  // console.log('current image', thumbnail)

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '50px' }}>
        <NavBar /> <br />
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
        <h1>Edit Question:    {title} </h1>
        <span>Quiz Id: {quizId} </span>
        <br /> <br />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
          <div style={{ width: '60%' }}>
          <CustomTextField
            autoFocus
            margin="dense"
            label="Question Title"
            value={title}
            style={{ width: '100%' }}
            onChange={(title) => setTitle(title.target.value)}
          />
          <CustomTextField
            margin="dense"
            label="Time Limit (seconds)"
            value={timeLimit}
            style={{ width: '100%' }}
            onChange={(limit) => setTimeLimit(limit.target.value)}
          />
          <CustomTextField
            margin="dense"
            label="Points Allocated"
            value={pointsAllocated}
            style={{ width: '100%' }}
            onChange={(points) => setPointsAllocated(points.target.value)}
          />
          <h3>Add A Youtube Link OR Upload A Thumbnail</h3>
          <CustomTextField
              margin="dense"
              label="Youtube URL"
              style={{ width: '100%' }}
              onChange={(e) => setUrl(e.target.value)}
          />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {thumbnail && thumbnail.match(/https?:\/\/(?:www\.)?youtube\.com\/watch\?v=(.*)/)
              ? (
              <NewIframe
                src={`https://www.youtube.com/embed/${RegExp.$1}`}
                title='YouTube'
                allowFullScreen
              />
                )
              : (
              <Thumbnail
                src={thumbnail ? convertImg(thumbnail).src : Hayden}
                alt='thumbnail'
                style={{ width: '100%', height: '400px' }}
              />
                )}
          </div> <br />

          <div style={{ display: 'flex', justifyContent: 'center', width: '60%', }}>
            <Button style={{ width: '50%' }} variant="contained" component="label">
                Upload Image
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handleImageChange}
                />
            </Button>
          </div>
      </div>

          <div>
          <hr />
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
            <h2 style={{ fontWeight: 'bold' }}>Input Answer and Select the Correct Answer</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                    <Checkbox
                      checked={correctAnswer[index]}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <CustomTextField
                      margin="dense"
                      label={`Option ${index + 1}`}
                      value={answer[index] ? answer[index] : ''}
                      onChange={(answer) => handleOptionChange(index, answer.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'center', width: '60%', }}>
              <Button type='submit' variant='contained' color='primary' style={{ width: '50%', }}>Finish Edit Question</Button>
              </div>
            </div>
          </div>
      </form>
    </div>
  );
}

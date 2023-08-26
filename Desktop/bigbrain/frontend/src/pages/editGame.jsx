// import libraries
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';

// import components
import { Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit, } from '@mui/icons-material';
import callAPI from '../callAPI.jsx'
import AddQuestionForm from '../component/addQuestionsForm.jsx'
import CustomTextField from '../component/customTextField.jsx'
import NavBar from '../component/navBar.jsx'
import Hayden from '../assets/defaultThumbnail.jpeg'
import { styled } from '@mui/material/styles';

const Thumbnail = styled('img')({
  maxWidth: '70%',
  maxHeight: '400px',
  '@media (max-width: 1280px)': {
    maxWidth: '70%',
  },
});

export default function editGame ({ token, updatedQuestion, setUpdatedTitle, updatedTitle, setUpdatedThumb, updatedThumb }) {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [newQuizName, setNewQuizName] = useState('')
  const [newThumbnail64, setThumbnail] = useState(null);
  const [questions, setQuestions] = useState([])
  const downloadFile = useRef(null);

  // Second store game info into variables every time quizInfo changes
  async function fetchQuizData () {
    const quizData = await callAPI('GET', `admin/quiz/${quizId}`, token, {});
    console.log('fet quiz data begins')
    if (updatedTitle) {
      setNewQuizName(updatedTitle);
    } else {
      setNewQuizName(quizData.name);
    }
    if (updatedThumb) {
      console.log('TRUE', updatedThumb)
      setThumbnail(updatedThumb);
    } else {
      if (quizData.thumbnail) {
        setThumbnail(quizData.thumbnail);
      } else {
        setThumbnail(Hayden);
      }
    }
    setQuestions(quizData.questions);
    if (updatedQuestion) {
      setQuestions(updatedQuestion)
    }
  }

  useEffect(() => {
    fetchQuizData();
  }, []);

  // convert img to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setThumbnail(base64);
    };
    reader.readAsDataURL(file);
  };

  console.log('quiz name :', newQuizName)
  console.log('quiz questions :', questions)
  // console.log('quiz thumbnail :', newThumbnail64)

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // Third edit variables and send back to database
  async function editQuizDetails () {
    await callAPI('PUT', `admin/quiz/${quizId}`, token, {
      questions,
      name: newQuizName,
      thumbnail: newThumbnail64,
    }).then(() => {
      navigate('/dashboard');
    })
  }
  // convert base64 back to image
  function Base64ToImage (base64) {
    const image = new Image();
    image.src = base64;
    return image;
  }
  // add new question using Modal
  function addNewQuestions (newQuestion) {
    setQuestions([...questions, newQuestion])
  }
  function handleEditQuestion (index) {
    console.log('current selected question to edit :', questions, 'with index', index)
    navigate(`/editGame/${quizId}/${index}`, { state: questions });
  }

  function handleDeleteQuestion (index) {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  }

  // save file as JSON
  function saveFileJSON () {
    const file = {
      questions,
      name: newQuizName,
      thumbnail: newThumbnail64,
    };
    const jsonString = JSON.stringify(file, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const downloadLink = URL.createObjectURL(blob);
    if (downloadFile.current) {
      downloadFile.current.href = downloadLink;
      downloadFile.current.download = `${newQuizName}.json`;
      downloadFile.current.click();
    }
  }
  // upload and store JSON
  function JSONUpload (fileInput) {
    const file = fileInput.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        if (jsonData.name) setNewQuizName(jsonData.name);
        if (jsonData.name) setUpdatedTitle(jsonData.name);
        if (jsonData.thumbnail) setThumbnail(jsonData.thumbnail);
        if (jsonData.thumbnail) setUpdatedThumb(jsonData.thumbnail);
        if (jsonData.questions) setQuestions(jsonData.questions);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };
    reader.readAsText(file);
  }
  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '50px' }}>
        <NavBar />
        <div>
          <h1>Edit Game : {newQuizName}</h1>
          <span>Game ID : {quizId}</span>
        </div> <br />
        <div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" component="label" style={{ marginTop: '20px', marginBottom: '20px', color: 'white', width: '400px' }}>
                Upload JSON
                <input
                  hidden
                  accept=".json,application/json"
                  type="file"
                  onChange={JSONUpload}
                />
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CustomTextField
              required
              style={{ width: '60%' }}
              id="outlined-required"
              label="Quiz Name"
              value={newQuizName || ''}
              onChange={(quizName) => setNewQuizName(quizName.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Thumbnail src={newThumbnail64 ? Base64ToImage(newThumbnail64).src : 'https://i.imgur.com/3oqzZ8K.png'} alt="thumbnail" />
          </div> <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ width: '400px' }} variant="contained" component="label">
              Upload Image
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleImageChange}
              />
            </Button>
          </div> <br /> <br />
        </div>
        <hr />
        {/* below are questions section, do not alter any style */}
        <div>
          <h1> Questions </h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AddQuestionForm onSubmit={addNewQuestions} />
          </div>
          <br />
          <List style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {questions && questions.map((question, index) => (
              <ListItem key={index} style={{
                marginBottom: '10px',
                backgroundColor: '#e6f3ff',
                width: '60%',
              }}>
                <ListItemText primary={question.title} />
                <div>
                  <IconButton aria-label="edit" onClick={() => handleEditQuestion(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDeleteQuestion(index)}>
                    <Delete />
                  </IconButton>
                </div>
              </ListItem>
            ))}
          </List>
          <hr />
          <br /> <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" onClick={editQuizDetails} style={{ backgroundColor: 'green', color: 'white', width: '400px' }}>Edit Game</Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={saveFileJSON} style={{ marginTop: '20px', backgroundColor: '#FFBF00', color: 'white', width: '400px' }}>
              Save as JSON
            </Button>
          </div><a ref={downloadFile} style={{ display: 'none' }} />
        </div>
      </form>
    </div>
  );
}

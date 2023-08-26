// import libraries
import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox } from '@mui/material';
// import components
import CustomTextField from '../component/customTextField.jsx'

export default function AddQuestionModal ({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [pointsAllocated, setPointsAllocated] = useState('');
  const [answer, setAnswer] = useState(Array.from({ length: 6 }, () => false));
  const [correctAnswer, setCorrectAnswer] = useState(Array.from({ length: 6 }, () => false));

  function handleOpen () {
    setOpen(true);
  }

  function handleClose () {
    setOpen(false);
  }

  function handleSubmit (event) {
    event.preventDefault();
    console.log('Title: ', title);
    console.log('thumbnail: ', thumbnail);
    console.log('time limit: ', timeLimit);
    console.log('pointsAllocated: ', pointsAllocated)
    console.log('Answer: ', answer);
    console.log('Correct answer: ', correctAnswer);
    // Handle form submission
    const newQuestion = {
      title,
      thumbnail,
      timeLimit,
      pointsAllocated,
      correctAnswer,
      answer,
    };
    console.log('appending new question', newQuestion)
    onSubmit(newQuestion)
    handleClose()
  }

  // upload image, convert and store image to base64
  function uploadThumbnail (event) {
    const img = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setThumbnail(reader.result)
    }
    reader.readAsDataURL(img)
  }

  function handleOptionChange (index, value) {
    const newAnswer = [...answer];
    newAnswer[index] = value;
    setAnswer(newAnswer);
  }

  function handleCheckboxChange (index) {
    const newCorrectAnswer = [...correctAnswer];
    newCorrectAnswer[index] = !newCorrectAnswer[index];
    setCorrectAnswer(newCorrectAnswer);
  }

  function setUrl (inputURL) {
    setThumbnail(inputURL);
  }

  return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', }}>
            <Button variant="contained" style={{ width: '400px' }} onClick={handleOpen}>Add Question</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Question</DialogTitle>
                <DialogContent>
                    <CustomTextField
                        autoFocus
                        margin="dense"
                        label="Question Text"
                        style={{ width: '60%' }}
                        //   value={title}
                        onChange={(text) => setTitle(text.target.value)}
                    />
                    <CustomTextField
                        margin="dense"
                        label="Time Limit (seconds)"
                        style={{ width: '60%' }}
                        //   value={timeLimit}
                        onChange={(time) => setTimeLimit(time.target.value)}
                    />
                    <CustomTextField
                        margin="dense"
                        label="Points Allocated"
                        style={{ width: '60%' }}
                        //   value={pointsAllocated}
                        onChange={(points) => setPointsAllocated(points.target.value)}
                    /> <br />
                    <span style={{ fontWeight: 'bold' }}> Add A Youtube Link OR Upload A Thumbnail</span> <br />
                    <CustomTextField
                        margin="dense"
                        label="Youtube URL"
                        onChange={(url) => setUrl(url.target.value)}
                    />
                    <div>
                        <input type="file" accept="image/*" style={{ marginBottom: '10px' }} onChange={uploadThumbnail} />
                    </div>
                    <hr />
                    <span style={{ fontWeight: 'bold' }}>Input Answer and Select the Correct Answer</span>
                    {Array.from({ length: 6 }, (_, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox
                                //   checked={correctAnswer[index]}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <CustomTextField
                                margin="dense"
                                label={`Option ${index + 1}`}
                                fullWidth
                                //   value={answer[index]}
                                onChange={(option) => handleOptionChange(index, option.target.value)}
                            />
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
  );
}

// import CallAPI from '../callAPI.jsx';
import React, { useState } from 'react';
// import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CallAPI from '../callAPI.jsx';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// this is edit quiz profile function
function startQuizAPI (quizId) {
  console.log('inputQuizDetail');
  CallAPI('POST', `admin/quiz/${quizId}/start`, localStorage.getItem('token'), '')
}
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

function StartQuizModal (inputId) {
  // modal
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState('copy');
  const handleClick = () => {
    setButtonText('copyed');
    setTimeout(() => {
      setButtonText('copy');
    }, 3000);
  };
  const [id] = useState(inputId.inputQuizId);
  const [open, setOpen] = useState(false);
  const [sessionNumber, setSessionNumber] = useState(0);
  const handleOpen = () => {
    setOpen(true);
    startQuizAPI(id);
    CallAPI('GET', `admin/quiz/${inputId.inputQuizId}`, localStorage.getItem('token'), '').then((data) => {
      setSessionNumber(data.active);
    })
  };
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button variant="contained" onClick={handleOpen} >Start Quiz</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            session number:{ sessionNumber }
          </Typography>
          {/* Button */}
          <CopyToClipboard text={ sessionNumber }>
            <Button variant="contained" onClick={handleClick} sx={{ m: 2 }}>{ buttonText }</Button>
          </CopyToClipboard>
          <p style={{ margin: '20px 0' }} />
          <p style={{ margin: '20px 0' }} />
          <Button variant="contained" onClick={() => {
            handleClose();
            navigate(`/playingGame/quizid/${inputId.inputQuizId}/sessionid/${sessionNumber}`);
          }} sx={{ m: 2 }} >Go!</Button>
          <Button variant="outlined" onClick={() => { handleClose() }}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default StartQuizModal;

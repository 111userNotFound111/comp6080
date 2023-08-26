import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CallAPI from '../../callAPI';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../component/navBar';
// this is player join part

function checkSessionId (sessionId, name, onSuccess, onError) {
  console.log('checksessionId');
  CallAPI('POST', `play/join/${sessionId}`, '', { name })
    .then((data) => {
      if (typeof onSuccess === 'function') {
        onSuccess(data);
      }
    })
    .catch(() => {
      if (typeof onError === 'function') {
        onError();
      }
      console.log('error');
    });
}

function playingGame () {
  const [sessionId, setSessionId] = React.useState('');
  const [playerName, setPlayerName] = React.useState('');
  const [result, setResult] = React.useState(null);
  const navigate = useNavigate();

  const handleSuccess = (data) => {
    setResult(1);
    navigate(`/player/${data.playerId}`);
  };

  const handleError = () => {
    setResult(0);
  };
  const handleButtonClick = () => {
    checkSessionId(sessionId, playerName, handleSuccess, handleError);
  };

  return (
    <div>
      <NavBar/>
      <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '70vh',
    }}
  >
    <>
        <div style={{}}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
          Start Game!
      <hr />
      </Typography>

      {/* Input */}
        <TextField id="standard-basic" label="Name" variant="standard" type="text" onChange={(name) => { if (name.target) setPlayerName(name.target.value) }}/>
        <div style={{ margin: '20px 0' }} />
      <TextField id="standard-basic" label="Session ID" variant="standard" type="text" onChange={(id) => { if (id.target) setSessionId(id.target.value) }}/>

      <Button variant="contained" onClick={handleButtonClick} sx={{ m: 2 }}>Go</Button>
          <div style={{ margin: '20px 0' }} />
          {result === 1 && <p>Success!</p>}
          {result === 0 && <p>Session id is wrong, try again</p>}
      </div>
    </>
  </div>
    </div>
  )
}

export default playingGame;

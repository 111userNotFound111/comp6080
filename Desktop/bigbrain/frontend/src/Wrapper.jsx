import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Dashboard from './pages/dashboard'
import EditGame from './pages/editGame'
import PlayingGame from './pages/playingGame'
import Kahoot from './pages/players/kahootJoin'
import KahootProcess from './pages/players/kahootProcess'
import EditQuestion from './pages/editQuestion'
import Home from './pages/home';
import Result from './pages/result';
import ShowPrevious from './pages/showPrevious';
import PlayerResult from './pages/players/playerResult';
// the Wrapper function is located inside the App router
// App -> Wrapper
function Wrapper () {
  const [token, setToken] = React.useState(null);
  const [dashload, setDashload] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [updatedQuestion, setUpdatedQuestion] = React.useState(null);
  const [updatedTitle, setUpdatedTitle] = React.useState('');
  const [updatedThumb, setUpdatedThumb] = React.useState('');

  // if sign in or sign up success, store token to localStorage and navigate to dashboard
  function storeToken (tokenInput) {
    const token = tokenInput.token
    console.log('token is:', token)
    setToken(token);
    localStorage.setItem('token', token);
    navigate('/dashboard');
  }

  // check if login navigate to dashboard
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      if (['/signup', '/signin'].includes(location.pathname)) {
        navigate('/dashboard');
      }
    } else if (['/', '/kahoot.it'].includes(location.pathname)) {
      console.log('player');
    } else if (!['/signup', '/signin'].includes(location.pathname)) { // if not login (no token), navigate to signin
      navigate('/signin');
    }
    setDashload(false)
  }, [])

  console.log(token)

  if (dashload) {
    return (
      <>Loading Page</>
    )
  }

  return (
    // the router component
    // add function with the initial letter been capital
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp onSuccess={storeToken} />} />
        <Route path="/signin" element={<SignIn onSuccess={storeToken} />} />
        <Route path="/dashboard" element={<Dashboard token={token}/>} />
        <Route path="/playingGame/quizid/:quizId/sessionid/:sessionId" element={<PlayingGame />} />
        <Route path="/editGame/:quizId" element={<EditGame token={token } updatedQuestion={updatedQuestion} setUpdatedTitle={setUpdatedTitle} updatedTitle={updatedTitle} setUpdatedThumb={setUpdatedThumb} updatedThumb={updatedThumb}/>} />
        <Route path="/editGame/:quizId/:questionIndex" element={<EditQuestion setUpdatedQuestion={setUpdatedQuestion} />} />
        {/* player */}
        <Route path="/player" element={<Kahoot />} />
        <Route path="/player/:playerid" element={<KahootProcess />} />
        <Route path="/result/:sessionid" element={<Result />} />
        <Route path="/showPrevious/:quizid" element={<ShowPrevious />} />
        <Route path="/player/playerResult/:playerid" element={<PlayerResult/>}/>
    </Routes>
    </>
  );
}

export default Wrapper;

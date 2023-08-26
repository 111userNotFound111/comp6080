import * as React from 'react';

import NavBar from '../component/navBar.jsx';
// import createGame from './component/createQuiz.jsx';
import ShowQuizInCard from '../component/showQuiz.jsx';
import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import callAPI from '../callAPI.jsx';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// previous is test code

function Dashboard ({ token }) {
  const [quizzes, setQuizzes] = React.useState([])
  // const [newQuizName, setNewQuizName] = React.useState('')

  // async function Game (aa) {
  //   console.log('Game function start here', aa);
  //   // await createGame(aa)
  //   console.log('')
  //   fetchAllQuizzes();
  // }
  useEffect(() => {
    fetchAllQuizzes();
    console.log('fetch start here')
  }, []);

  async function fetchAllQuizzes () {
    console.log('the current token passed in is :', token)
    callAPI('GET', 'admin/quiz', token, {})
      .then((data) => { setQuizzes(data.quizzes) })
  }
  console.log('quizzes are :', quizzes)

  return (
    <>
      <NavBar />
      {quizzes.length === 0 && (
        <div style={{ display: 'flex', fontSize: '300%', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
          No Quizzes Yet, Create A New Quiz
        </div>
      )}
      {/* <ResponsiveGrid /> */}
      <Box className="parent box" sx={{ flexGrow: 1, }}>
      <Grid className="parent grid" container columns={{ xs: 4, sm: 8, md: 12 }} >
        {quizzes.map((quiz, index) => (
          <Item key={index} sx={{ width: '300px', margin: '8px' }}>< ShowQuizInCard inputQuizId={quiz.id} /></Item>
        ))}
      </Grid>
    </Box>
    <br />
        {/* From here for new Quiz! <br />
        Name: <input value={newQuizName} onChange={(name) => { setNewQuizName(name.target.value) }} type="text" /> <br />
      <button onClick={() => Game(newQuizName) }> Create New Quiz </button> */}
    </>
  )
}

export default Dashboard;
// function ResponsiveGrid () {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//         {Array.from(Array(6)).map((_, index) => (
//           <Grid xs={6} sm={4} md={4} key={index}>
//             <Item>< ShowQuizInCard inputQuizId='113967492' /></Item>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

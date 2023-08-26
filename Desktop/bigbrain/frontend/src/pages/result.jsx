import * as React from 'react';
import NavBar from '../component/navBar.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import callAPI from '../callAPI.jsx'
import { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// this is edit quiz profile function
function result () {
  const [havePlayer, setHavePlayer] = React.useState(true);
  const [barData, setBarData] = React.useState([]);
  const { sessionid } = useParams();
  const navigate = useNavigate();

  const BarChartExample = () => (
    <BarChart width={600} height={300} data={barData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="pv" fill="#8884d8" />
    </BarChart>
  );
  // this is the session id
  // const [result, setResult] = React.useState(null);
  function createData (name, score, rank) {
    return { name, score, rank };
  }

  const [rows, setRows] = React.useState([]);
  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0),
  //   createData('Ice cream sandwich', 237, 9.0),
  //   createData('Eclair', 262, 16.0),
  //   createData('Cupcake', 305, 3.7),
  //   createData('Gingerbread', 356, 16.0),
  // ];

  const [eachScore, setEachScore] = React.useState([]);
  // player get in each question
  const [playerGetScore, setPlayerGetScore] = React.useState([]);

  const getScore = async () => {
    const data = await callAPI('GET', `admin/session/${sessionid}/status`, localStorage.getItem('token'), '');
    console.log('data status', data);
    const newScores = data.results.questions.map((question) => {
      console.log('question 1', question);
      return question.pointsAllocated;
    });
    setEachScore(newScores);
    setPlayerGetScore(Array(data.results.questions.length).fill(0));
  }
  useEffect(() => {
    getScore();
  }, []);

  useEffect(() => {
    if (eachScore.length !== 0) {
      getResult();
    }
  }, [eachScore]);

  const getResult = () => {
    callAPI('GET', `admin/session/${sessionid}/results`, localStorage.getItem('token'), '').then((data) => {
      if (data.results.length === 0) {
        console.log('no body join this game');
        setHavePlayer(false);
      }
      data.results.forEach(awrArray => {
        // each one
        console.log('data.results', awrArray);
        let getScore = 0;
        awrArray.answers.forEach((awr, index) => {
          // each answer
          if (awr.correct) {
            console.log('correct');
            getScore += parseInt(eachScore[index]);
            // add to total score array
            setPlayerGetScore((prevArray) =>
              prevArray.map((num, playerIndex) => {
                console.log('num', num);
                if (index === playerIndex) {
                  const newScore = parseInt(num) + parseInt(eachScore[playerIndex]);
                  console.log('this is index', playerIndex);
                  console.log('this is newScore', newScore);
                  return newScore;
                }
                // to avoid return undefined
                return num;
              })
            );
          }
        });
        setRows((prev) => [...prev, createData(awrArray.name, getScore, 0)]);
      });
    }).catch((error) => {
      console.log(error);
    });
    // each answer rank
  };

  useEffect(() => {
    console.log('playerGetScore1111', playerGetScore);
    const data = playerGetScore.map((score, index) => {
      return { name: index + 1, pv: parseInt(score) / parseInt(eachScore[index]) };
    });
    setBarData(data);
  }, [playerGetScore]);

  function handleDash () {
    navigate('/dashboard')
  }

  if (havePlayer === false) {
    return (
      <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <h1>No body join this Game</h1>
      </div>
      </>
    )
  } else {
    return (
      <>
        <NavBar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
            </TableContainer>
            <div style={{ height: '50px' }} />
            {/* barchart */}
          <BarChartExample />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <br /> <Button variant='contained' onClick={handleDash}>Back To Dashboard</Button>
        </div>
      </>
    )
  }
}

export default result;

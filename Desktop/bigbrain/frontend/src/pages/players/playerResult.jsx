import * as React from 'react';
import NavBar from '../../component/navBar.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import callAPI from '../../callAPI.jsx'
import { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
// this is edit quiz profile function
function result () {
  const { playerid } = useParams();
  const navigate = useNavigate();

  function createData (index, correctness) {
    return { index, correctness };
  }

  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    getResult();
  }, []);

  const getResult = () => {
    callAPI('GET', `play/${playerid}/results`, '', {})
      .then((data) => {
        console.log(data)
        data.forEach((awr, index) => {
          // each answer
          setRows((prev) => [...prev, createData((index + 1), awr.correct.toString())]);
          console.log(awr.correct)
        });
      }).catch((error) => {
        console.log(error);
      });
  };

  function handleHome () {
    navigate('/')
  }

  return (
      <>
        <NavBar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Question Number </TableCell>
                    <TableCell align="right">Correctness</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.index}
                      </TableCell>
                      <TableCell align="right">{row.correctness}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </TableContainer>
            <div style={{ height: '50px' }} />
            <br /> <Button variant='contained' onClick={handleHome}>Back To Home</Button>
          </div>
        </div>
      </>
  )
}

export default result;

import CallAPI from '../callAPI.jsx';

export default async function createGame (gameName) {
  CallAPI('POST', 'admin/quiz/new', localStorage.getItem('token'), {
    name: gameName,
  })
}

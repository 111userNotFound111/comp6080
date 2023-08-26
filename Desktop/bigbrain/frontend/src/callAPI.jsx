// import * as React from 'react';
/* method, path, token, payload**/
export default async function callAPI (method, path, token, payload) {
  console.log('API call starts with:', method, path);
  const options = {
    method,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };
  if (method === 'GET' || method === 'DELETE' || path.includes('start') || path.includes('advance') || path.includes('end')) {
    delete options.body;
  }
  // console.log('calling fetch')
  const response = await fetch(`http://localhost:5005/${path}`, options);
  const data = await response.json();
  if (data.error) {
    console.log(data.error);
    throw new Error(data.error);
  }
  return data;
}

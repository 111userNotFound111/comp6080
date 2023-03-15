import { BACKEND_PORT } from './config.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl } from './helpers.js';
console.log(`Let\'s go!`) ; 

// start with registration 
document.getElementById('signUp-button').addEventListener('click', ()=>{
    console.log("registration function begins")
    // assign DOM elements: Email, Name, Password, Confirm Password 
    const registrationEmail = document.getElementById('registration-email').value ;
    const registrationName = document.getElementById('registration-name').value ; 
    const registrationPassword = document.getElementById('registration-password').value ;
    const confirmPassword =  document.getElementById('confirm-password').value ;
    const whiteSpace = /^ *$/ ; 

    // send message class
    const registrationInform = {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            email: registrationEmail,
            password: registrationPassword,
            name: registrationName,
        }),
    };

    // calling backend registration API
    fetch('http://localhost:5005/auth/register', registrationInform)
    .then((response) => {
        response.json().then((data) => {
            if (data.error){
                console.log('The data is ', data);
                alert(data.error);
            } else {
                console.log('Success', data);
            }
        });
        console.log('I got response!', response)
    });
}) ; 


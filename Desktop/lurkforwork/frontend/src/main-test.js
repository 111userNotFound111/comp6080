// Draft - use for testing only
import { BACKEND_PORT } from './config.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl } from './helpers.js';
console.log(`Let\'s go!`);

// login 
document.getElementById('signIn-button').addEventListener('click', signIn);

// start with registration 
document.getElementById('signUp-button').addEventListener('click', registration);
document.getElementById('btn-close').addEventListener('click', () => {
    document.getElementById("registration").classList.add('hide');
    document.getElementById("signIn").classList.remove('hide');
});

// pop up function
function popUp_warning(input_errorMessage) {
    // Show the popup
    document.getElementById("popup").style.display = "inline";
    // Add error message if there is one
    if (input_errorMessage) {
        document.getElementById("error-msg").textContent = input_errorMessage;
    };
    function closePopup() {
        // Hide the popup
        document.getElementById("popup").style.display = "none";
    };
    document.getElementById('register-button').addEventListener('click', () => {
        alert("You clicked Register");
        closePopup();
        document.getElementById("registration").classList.remove('hide');
    });
    document.getElementById('tryAgain-button').addEventListener('click', () => {
        closePopup();
        document.getElementById("signIn").classList.remove('hide');
    });
};

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––– apiCall ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
function apiCall(path, payload, success) {
    // send message class
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(payload),
    };
    // callisign inAPI
    fetch('http://localhost:5005/' + path, options)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log('The data is ', data);
                    alert(data.error);
                    console.log(data);
                    document.getElementById("signIn").classList.add('hide');
                    popUp_warning(data.error);
                } else {
                    success(data);
                }
            });
            console.log('I got response!', response)
        });
}

function worked(data) {
    console.log('Success', data);
    localStorage.setItem('token', data.token)
    document.getElementById("logged-out").classList.add('hide');
    document.getElementById("logged-in").classList.remove('hide');
    document.getElementById("header-section").classList.remove('hide');
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––– login function ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
function signIn() {
    console.log("sign in function begins")
    // assign DOM elements: Email, Name, Password, Confirm Password 
    const payload = {
        email: document.getElementById('signIn-email').value,
        password: document.getElementById('signIn-password').value
    }

    
    // check if email has correct format 
    function validation_email() {
        const isValid_email = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(payload.email);
        if (isValid_email === false) {
            console.log('wrong email')
            return false;
        };
    };
    // check for password confirmation 
    function validation_password() {
        const space_regex = /^\S+$/;
        const isValid_password = space_regex.test(payload.password);
        if (isValid_password == false) {
            return false;
        };
    };
    // warning windows 
    function showWarning(input_message) {
        var warningMessage = `${input_message}. Do you want to `;
        if (confirm(warningMessage)) {
            console.log("User confirmed");
        } else {
            console.log("User cancelled");
        }
    };

    // client side validations 
    if (validation_email() == false) {
        alert('Invalid email input');
    } else {
        if (validation_password() == false) {
            alert('password can not be empty / containing space')
        } else {
            apiCall('auth/login', payload, worked)
        }
    }
};


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– registration ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
function registration() {
    console.log(" registration function begins")
    // assign DOM elements: Email, Name, Password, Confirm Password 
    const payload = {
        email: document.getElementById('registration-email').value,
        name: document.getElementById('registration-name').value,
        password: document.getElementById('registration-password').value
    }
    const confirmPassword = document.getElementById('confirm-password').value
    // check if email has correct format 
    function validation_email() {
        const isValid_email = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(payload.email);
        if (isValid_email === false) {
            console.log('wrong email')
            return false;
        };
    };
    // check name should be letters only
    function validation_name() {
        const name_regex = /^[A-Za-z\s]+$/;
        const isValid_name = name_regex.test(payload.name);
        if (isValid_name == false) {
            console.log('wrong name')
            return false;
        }
    };
    // check for password confirmation 
    function validation_password() {
        const space_regex = /^\S+$/;
        const isValid_password = space_regex.test(payload.password);
        if (isValid_password == false) {
            return false;
        };
    };

    // client side validations 
    if (validation_email() == false) {
        alert('Invalid email input');
    } else {
        if (validation_name() == false) {
            alert('Invalid name input')
        } else {
            if (validation_password() == false) {
                alert('password can not be empty / containing space')
            } else {
                if (payload.password != confirmPassword) {
                    alert('passwords do not match, please re-enter')
                } else {
                    apiCall('auth/register',payload,worked)
                }
            }
        }
    }
};


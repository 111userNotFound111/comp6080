//––––––––––––––––––––––––––––––––––––––––––––––––––––––– login function ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
import {
    APIcall
} from './main.js';
import {
    popUp_warning,
    validation_email,
    validation_name,
    validation_password
} from './warning.js';
import {
    hash_change
} from './systemFn.js';


export function signIn() {
    console.log("sign in function begins")
    const path = 'auth/login';
    const API_type = 'post';

    // assign DOM elements: Email, Name, Password, Confirm Password 
    const payload = {
        email: document.getElementById('signIn-email').value,
        password: document.getElementById('signIn-password').value
    }

    // client side validations 
    if (validation_email(payload.email) == false) {
        popUp_warning('Please enter a valid email address');
    } else {
        if (validation_password(payload.password) == false) {
            popUp_warning('Please enter a valid password containing no');
        } else {

            APIcall(API_type, path, payload, store_currUserInfo);
        }
    }
};


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– registration ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
export function registration() {
    const path = 'auth/register';
    const API_type = 'post';

    // assign DOM elements: Email, Name, Password, Confirm Password 
    const payload = {
        email: document.getElementById('registration-email').value,
        name: document.getElementById('registration-name').value,
        password: document.getElementById('registration-password').value
    }
    const confirmPassword = document.getElementById('confirm-password').value

    // client side validations 
    if (validation_email(payload.email) == false) {
        popUp_warning('Please enter a valid email address');
    } else {
        if (validation_name(payload.name) == false) {
            popUp_warning('Please enter a valid name');
        } else {
            if (validation_password(payload.password) == false) {
                popUp_warning('Please enter a valid password');
            } else {
                if (payload.password != confirmPassword) {
                    popUp_warning('passwords do not match, please re-enter');
                } else {

                    APIcall(API_type, path, payload, store_currUserInfo);
                    localStorage.setItem('user_email', payload.email);
                }
            }
        }
    }
};


/*store userId and token as {userId: xxx , token: xxx} as strings and direct to job Feed page*/
function store_currUserInfo(data) {
    // console.log('Success', data);
    const info_currUser = {
        userId: data.userId,
        token: data.token,
        email:''
    }

    function store_data(callback) {
        // store current user_info
        localStorage.setItem('user_info', JSON.stringify(info_currUser));
        // create a user info list to store all users id, name, email
        const user_info_list = [];
        localStorage.setItem('user_info_list', JSON.stringify(user_info_list));
        callback();
    }
    store_data(() => {
        // store user info and direct to jobFeed page 
        hash_change('jobFeeds');
    })
}
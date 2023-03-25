import './systemFn.js';
import {
    jobFeed
} from './jobs.js';
import {
    userFeed
} from './profile.js';
import {
    getId
} from './main.js';
import {
    APIcall
} from './main.js';


const layer_signIn = document.getElementById('signIn');
const layer_registration = document.getElementById('registration');
const layer_loggedIn = document.getElementById('logged-in');
const layer_loggedOut = document.getElementById('logged-out');
const layer_jobFeeds = document.getElementById('mainLayer');
const layer_profile = document.getElementById('profile');
const layer_header = document.getElementById('header-section')

function show_layer(layer_name) {
    layer_name.style.display = 'block';
}

function hide_layer(layer_name) {
    layer_name.style.display = 'none';
}

function show_signIn() {
    show_layer(layer_loggedOut);
    show_layer(layer_signIn);
    hide_layer(layer_loggedIn);
    hide_layer(layer_registration);
}

function show_registration() {
    show_layer(layer_loggedOut);
    show_layer(layer_registration);
    hide_layer(layer_signIn);
    hide_layer(layer_loggedIn);
}

function show_jobFeeds() {
    show_layer(layer_loggedIn);
    show_layer(layer_jobFeeds);
    hide_layer(layer_profile);
    hide_layer(layer_loggedOut);
}

function show_profile() {
    show_layer(layer_loggedIn);
    show_layer(layer_profile);
    hide_layer(layer_jobFeeds);
    hide_layer(layer_loggedOut);
}

function layers_router(layer_input) {
    // add a front page here if there are enough time 
    if (layer_input == 'signIn') {
        show_signIn();
        localStorage.clear();

    } else if (layer_input == 'registration') {
        show_registration();
        localStorage.clear();
        // job feed page start here
    } else if (layer_input == 'jobFeeds') {
        watch_Someone(getId());
        clean_JobFeed(() => {
            console.log('job feed start')

        })
        jobFeed();
        show_jobFeeds();
    } else if (layer_input == 'profile') {
        console.log("profile starts ")
        show_profile();
        userFeed(getId());
    } else {
        // check for login, if no login : back to login page
        // if login to main 
        if (localStorage.getItem('user_info')) {
            layers_router('jobFeeds');
        } else {
            layers_router('signIn'); // redirect to login for now, change to front page 
        }
    }
}

/*show header buttons if logged in*/
function displayHeader() {
    if (localStorage.getItem('user_info')) {
        show_layer(layer_header);
    } else {
        hide_layer(layer_header);
    }
}

/*show page based on hash*/
export function displayLayers() {
    const curr_layer = location.hash.replace('#', '');
    layers_router(curr_layer);
    displayHeader();
}

function clean_JobFeed(callback) {
    console.log('clean job feed function starts')
    var parentDiv = document.getElementById('jobList-container');
    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }
    callback();
}


// connect user himself
export function watch_Someone(inputId) {
    const API_type = 'get';

    const path = `user?userId=${inputId}`
    const payload = {};
    APIcall(API_type, path, payload, (user) => {
        const my_email = user.email
        watch_user(my_email)

    })
}
function watch_user(input_email) {
    const API_type = 'put';
    const path = 'user/watch';
    const payload = {
        email: `${input_email}`,
        turnon: true
    }
    APIcall(API_type, path, payload, (data) => {
        console.log("user have watched :", data)
    })
}
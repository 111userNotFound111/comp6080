import { displayLayers } from './reveal.js';
import { signIn, registration } from './login.js';

// listen to hash change and redirect to pages
window.onhashchange = function () {
    displayLayers();
}
window.onload = function () {
    displayLayers();
}
//add loader while loading
window.addEventListener('load', function () {
    document.getElementById('loader-container').style.display = 'block';
    document.getElementById('page').style.display = 'none';
});

// hide loader ater 500ms
window.addEventListener('load', function () {
    loadingFn();
});

function loadingFn() {
    setTimeout(function () {
        document.getElementById('loader-container').style.display = 'none';
        document.getElementById('page').style.display = 'block';
    }, 500);
}


//get window side to change mainpage
window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (windowWidth < 991) {
        document.getElementById('middle-main').style.width = '100%';
        document.getElementById('sidebar-l').classList.add('d-none');
        document.getElementById('sidebar-r').classList.add('d-none');

    } else {
        document.getElementById('middle-main').style.width = '65%';
        document.getElementById('sidebar-l').classList.remove('d-none');
        document.getElementById('sidebar-r').classList.remove('d-none');
    }
});


export function hash_change(layer_name) {
    location.hash = layer_name;
}

function reloadFn() {
    location.reload();
}

// login 
document.getElementById('signIn-btn').addEventListener('click', signIn);
document.getElementById('regist-btn').addEventListener('click', () => {
    hash_change('registration'); // go to registration 
});
// start with registration 
document.getElementById('signUp-btn').addEventListener('click', registration);
document.getElementById('regist-close-btn').addEventListener('click', () => {
    hash_change('signIn'); // go to sign in from close button
});

// main page log out 
document.getElementById('logout-button').addEventListener('click', () => {
    hash_change('signIn');
})
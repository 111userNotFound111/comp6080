import {
    APIcall,
    getId
} from './main.js';
import {
    hash_change
} from './systemFn.js';
import {
    popUp_warning,
    validation_email,
    validation_name,
    validation_password
} from './warning.js';
import {
    fileToDataUrl
} from './helpers.js';
import {
    watch_Someone
} from './reveal.js';
//––––––––––––––––––––––––––––––––––––––––––––––––––––––– profile ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

let profileName = document.getElementById('profile-name');
let profileEmail = document.getElementById('profile-email');
let profileImg = document.getElementById('profile-img');
let profileId = document.getElementById('profile-id');

// input user id to get user profile
export function userFeed(userIdForFeed) {
    console.log('profile user feed starts')
    const userId = userIdForFeed;
    const API_type = 'get';
    const path = `user?userId=${userId}`
    const payload = {};
    APIcall(API_type, path, payload, (data) => {
        console.log('user data', data);
        if (data.name !== '') {
            profileName.innerHTML = data.name;
        }
        if (data.email !== '') {
            profileEmail.textContent = data.email;
        }
        if (typeof data.image !== 'undefined') {
            profileImg.src = data.image;
        } else {
            profileImg.src = 'img/default-profile-portrait.jpeg';
        }
        profileId.textContent = data.id;
    });
    let profilePreviousJobs = document.querySelectorAll('.profile-jobs-container');
    if (profilePreviousJobs.length > 0) {
    profilePreviousJobs.forEach(element => element.remove());
    }
    profileJobsFeed(userIdForFeed);
}

// –––––––––––––––––––––––––––––––––––––––––––profile jobs feed––––––––––––––––––––––––––––––––––––––
//TODO: add job feed to profile page
function profileJobsFeed(inputId) {
    console.log('profile user feed starts')
    const userId = inputId;
    const API_type = 'get';
    const path = `user?userId=${userId}`
    const payload = {};
    APIcall(API_type, path, payload, (data) => {
        data.jobs.forEach(job => {
            {
                // create job feed
                var container = document.createElement("div");
                container.classList.add("container", "d-flex", "flex-col", "profile-jobs-container");
                container.setAttribute("id", "profile-jobs");

                var profileJobs = document.createElement("div");
                profileJobs.classList.add("container", "profile-jobs");
                profileJobs.setAttribute("id", "profile-jobs-border");

                var containerRow = document.createElement("div");
                containerRow.classList.add("container", "row");

                var containerCol8 = document.createElement("div");
                containerCol8.classList.add("container", "col-8");
                containerCol8.setAttribute("id", "profile_left_side");

                var profileTitleItem = document.createElement("div");
                profileTitleItem.classList.add("profile-title-item");

                var profileTitle = document.createElement("h1");
                profileTitle.classList.add("profile-title");
                profileTitle.textContent = 'title: ' + job.title;

                var br = document.createElement("br");
                br.classList.add("profile-br");

                var profileJobsDetail = document.createElement("div");
                profileJobsDetail.classList.add("profile-jobs-detail");

                var profileJobsCreatedAt = document.createElement("p");
                profileJobsCreatedAt.setAttribute("id", "profile-jobs-createdAt");
                profileJobsCreatedAt.textContent = 'Create time: ' + job.createdAt;

                var profileJobsDescription = document.createElement("p");
                profileJobsDescription.setAttribute("id", "profile-jobs-description");
                profileJobsDescription.textContent = 'description: ' + job.description;

                var containerCol4 = document.createElement("div");
                containerCol4.classList.add("container", "col-4");
                containerCol4.setAttribute("id", "profile_right_side");

                var profileJobsImgDiv = document.createElement("div");
                profileJobsImgDiv.setAttribute("id", "profile_jobs_img_div");

                var profileJobsImg = document.createElement("img");
                profileJobsImg.setAttribute("id", "profile_jobs_img");
                if (typeof job.image !== 'undefined') {
                    profileJobsImg.setAttribute("src", job.image);
                } else {
                    profileJobsImg.setAttribute("src", "img/LurkForWork.jpg");
                }

                // append
                container.appendChild(profileJobs);
                profileJobs.appendChild(containerRow);
                containerRow.appendChild(containerCol8);
                containerCol8.appendChild(profileTitleItem);
                profileTitleItem.appendChild(profileTitle);
                profileTitleItem.appendChild(br);
                containerCol8.appendChild(profileJobsDetail);

                profileJobsDetail.appendChild(profileJobsCreatedAt);
                profileJobsDetail.appendChild(profileJobsDescription);
                containerRow.appendChild(containerCol4);
                containerCol4.appendChild(profileJobsImgDiv);
                profileJobsImgDiv.appendChild(profileJobsImg);

                // append to html
                document.getElementById('profile-job-list').appendChild(container);

            }
        });
    });
}



//======================================edit profile=====================//
function profileEdit() {
    var profileModal = new bootstrap.Modal(document.getElementById('profileModal'))
    document.getElementById('edit-profile-name').value = profileName.textContent;
    document.getElementById('edit-profile-email').value = profileEmail.textContent;
    profileModal.show();
}

document.getElementById('button-for-change-profile').addEventListener('click', () => {
    profileEdit();
});
document.getElementById('edit-profile-submit').addEventListener('click', () => {
    profileEditSubmit();
});

//======================================edit profile submit=====================//
function profileEditSubmit() {
    const API_type = 'put';
    const path = `user`
    let editProfileImg = document.getElementById('edit-profile-image');
    let editProfileName = document.getElementById('edit-profile-name');
    let editProfileEmail = document.getElementById('edit-profile-email');
    let editProfilePassword = document.getElementById('edit-profile-password');

    if (validation_email(editProfileEmail.value) == false) { //email validation
        popUp_warning('Please enter a valid email address');
    } else if (editProfileEmail.value != profileEmail.textContent) {
        APIcall(API_type, path, {
            "email": editProfileEmail.value
        }, location.reload())
    };

    if (validation_name(editProfileName.value) == false) { //name validation
        popUp_warning('Please enter a valid name');
    } else if (editProfileName.value != profileName.textContent) {
        APIcall(API_type, path, {
            "name": editProfileName.value
        }, location.reload())
    };
    if (editProfilePassword.value != '') {
        if (validation_password(editProfilePassword.value) == false) {
            popUp_warning('Please enter a valid password');
        } else {
            APIcall(API_type, path, {
                "password": editProfilePassword.value
            }, location.reload())
        }
    };
    if (editProfileImg.value != '') {
        fileToDataUrl(editProfileImg.files[0]).then((res) => APIcall(API_type, path, {
            "image": res
        }, location.reload()));
        // fileToDataUrl(jobImage).then((res) => sendPost(res));
    }
}

//======================================show followers=====================//

//callback the name of this id
function get_name_by_id(input_id, callback) {
    console.log('profile user feed starts')
    const userId = input_id;
    const API_type = 'get';
    const path = `user?userId=${userId}`
    const payload = {};
    APIcall(API_type, path, payload, (data) => {
        const getName = data.name;

        callback(getName);
    });
}

//get the followers of this id
function get_followers(input_id) {
    const userId = input_id;
    const API_type = 'get';
    const path = `user?userId=${userId}`
    const payload = {};
    APIcall(API_type, path, payload, (data) => {
        const followers = data.watcheeUserIds;
        followers.forEach(follower => {
            const followerDiv = document.createElement('div');
            followerDiv.className = 'row align-items-center justify-content-center';
            const followerName = document.createElement('p');
            followerName.className = 'col-9 nav-link ';
            followerName.addEventListener('click', () => {
                seeOtherProfile(follower);
            });
            get_name_by_id(follower, (name) => {
                followerName.textContent = follower + ': ' + name;
            });
            followerDiv.appendChild(followerName);
            document.getElementById('like-comment-body').appendChild(followerDiv);
        });
    });
}
//show the followers
function profileShowFollowers(event) {
    let Myfollowers = event.target;
    console.log('followers_cliked function starts');
    var followersModal = new bootstrap.Modal(document.getElementById('like-comment-Modal'))
    const modalLable = document.getElementById('like-comment-Modal-Label');
    modalLable.textContent = "List of followers";
    get_followers(document.getElementById('profile-id').textContent);
    followersModal.show();
}

document.getElementById('profile-show-followers').addEventListener("click", profileShowFollowers);



//======================================see other profile=====================//
export function seeOtherProfile(userIdForFeed) {
    let profileEditBtn = document.getElementById('button-for-change-profile');
    let followBtn = document.getElementById('follow-btn');
    console.log('see other profile');
    console.log(profileEditBtn.style.display);
    profileEditBtn.style.display = 'none';
    followBtn.style.display = 'block';
    hash_change('profile');
    userFeed(userIdForFeed);

}



//––––––––––––––––––––––––––––––––––––––––––––––––––––––– page features ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

/** to my profile page */
document.getElementById('my-profile').addEventListener('click', () => {
    let profileEditBtn = document.getElementById('button-for-change-profile');
    let followBtn = document.getElementById('follow-btn');
    followBtn.style.display = 'none';
    profileEditBtn.style.display = 'block';
    hash_change('profile');
    location.reload(); //reload the page
});

/** to main-page */
document.getElementById('home').addEventListener('click', () => {
    hash_change('jobFeeds');
});


document.getElementById('searchSomeone').addEventListener('click', () => {
    var searchSomeoneModal = new bootstrap.Modal(document.getElementById('searchSomeoneModal'))
    searchSomeoneModal.show();
    document.getElementById('searchSomeoneSubmit').addEventListener('click', () => {
        seeOtherProfile(document.getElementById('searchSomeoneInput').value);
        searchSomeoneModal.hide();
    });
});



//======================================follow=====================//
function check_watch_or_not(inputId, myId, callback) {
    const userId = inputId;
    const API_type = 'get';
    const path = `user?userId=${userId}`
    const payload = {};
    APIcall(API_type, path, payload, (data) => {
        const isWatching = data.watcheeUserIds.includes(myId);
        console.log('is watching value', isWatching);
        callback(isWatching);
    })
}

//TODO: follow someone
document.getElementById('follow-btn').addEventListener('click', () => {
    const inputId = document.getElementById('profile-id').textContent;
    const myId = localStorage.getItem('userId');
    check_watch_or_not(inputId, myId, (isWatching) => {
        if (isWatching) {
            console.log('watching');
            watch_Someone(document.getElementById('profile-id').textContent);
            follow_status(true);
        } else {
            console.log('not watching');
            unwatch_Someone_by_email(localStorage.getItem('user_email'));
            follow_status(false);
        }
    });
});
//if bl is true, means the user is following the profile, if bl is false, means the user is cancel following the profile
function follow_status(bl) {
    var followersModal = new bootstrap.Modal(document.getElementById('like-comment-Modal'))
    const modalLable = document.getElementById('like-comment-Modal-Label');
    if (bl) {
        modalLable.textContent = "You are following this profile";
    } else {
        modalLable.textContent = "you are not following this profile";
    }
    followersModal.show();
}

function unwatch_Someone_by_email(inputId) {
    const API_type = 'put';
    const path = 'user/watch';
    const payload = {
        "id": '',
        inputId,
        'turnon': false
    }
    APIcall(API_type, path, payload, (data) => {
        console.log("user have watched :", data.turnon)
    })
}
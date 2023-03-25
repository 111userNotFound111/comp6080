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
    fileToDataUrl
} from './helpers.js';

// convert Time 
function getTimeDifference(start, end) {
    const time_diff = Math.abs(end - start);
    const hours = Math.floor(time_diff / 3600000);
    const minutes = Math.floor((time_diff % 3600000) / 60000);
    return [hours, minutes];
};

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

function create_jobCards(job) {
    // use API to get username 
    const API_type = 'get';
    const path = `user?userId=${job.creatorId}`
    const payload = {};
    APIcall(API_type, path, payload, (user) => {
        // construct job feed card
        console.log('create job cards function begins :', job.title)
        const feed_container = document.createElement('div');
        feed_container.classList.add("card");
        // image
        const job_img = document.createElement('img');
        job_img.src = job.image;
        job_img.style.width = '80%';
        job_img.style.height = '400px';
        job_img.style.margin = 'auto';
        job_img.style.height = '400px';
        job_img.style.border = '1px solid #ddd';
        job_img.style.borderWidth = '1px';
        job_img.style.borderRadius = '7px';
        // card content
        const job_content = document.createElement('div');
        job_content.classList.add("card-0");
        //title
        const job_title = document.createElement('h5');
        job_title.classList.add("job-title");
        job_title.textContent = job.title;
        // post user name 
        const job_user = document.createElement('span');
        job_user.classList.add("job-userName")
        job_user.id = `${job.creatorId}`
        const job_user_get = user.name;
        console.log('job_user_get :', job_user_get);
        job_user.textContent = `Post by : ${job_user_get} `;

        // starting date
        const job_date = document.createElement('span');
        job_date.classList.add("job-date")
        const job_start = formatDate(new Date(job.start))
        job_date.textContent = `start date : ${job_start}`;

        //description
        const job_description = document.createElement('p');
        job_description.classList.add("job-description");
        job_description.textContent = job.description;

        // time stamp
        const time_stamp_container = document.createElement('div');
        time_stamp_container.classList.add("time-stamp")
        const time_post = new Date(job.createdAt);
        const time_now = new Date();
        const time_diff = getTimeDifference(time_now, time_post);
        if (time_diff[0] >= 24) {
            var time_diff_format = formatDate(time_post);
        } else {
            var time_diff_format = `${time_diff[0]} hours and ${time_diff[1]} minutes ago`
        }
        const time_stamp = document.createElement('span');
        time_stamp.textContent = time_diff_format;

        // comments and comments container
        const like_comments_container = document.createElement('div');
        like_comments_container.classList.add("d-flex");
        like_comments_container.classList.add("flex-row");
        like_comments_container.classList.add("fs-12");
        // likes 
        const like_div = document.createElement('div');
        console.log('display like div ', like_div)
        like_div.classList.add("like");
        like_div.classList.add("p-2");
        like_div.classList.add("cursor");
        // Like icon 
        const like_icon = document.createElement('i');
        like_icon.classList.add("fa");
        like_icon.classList.add("fa-thumbs-o-up");
        like_icon.id = `${job.id}`;
        // like text
        const like_text = document.createElement('span');
        like_text.textContent = `${job.likes.length}`
        // show likes 
        const show_like_div = document.createElement('div')
        show_like_div.classList.add("p-2");
        show_like_div.classList.add("cursor");
        const show_like_content = document.createElement('span');
        show_like_content.classList.add("show-like-btn")
        show_like_content.id = `${job.id}`;
        show_like_content.textContent = "(Show Likes)"
        // Comments
        const comments_div = document.createElement('div');
        comments_div.classList.add("comment");
        comments_div.classList.add("p-2");
        comments_div.classList.add("cursor");
        // comments icon
        const comments_icon = document.createElement('i');
        comments_icon.classList.add("fa");
        comments_icon.classList.add("fa-commenting-o");
        // comment text 
        const comments_msg = document.createElement('span');
        comments_msg.classList.add("show-comment-btn")
        comments_msg.id = `${job.id}`;
        comments_msg.textContent = `${job.comments.length} Comments`

        //comment textarea
        const job_comment_textarea = document.createElement('textarea');
        job_comment_textarea.id = `comment-textarea-${job.id}`
        job_comment_textarea.classList.add("card-comment-textarea")
        job_comment_textarea.placeholder = "Enter Comments here";
        // submit button
        const comment_submit = document.createElement('a');
        comment_submit.href = "#";
        comment_submit.id = `btn-${job.id}`
        comment_submit.classList.add("btn");
        comment_submit.classList.add("btn-primary")
        comment_submit.classList.add("submit-comment-btn")
        comment_submit.textContent = "Submit Comments";

            // Assemble 
            const main_container = document.getElementById('jobList-container')
            // likes and comments
            like_div.appendChild(like_icon);
            like_div.appendChild(like_text);
            show_like_div.appendChild(show_like_content);
            like_comments_container.appendChild(like_div);
            like_comments_container.appendChild(show_like_div);
            comments_div.appendChild(comments_icon);
            comments_div.appendChild(comments_msg);
            like_comments_container.appendChild(comments_div);
            // time stamp
            time_stamp_container.appendChild(time_stamp);
            // job contents
            job_content.appendChild(job_title);
            job_content.appendChild(job_user);
            job_content.appendChild(job_date);
            job_content.appendChild(job_description);
            job_content.appendChild(time_stamp_container);
            job_content.appendChild(like_comments_container);
            job_content.appendChild(job_comment_textarea);
            job_content.appendChild(comment_submit);
            // assemble 
            feed_container.appendChild(job_img);
            feed_container.appendChild(job_content);
            main_container.appendChild(feed_container);
        });
};


// store jobs 


// job Feed functionsdisplay_job 
function display_job(job_list) {
    console.log("display job begins", job_list)
    // this is for likes and comments 
    store_likeAndComments(job_list);

    // loading order issue HERE
    job_list.forEach((job) => {
        console.log('current job title', job.title)
        create_jobCards(job);
    })
};

function store_likeAndComments(data) {
    const job_feed_list = [];
    data.forEach((obj) => {
        const like_comments_object = {
            jobId: obj.id,
            likes: obj.likes,
            comments: obj.comments
        };
        job_feed_list.push(like_comments_object);
    })
    localStorage.setItem(`likeAndComments`, JSON.stringify(job_feed_list));
}

// two main jobFeed functions 
export function jobFeed() {
    // console.log(" job feed function begins")
    const path = 'job/feed?start=0';
    const API_type = 'get';
    const payload = {
        start: 0
    };
    APIcall(API_type, path, payload, display_job)
}


//––––––––––––––––––––––––––––––––––––––––––––––––––––––– Post Jobs ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

// job post functions 
function clear_jobPostForm(data) {
    // console.log('job post id', data)
    document.getElementById('postjob-name').value = "";
    document.getElementById('postjob-image').value = "";
    document.getElementById('postjob-date').value = "";
    document.getElementById('postjob-description').value = "";
}

function jobPost() {
    console.log(" job post function begins")
    const jobTitle = document.getElementById('postjob-name').value;
    const imgFile = document.querySelector('#postjob-image')
    const jobImage = imgFile.files[0];
    const img = imgFile.value;
    const jobDate = document.getElementById('postjob-date').value;
    const jobDescrip = document.getElementById('postjob-description').value;

    function sendPost(input_img) {
        console.log(" send post function begins")
        const path = 'job/';
        const API_type = 'post';
        const payload = {
            "title": jobTitle,
            "image": input_img,
            "start": jobDate,
            "description": jobDescrip
        };
        // clean the form after pressing submit
        APIcall(API_type, path, payload, clear_jobPostForm);
    };

    if (jobTitle.trim() == '' || img == '' || jobDate == '' || jobDescrip.trim() == '') {
        popUp_warning("Please fill out ALL the sections")
    } else {
        fileToDataUrl(jobImage).then((res) => sendPost(res));
    };
}


document.getElementById('postJob-btn').addEventListener('click',jobPost)

// Post Job Modal starts here
function clearJobPost_modal(data) {
    // clean modal 
    document.getElementById('postjob-modal-name').value = "";
    document.getElementById('postjob-modal-image').value = "";
    document.getElementById('postjob-modal-date').value = "";
    document.getElementById('postjob-modal-description').value = "";
}

function Modal_postJob() {
    const jobTitle = document.getElementById('postjob-modal-name').value;
    const imgFile = document.querySelector('#postjob-modal-image')
    const jobImage = imgFile.files[0];
    const img = document.getElementById('postjob-modal-image').value;
    const jobDate = document.getElementById('postjob-modal-date').value;
    const jobDescrip = document.getElementById('postjob-modal-description').value;
    const feedMsg = document.getElementById('postjob-modal-warning');
    feedMsg.style.display = 'none';
    console.log('feedMsg is :', feedMsg.textContent)

    // 
    function sendPost(input_img) {
        console.log(" job post function begins")
        const path = 'job/';
        const API_type = 'post';
        const payload = {
            "title": jobTitle,
            "image": input_img,
            "start": jobDate,
            "description": jobDescrip
        };
        // clean the form after pressing submit
        APIcall(API_type, path, payload, clearJobPost_modal);

    };
    if (jobTitle.trim() == '' || img == '' || jobDate == '' || jobDescrip.trim() == '') {
        feedMsg.textContent = "Please Fill Out All Sections"
        feedMsg.style.display = 'block';
    } else {
        feedMsg.textContent = "New Job Post Submitted"
        feedMsg.style.display = 'block';
        fileToDataUrl(jobImage).then((img) => sendPost(img));
    };
}

document.getElementById('postJobs-btn').addEventListener('click', () => {
    console.log('post job clicked')
    const jobPost_Modal = document.getElementById('postJob-Modal')
    var jobPost_create = new bootstrap.Modal(jobPost_Modal)
    jobPost_create.show()

    document.getElementById('postjob-modal-btn').addEventListener('click', Modal_postJob)
    // reset modal upon exit 
    document.addEventListener("click", function (event) {
        if (event.target !== jobPost_Modal && !jobPost_Modal.contains(event.target)) {
            clearJobPost_modal();
            document.getElementById('postjob-modal-warning').style.display = 'none'
        }
    });
})








//––––––––––––––––––––––––––––––––––––––––––––––––––––––– likes ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

function get_likes(input_id) {
    const like_comments = localStorage.getItem('likeAndComments');
    const like_comments_data = JSON.parse(like_comments);
    like_comments_data.forEach((obj) => {
        if (obj.jobId == input_id) {
            const like_obj = obj.likes;
            like_obj.forEach((data) => {
                // construct DOM for modal 
                const like_user = document.createElement('p');
                like_user.classList.add("like-user-btn")
                // assign id to the p tag when clicked, get id for clicking to profile
                like_user.id = `${data.userId}`
                like_user.textContent = `${data.userName} (email: ${data.userEmail})`

                const like_comment_body = document.getElementById('like-comment-body');
                like_comment_body.appendChild(like_user);
            })
        }
    })
    // const  like_comments_string = JSON.parse( like_comments);
    // console.log(like_comments_string);
}
//––––––––––––––––––––––––––––––––––––––––––––––––––––––– show like  ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

function show_like(event) {
    let showLike_btn = event.target;
    console.log('show like_cliked function starts');
    if (showLike_btn.classList.contains('show-like-btn') && showLike_btn.tagName == 'SPAN') {
        var testModal = new bootstrap.Modal(document.getElementById('like-comment-Modal'))
        const modalLable = document.getElementById('like-comment-Modal-Label');
        modalLable.textContent = "List of Liked Users";
        console.log(showLike_btn.id);
        get_likes(showLike_btn.id);
        testModal.show();
    }
}
document.getElementById('jobList-container').addEventListener("click", show_like)
//––––––––––––––––––––––––––––––––––––––––––––––––––––––– press like button ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
function send_like(event) {
    let send_like_btn = event.target;
    console.log('like cliked function starts');
    if (send_like_btn.classList.contains('fa-thumbs-o-up') && send_like_btn.tagName == 'I') {
        send_like_btn.style.color = '#FFCCCB';
        const job_id = send_like_btn.id;
        const API_type = 'put'
        const path = 'job/like'
        const payload = {
            id: job_id,
            turnon: true
        }
        APIcall(API_type, path, payload, (data) => {
            console.log("like send", data)
        })
    }

}

document.getElementById('jobList-container').addEventListener("click", send_like)

//––––––––––––––––––––––––––––––––––––––––––––––––––––––– Show Comments ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
function get_comments(input_id) {
    console.log('get comments starts');
    const like_comments = localStorage.getItem('likeAndComments');
    const like_comments_data = JSON.parse(like_comments);
    like_comments_data.forEach((obj) => {
        if (obj.jobId == input_id) {
            console.log('clicked', obj.comments)
            const comment_obj = obj.comments;
            comment_obj.forEach((data) => {
                // construct DOM for modal 
                const userId = data.userId;
                const comment_container = document.createElement('div');
                const comment_group = document.createElement('ul');
                comment_group.classList.add('list-group');
                comment_group.id = "comment-list";
                // comment user 
                const comment_title = document.createElement('li');
                comment_title.classList.add('list-group-item');
                const comment_user = document.createElement('h6');
                comment_user.textContent = `User: ${data.userName}`;
                comment_user.classList.add("comment-user-btn");
                comment_user.id = `${data.userId}`;
                // comment text
                const comment_content = document.createElement('li');
                comment_content.textContent = `${data.comment}`;
                comment_content.classList.add('list-group-item');
                comment_content.id = 'comment-content';
                // assemble
                comment_title.append(comment_user);
                comment_group.appendChild(comment_title);
                comment_group.appendChild(comment_content);
                const like_comment_body = document.getElementById('like-comment-body');
                like_comment_body.appendChild(comment_group);
            })
        }
    })
    // const  like_comments_string = JSON.parse( like_comments);
    // console.log(like_comments_string);
}

function comment_clicked(event) {
    let like_btn = event.target;
    console.log('comment_clicked function starts');
    if (like_btn.classList.contains('show-comment-btn') && like_btn.tagName == 'SPAN') {
        var testModal = new bootstrap.Modal(document.getElementById('like-comment-Modal'))
        const modalLable = document.getElementById('like-comment-Modal-Label');
        modalLable.textContent = "List of Comments";
        get_comments(like_btn.id);
        testModal.show();
    }
}
document.getElementById('jobList-container').addEventListener("click", comment_clicked)

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Send Comments ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

// global variable for storing comment message pass to 
let comment_message = ""

function store_commentMsg(event) {
    console.log('storing comment msg')
    const comment_textarea = event.target
    if (comment_textarea.classList.contains("card-comment-textarea") && comment_textarea.tagName == 'TEXTAREA') {
        comment_message = comment_textarea.value;
        console.log('typing content :', comment_message)
    }
}

document.getElementById('jobList-container').addEventListener("keydown", store_commentMsg)

function send_comments(event) {
    event.preventDefault();
    const comment_btn = event.target
    if (comment_btn.classList.contains("submit-comment-btn") && comment_btn.tagName == 'A') {
        let job_id_className = comment_btn.id
        let job_id = job_id_className.slice(4);
        const API_type = 'post'
        const path = 'job/comment'
        const payload = {
            id: job_id,
            comment: comment_message
        }
        APIcall(API_type, path, payload, (data) => { })
        document.getElementById(`comment-textarea-${job_id}`).value = "";
    }
}

document.getElementById('jobList-container').addEventListener("click", send_comments)

//––––––––––––––––––––––––––––––––––––––––––––––––––––––– clean repeated value Modal ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

function clean_Modal(event) {
    const like_comment_modal = document.getElementById('like-comment-Modal')
    const modal_close_btn = document.getElementById('like-comment-Modal-close')
    if (event.target == like_comment_modal || event.target == modal_close_btn) {
        console.log("cleaning the modal")
        var parentDiv = document.getElementById('like-comment-body');
        while (parentDiv.firstChild) {
            parentDiv.removeChild(parentDiv.firstChild);
        }
    }
}

document.getElementById('like-comment-Modal').addEventListener("click", clean_Modal)


import './importFile.js';
import {
    popUp_warning
} from './warning.js';

//TODO: 统一命名格式，用驼峰命名法或者下划线命名法，不要用混合的
//profile的jobs需要导入
//main page 的jobs有错误，需要debug 
//关注，取消关注按钮还没完成
//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––– User Information –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

// get user id and token  get_user_info
function getUserInfo() {
    const user_info = localStorage.getItem('user_info');
    const user_info_data = JSON.parse(user_info);
    return user_info_data;
}

// get token only
function getToken() {
    const user_token = getUserInfo().token;
    return user_token;
}

// get userId only
export function getId() {
    const user_id = getUserInfo().userId;
    const user_id_data = user_id.toString();
    return user_id_data;
}


//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Call Different API ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//


// method : post || get || put || delete
export function APIcall(method, path, payload, input_func) {
    var options = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    if (localStorage.getItem('user_info')) {
        const token = getToken();
        options.headers.Authorization = `Bearer ${token}`;
    };

    if (method != 'get') {
        options.body = JSON.stringify(payload);
        if (method == 'post') {
            options.method = 'POST';
        } else if (method == 'put') {
            options.method = 'PUT';
        } else if (method == 'delete') {
            options.method = 'DELETE';
        }
    };


    fetch('http://localhost:5005/' + path, options)
        .then(response => response.json())
        .then((data) => {
            if (data.error) {
                console.log('error is ', data.error)
                popUp_warning(data.error);
            } else {
                input_func(data);
            }
        });

}


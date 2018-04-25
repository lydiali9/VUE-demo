import axios from 'axios';

let postHttp = function (url, data, fn) {
    axios.post(url, data, {
        headers: {
            'token': getCookie("token"),
            'user': getCookie('user')
        },
        // withCredentials: true
    }).then(function (response) {
        // console.log(response.data);
        let data = response.data;
        //服务器判断未登录，则跳转登录界面
        if (data && data.code == "102") {
            //内网：'/SDK/piecms/#/login' 外网：'/SDK/opencms/#/login'
            window.location.href = window.location.origin + process.env.SOURCE_URL+ '/#/login';
            // window.location.href = window.location.origin + '/SDK/opencms/#/login';
        } else {
            fn(data);
        }
    }).catch(function (error) {
        console.log(error);
    });
};

let postHttpPromise = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            headers: {
                'token': getCookie("token"),
                'user': getCookie('user')
            },
            timeout: 30000,
        }).then((response) => {
            let data = response.data;
            if (data && data.code == "102") {
                window.location.href = window.location.origin + process.env.SOURCE_URL+ '/#/login';
            } else {
                resolve(response);
            }
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
};

//获取cookie、
let getCookie = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (unescape(arr[2]));
    else
        return null;
};

const request = {
    //发送请求
    post: function (url, data, fn) {
        postHttp(url, data, fn);
    },
    postPromise: postHttpPromise,
};

export default request

/**
 * Created by yuhua.li on 2018.6.25
 */
import axios from 'axios';

let post = (url, data) => {
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
}

const request = {
    //发送请求
    post: post
}

export default request
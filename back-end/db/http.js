//网络请求类
let request = require('request');

module.exports = {

    //执行get网络请求
    get (url, fn) {
        request(url, (err, rsp, body) => {
            fn(err, rsp, body);
        });
    },

    //执行post网络请求
    post (url, body, fn) {
        var options = {
            url: url,
            headers: {
                'User-Agent': 'request',
                'content-type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(body)
        };
        request(options, (err, rsp, body) => {
            fn(err, rsp, body);
        });
    },

    //Apollo配置管理--添加
    nameSpaceCreat(url, token, body, fn){
        var options = {
            url: url,
            headers: {
                'User-Agent': 'request',
                'content-type': 'application/json;charset=UTF-8',
                'Authorization': token,
            },
            body: JSON.stringify(body)
        };
        request.post(options, function (error, response, body) {
                if (error) {
                    return console.error('Apollo failed:', error);
                }
                fn(error, response, JSON.parse(body));
            });
    },

    //Apollo配置管理--添加
    configManager(url, token, body, fn){
        var options = {
            url: url,
            headers: {
                'User-Agent': 'request',
                'content-type': 'application/json;charset=UTF-8',
                'Authorization': token,
            },
            body: JSON.stringify(body)
        };
        request.post(options, function (error, response, body) {
                if (error) {
                    return console.error('Apollo failed:', error);
                }
                fn(error, response, JSON.parse(body));
            });
    },

    //Apollo配置管理--更新
    configManagerPut(url, token, body, fn){
        var options = {
            url: url,
            headers: {
                'User-Agent': 'request',
                'content-type': 'application/json;charset=UTF-8',
                'Authorization': token,
            },
            body: JSON.stringify(body)
        };
        request.put(options, function (error, response, body) {
                if (error) {
                    return console.error('Apollo failed:', error);
                }
                fn(error, response, body);
            });
    },

    //Apollo配置管理--删除
    configManagerDel(url, token, body, fn){
        var options = {
            url: url,
            headers: {
                'User-Agent': 'request',
                'content-type': 'application/json;charset=UTF-8',
                'Authorization': token,
            },
            body: JSON.stringify(body)
        };
        request.del(options, function (error, response, body) {
                if (error) {
                    return console.error('Apollo failed:', error);
                }
                fn(error, response, body);
            });
    },

};

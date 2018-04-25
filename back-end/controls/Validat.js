/**
 * 验证业务处理
 * @type {es}
 */
let query = require('../db/query');
let keys = require('../db/keys');
let $api = require('../api');

module.exports = {

    //验证请求信息
    validat (req, res, next) {

        //登陆，菜单，验证。。。。等请求不校验
        // if (req.originalUrl == $api.login || req.originalUrl == $api.menuList || req.method == "OPTIONS" || req.originalUrl == $api.newsImgUpload) {
            next();
        // } else {
        //     // console.log("请求token: " + req.headers.token);
        //     //如果没有登录用户则初始化登录列表（有可能是服务器挂了）
        //     if (Object.keys($session_catch.list).length < 1) {
        //         $session_catch.init(function () {
        //             //查看登陆状态
        //             let session = $session_catch.get(req.headers.token);
        //             //防止伪造cookie登录
        //             if (session && session.user == req.headers.user) {
        //                 next();
        //             } else {
        //                 // console.log("用户未登录");
        //                 // $session_catch.log();
        //                 res.json({code: 102, msg: '未登录', data: ""})
        //             }
        //         });
        //     } else {
        //         //查看登陆状态
        //         let session = $session_catch.get(req.headers.token);
        //         //防止伪造cookie登录
        //         if (session && session.user == req.headers.user) {
        //             next();
        //         } else {
        //             // console.log("用户未登录");
        //             // $session_catch.log();
        //             res.json({code: 102, msg: '未登录', data: ""})
        //         }
        //     }
        // }
    },
};


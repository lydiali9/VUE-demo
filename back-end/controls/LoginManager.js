/**
 * 登陆业务处理
 * @type {es}
 */
let query = require('../db/query');
let keys = require('../db/keys');
let async = require('async');

module.exports = {

    //登陆
    login(req, res) {
        let body = req.body;
        let async_list = [];
        let user = {
            user: "",
            isLogin: false,
            menu_limit: {},
            product_limit: [],
            source_limit: [],
            token: ""
        }
        //检查用户密码
        let check_user = function (callback) {
            query.sqlQuery(keys.sql.login, [body.user, body.password], function (err, rows) {
                if (rows && rows.length > 0) {
                    callback("", rows[0]);
                } else {
                    callback(Object.assign($code.USERNAME_PASSWORD_ERR, {data: ""}), rows);
                }
            })
        }
        async_list.push(check_user);

        //查询权限列表
        let query_limit = function (data, callback) {
            let group = JSON.parse(data.group);
            let sqlStr = keys.sql.login_limit;
            let sqlArr = [];
            user.user = data.name;
            user.isLogin = true;
            user.token = $md5(data.name + new Date().getTime());
            group.forEach(function (item, index) {
                sqlStr += (index == group.length - 1 ? "?)" : "?,");
                sqlArr.push(item);
            })
            query.sqlQuery(sqlStr, sqlArr, function (err, rows) {
                if (rows && rows.length > 0) {
                    callback("", rows);
                } else {
                    callback({code: $code.USERNAME_PASSWORD_ERR, msg: err, data: ""}, "");
                }
            })
        }
        async_list.push(query_limit);

        //查询菜单列表
        let query_menu = function (data, callback) {
            let menu_limit = [];
            let product_limit = [];
            let source_limit = [];
            data.forEach(d => {
                menu_limit = menu_limit.concat(JSON.parse(d.menu_limit));
                product_limit = product_limit.concat(JSON.parse(d.product_limit));
                source_limit = source_limit.concat(JSON.parse(d.source_limit));
            })
            menu_limit = menu_limit.unique(menu_limit);
            user.product_limit = user.product_limit.unique(product_limit);
            user.source_limit = user.source_limit.unique(source_limit);

            let sqlStr = keys.sql.login_menu_limit;
            let sqlArr = [];
            menu_limit.forEach(function (item, index) {
                sqlStr += (index == menu_limit.length - 1 ? "?)" : "?,");
                sqlArr.push(item);
            })
            sqlStr += 'ORDER BY ? DESC';
            sqlArr.push('weight');

            query.sqlQuery(sqlStr, sqlArr, function (err, rows) {
                callback(err, rows);
            })
        }
        async_list.push(query_menu);

        //组装权限json
        let piece_menu = function (data, callback) {
            let router = {};
            data.forEach(function (item) {
                switch (item.type) {
                    case 0:
                        router[item.group] = {
                            name: item.name
                        };
                        break;
                    case 1:
                        if (!router[item.group]) {
                            router[item.group] = {};
                        }
                        router[item.group][item.page] = {
                            name: item.name,
                            router: item.router
                        };
                        break;
                    case 2:
                        if (!router[item.group]) {
                            router[item.group] = {};
                        }
                        if (!router[item.page]) {
                            router[item.group][item.page] = {};
                        }
                        router[item.group][item.page][item.num] = {
                            name: item.name
                        };
                        break;
                }
            })
            callback("", router);
        }
        async_list.push(piece_menu);

        //缓存登录信息
        let cache_info = function (data, callback) {
            user.menu_limit = data;
            $session_catch.add({
                id: user.token,
                user: user.user,
                time: new Date().getTime()
            });
            callback("", user);
        }
        async_list.push(cache_info);

        async.waterfall(async_list, function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json({code: $code.SUCCESS, msg: "登录成功！", data: result});
            }
        })
    },

    //退出登陆
    logout(req, res) {
        //删除登录信息
        if (req.header.token) {
            $session_catch.del(req.header.token);
        }
        //清除session，cookie
        req.session.destroy(function () {
            res.clearCookie("user", {});
            res.cookie("isLogin", "false");
            res.redirect("/");
        });
        res.json({code: $code.SUCCESS, msg: '退出登陆', data: ""});
    }
};


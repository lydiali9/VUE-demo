/**
 * 配置数据业务处理
 * @type {es}
 */
let query = require('../db/query');
let keys = require('../db/keys');
let async = require('async');
let sql_tool = require('../utils/sql-tool');
let redis = require('../utils/redis-cluster');
var eurekaUtils = require('../utils/eureka-utils');
var rp = require('request-promise');

module.exports = {

    fetchSC: function(req, res){
        var bookmarkServer = eurekaUtils.getBookmarkRootUrl(req.eurekaClient);
        console.log("bookmarkServer: " + bookmarkServer);

        var options = {
            method: 'POST',
            uri: bookmarkServer +'/user_daily',
            body: {
                "startTime": "2018-01-31",
                "endTime": "2018-03-12",
                "product_id": "ali",
                "content_type": "all",
                "scenario": "",
                "strategy": "all",
                "app_ver": ""
            },
            json: true // Automatically stringifies the body to JSON
        };

        rp(options)
            .then(function (parsedBody) {
                console.log(parsedBody);
                res.json({code: 200, msg: 'SC test ok'});
            })
            .catch(function (err) {
                console.log(err);
                res.json({code: 101, msg: 'SC test post Error:' + err});
            });
    },
    //获取用户列表
    get(req, res) {
        let body = req.body;
        if (body.type || body.type === 0) {
            let sqlStr = "";
            switch (body.type) {
                case 0:
                    sqlStr = keys.sql.user_get;
                    break;
                case 1:
                    sqlStr = keys.sql.user_group_get;
                    break;
                case 2:
                    sqlStr = keys.sql.user_menu_get;
                    break;
                default:
                    res.json({code: $code.REQUEST_DATA_ERR, msg: 'type类型不正确！', data: ""});
                    return;
            }
            query.sqlQuery(sqlStr, [], function (err, rows) {
                //处理数据格式
                if (rows && rows.length > 0) {
                    switch (body.type) {
                        case 0:
                            rows.forEach(function (val) {
                                val.create_time = new Date(val.create_time).getTime();
                                val.login_time = new Date(val.login_time).getTime();
                            })
                            break;
                        case 1:
                            rows.forEach(function (val) {
                                val.create_time = new Date(val.create_time).getTime();
                            })
                            break;
                        case 2:
                            break;
                    }
                }
                res.json({code: $code.SUCCESS, msg: err, data: rows});
            })
        } else {
            res.json({code: $code.REQUEST_DATA_ERR, msg: '请求参数缺少type字段！', data: ""});
        }
    },

    //添加菜单
    add_menu(req, res) {
        let body = req.body;
        if ((body.type || body.type === 0) && body.name && body.group) {
            query.sqlQuery(keys.sql.user_menu_add, [body.type, body.group, body.page, body.num, body.router, body.name, body.weight, body.des], function (err, rows) {
                if (err) {
                    res.json({code: $code.FALSE, msg: err, data: ""});
                } else {
                    res.json({code: $code.SUCCESS, msg: '添加成功！', data: ""});
                }
            })
        } else {
            res.json({code: $code.REQUEST_DATA_ERR, msg: '请求数据不完整！', data: ""});
        }
    },

    //添加用户
    add_user(req, res) {
        let body = req.body;
        if (body.name && body.group && body.password) {
            let async_list = [];
            //查看是否存在相同的用户名
            let check_name = function (callback) {
                query.sqlQuery(keys.sql.user_check_same_name, [body.name], function (err, rows) {
                    if (err) {
                        res.json({code: $code.FALSE, msg: err, data: ""});
                    } else {
                        if (rows && rows.length > 0) {
                            callback("存在相同用户名!", "")
                        } else {
                            callback("", "")
                        }
                    }
                })
            }
            async_list.push(check_name);

            //存入数据库
            let insert_user = function (data, callback) {
                if (body.group instanceof Array) {
                    body.group = JSON.stringify(body.group);
                }
                query.sqlQuery(keys.sql.user_add, [body.group, body.name, body.password, body.des, new Date()], function (err, rows) {
                    callback(err, rows);
                })
            }
            async_list.push(insert_user);

            async.waterfall(async_list, function (err, result) {
                if (err) {
                    res.json({code: $code.FALSE, msg: err, data: ""});
                } else {
                    res.json({code: $code.SUCCESS, msg: "添加用户成功！", data: ""});
                }
            })

        } else {
            res.json({code: $code.REQUEST_DATA_ERR, msg: '请求数据不完整！', data: ""});
        }
    },

    //添加组
    add_group(req, res) {
        let body = req.body;
        if (body.name && body.menu_limit && body.product_limit) {
            body.menu_limit = JSON.stringify(body.menu_limit);
            body.product_limit = JSON.stringify(body.product_limit);
            query.sqlQuery(keys.sql.user_group_add, [body.name, body.menu_limit, body.product_limit, new Date()], function (err, rows) {
                if (err) {
                    res.json({code: $code.FALSE, msg: err, data: ""});
                } else {
                    res.json({code: $code.SUCCESS, msg: '添加成功！', data: ""});
                }
            })
        } else {
            res.json({code: $code.REQUEST_DATA_ERR, msg: '请求数据不完整！', data: ""});
        }
    },


    //更新用户
    update_user(req, res) {
        let body = req.body;

        if (body.id && body.name && body.group && body.password) {
            let async_list = [];
            //查看是否存在相同的用户名
            let check_name = function (callback) {
                query.sqlQuery(keys.sql.user_check_same_name, [body.name], function (err, rows) {
                    if (err) {
                        res.json({code: $code.FALSE, msg: err, data: ""});
                    } else {
                        if (rows && rows.length > 0) {
                            callback("已存在相同用户名!", "")
                        } else {
                            callback("", "")
                        }
                    }
                })
            }
            async_list.push(check_name);

            let update = function (data, callback) {
                body.group = JSON.stringify(body.group);
                query.sqlQuery(keys.sql.user_update, [body.group, body.name, body.password, body.des, body.id], function (err, rows) {
                    callback(err, rows)
                })
            }
            async_list.push(update);

            async.waterfall(async_list, function (err, result) {
                if (err) {
                    res.json({code: $code.FALSE, msg: err, data: ""});
                } else {
                    res.json({code: $code.SUCCESS, msg: "更新用户数据成功！", data: ""});
                }
            })
        } else {
            res.json({code: $code.REQUEST_DATA_ERR, msg: '请求数据不完整！', data: ""});
        }
    },


    //更新用户组
    update_user_group(req, res) {
        let body = req.body;

        if (body.id && body.name && body.menu_limit && body.product_limit) {
            body.menu_limit = JSON.stringify(body.menu_limit);
            body.product_limit = JSON.stringify(body.product_limit);
            query.sqlQuery(keys.sql.user_group_update, [body.name, body.menu_limit, body.product_limit, body.id], function (err, rows) {
                if (err) {
                    res.json({code: $code.FALSE, msg: err, data: ""});
                } else {
                    res.json({code: $code.SUCCESS, msg: "更新用户组数据成功！", data: ""});
                }
            })
        } else {
            res.json({code: $code.REQUEST_DATA_ERR, msg: '请求数据不完整！', data: ""});
        }
    },


    //更新菜单
    update_menu(req, res) {
        let body = req.body;
        if (body.id && body.type && body.group && body.name && (body.weight || body.weight == 0)) {
            query.sqlQuery(keys.sql.user_menu_update, [body.type, body.group, body.page, body.num, body.router, body.name, body.weight, body.id], function (err, rows) {
                if (err) {
                    res.json({code: $code.FALSE, msg: err, data: ""});
                } else {
                    res.json({code: $code.SUCCESS, msg: "更新菜单数据成功！", data: ""});
                }
            })
        } else {
            res.json({code: $code.REQUEST_DATA_ERR, msg: '请求数据不完整！', data: ""});
        }
    },

    //删除用户
    del(req, res) {
        let body = req.body;
        if (body.id && (body.type || body.type === 0)) {
            let sqlStr = "";
            switch (body.type) {
                case 0:
                    sqlStr = keys.sql.user_del;
                    break;
                case 1:
                    sqlStr = keys.sql.user_group_del;
                    break;
                case 2:
                    sqlStr = keys.sql.user_menu_del;
                    break;
                default:
                    res.json({code: $code.REQUEST_DATA_ERR, msg: 'type类型不正确！', data: ""});
                    return;
            }
            query.sqlQuery(sqlStr, [body.id], function (err, rows) {
                res.json({code: $code.SUCCESS, msg: err, data: rows});
            })
        } else {
            res.json({code: $code.REQUEST_DATA_ERR, msg: '请求参数缺少type或id字段！', data: ""});
        }
    }
};


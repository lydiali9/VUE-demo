/**
 * 缓存服务器登陆信息
 */
var $redisUtil = require('../utils/redis-cluster');
let keys = require('../db/keys');

let session_catch = {

    list: {},

    init: function (fn) {
        let self = this;
        $redisUtil.zrevrangebyscore(keys.redis.login_list, '+inf', '-inf', 0, 200, function (err, re) {
            if (re && re.length > 0) {
                re.forEach(function (val) {
                    let user = JSON.parse(val);
                    self.list[user.id] = user;
                    // console.log("登录用户："+JSON.stringify(user));
                })
            }
            fn();
        })
    },

    add: function (token) {
        this.list[token.id] = token;
        let score = Math.floor(new Date().getTime() / 1000);
        console.log("用户登录："+JSON.stringify(token));
        $redisUtil.zadd(keys.redis.login_list, score, JSON.stringify(token), (err, result) => {
            if (err) {
                // res.json({code: 101, msg: "fail", data: err.toString()});
            } else {
                // res.json({code: 200, msg: "success", data: ""});
            }
        });
    },

    del: function (token) {
        $redisUtil.zrem(keys.redis.login_list, token, function (err, r) {
            if (err) {
                res.json({code: 101, msg: "fail", data: err.toString()});
            } else {
                res.json({code: 200, msg: "success", data: ""});
            }
        });
        delete this.list[token.id];
    },

    get: function (sid) {
        return this.list[sid];
    },

    log: function () {
        console.log(this.list);
    },

    //清除到期登录信息
    clear: function () {
        //有效期为3天
        let self = this;
        let time = 3 * 24 * 60 * 60 * 1000;
        // let time = 30 * 1000;
        let now = new Date().getTime();
        let key = Object.keys(self.list);
        key.forEach(function (val) {
            if (now - self.list[val].time > time) {
                console.log("登录过期：" + self.list[val].user);
                $redisUtil.zrem(keys.redis.login_list, JSON.stringify(self.list[val]), function (err, r) {
                    if (err) {
                        // res.json({code: 101, msg: "fail", data: err.toString()});
                    } else {
                        // res.json({code: 200, msg: "success", data: ""});
                    }
                });
                delete self.list[val];
            }
        })
    }
}

module.exports = session_catch;
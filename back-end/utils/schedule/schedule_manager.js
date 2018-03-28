var schedule = require("node-schedule");
var keys = require('../../db/keys');
let query = require('../../db/query');
let async = require('async');
var apollo = require('../../db/apollo');
let redis = require('../redis-cluster');
var insert_clear;//强插资讯清理任务

//redis清理逻辑
let clear_insert = function () {
    //获取media_ids
    //获取scenario
}

const schedule_manager = {
    //执行强插清理
    execute_insert_clear: function () {
        //设定执行周期（每10分钟执行一次）
        var rule = new schedule.RecurrenceRule();
        // rule.dayOfWeek = 2;
        // rule.month = 3;
        // rule.dayOfMonth = 1;
        // rule.hour = 1;
        rule.minute = [1, 11, 21, 31, 41, 51];
        // rule.second = [1];
        insert_clear = schedule.scheduleJob(rule, function () {

            let async_list = [];
            //组装key列表
            let key = keys.redis.force_insert;
            //获取media_id列表
            let action1 = new Date().getTime();

            //获取public配置
            let getPublicConfig = function (callback) {
                apollo.getPublicConfig(function (err, data) {
                    callback(err, data);
                })
            }
            async_list.push(getPublicConfig);

            //组装配置
            let initConfigData = function (data, callback) {
                for (var p in data) {
                    data[p] = JSON.parse(data[p]);
                }
                callback("", data);
            }
            async_list.push(initConfigData);


            //获取cms配置
            let getCMSConfig = function (p_data, callback) {
                apollo.getCmsConfig(function (err, c_data) {
                    callback(err, p_data, c_data);
                })
            }
            async_list.push(getCMSConfig);

            //处理scenario获取所有强插的key
            let initCmsConfig = function (p_data, c_data, callback) {
                for (var q in c_data) {
                    c_data[q] = JSON.parse(c_data[q]);
                }
                let redisKeys = [];
                //遍历media_id
                p_data.media_id.forEach(function (meidaId) {
                    //遍历scenario_type
                    c_data.scenario.forEach(function (scenarioData) {
                        scenarioData.position.forEach(function (positionData) {
                            //组装强插key
                            let redisKey = key + parseInt(meidaId.id, 16) + "_" + parseInt(scenarioData.position_type + positionData.value.substring(2), 16);
                            redisKeys.push(redisKey);
                        })
                    })
                })
                callback("", redisKeys);
            }
            async_list.push(initCmsConfig);

            //清理redis过期强插
            let clearRedis = function (keys, callback) {
                //查询每个key下面的强插内容(前200条)，如果已经过期，则删除这条内容
                async.each(keys, function (key, cb) {
                    redis.zrevrangebyscore(key, '+inf', '-inf', 0, 200, function (err, re) {
                        if (re && re.length > 0) {
                            async.each(re, function (item, c) {
                                let d = JSON.parse(item);
                                //判断是否过期
                                if (new Date(d.time).getTime() < new Date().getTime()) {
                                    console.log("删除redis过期强插：" + item);
                                    redis.zrem(key, item, function (e, res) {
                                        c(e, res);
                                    });
                                } else {
                                    c("", "");
                                }
                            }, function (e) {
                                cb("", "");
                            })
                        } else {
                            cb(err, re)
                        }
                    })
                }, function (err) {
                    callback(err, keys);
                })
            }
            async_list.push(clearRedis);

            //处理数据库可强插资讯
            let mysqlInsertRedis = function (key_list, callback) {
                let insert_list = [];//可执行的强插
                //查看数据库里面是否有强插可执行
                query.sqlQuery(keys.sql.listInsertStr, [], function (err, result) {
                    if (result) {
                        result.forEach(function (val) {
                            let start = new Date(val.start_time).getTime();
                            let end = new Date(val.end_time).getTime();
                            let now = new Date().getTime();
                            //如果强插时间到了
                            if (now > start && end > now) {
                                insert_list.push(val);
                            }
                        })
                    }
                    callback("", insert_list);//如果查询出错，流程继续
                })
            }
            async_list.push(mysqlInsertRedis);

            //执行强插
            let insert = function (insert_list, callback) {

                async.each(insert_list, function (item, cb) {
                    let key = keys.redis.force_insert;
                    key = key + parseInt(item.media_id, 16) + "_" + parseInt(item.scenario, 16);
                    let score = Math.floor(new Date().getTime() / 1000);
                    let value = {
                        "id": item.content_id,
                        "insert_time": new Date().getTime(),
                        "start_time": new Date(item.start_time).getTime(),
                        "time": new Date(item.end_time).getTime(),//过期时间
                        "user": item.user
                    };
                    console.log("给：" + item.content_id + " 执行强插。")
                    redis.zadd(key, score, JSON.stringify(value), (e, r) => {
                        if (e) {
                            cb(e, r)
                        } else {
                            //插入成功后，更改数据库状态
                            query.sqlQuery(keys.sql.updateInsertStatusStr, ["0", item.id], function (err, result) {
                                cb(err, result)
                            })
                        }
                    });
                }, function (err) {
                    //查询在线的数据(存在强插失败，也要执行剩下的流程)
                    query.sqlQuery(keys.sql.listInsertByStatusStr, ["0"], function (err, result) {
                        callback(err, result)
                    })
                })
            }
            async_list.push(insert);


            //处理mysql生效的数据
            let clearMysql = function (on_list, callback) {
                async.each(on_list, function (item, cb) {
                    //是否过期
                    if (new Date().getTime() > new Date(item.end_time).getTime()) {
                        //更改数据库状态
                        query.sqlQuery(keys.sql.updateInsertStatusStr, ["2", item.id], function (err, result) {
                            cb(err, result)
                        })
                    } else {
                        cb("", "");
                    }
                }, function (err) {
                    //查询过期的数据(存在强插失败，也要执行剩下但流程)
                    query.sqlQuery(keys.sql.listInsertByStatusStr, ["2"], function (err, result) {
                        callback(err, result)
                    })
                })
            }
            async_list.push(clearMysql);


            //处理mysql过期的数据
            let clearMysql2 = function (off_list, callback) {
                let time = 7 * 24 * 60 * 60 * 1000;//7天
                async.each(off_list, function (item, cb) {
                    //是否超过7天
                    if (new Date().getTime() - new Date(item.end_time).getTime() > time) {
                        //删除
                        query.sqlQuery(keys.sql.delInsertStr, [item.id], function (err, result) {
                            cb(err, result)
                        })
                    } else {
                        cb("", "");
                    }
                }, function (err) {
                    callback(err, "")
                })
            }
            async_list.push(clearMysql2);

            async.waterfall(async_list, function (err, result) {

                let action2 = new Date().getTime();
                console.log("定时任务耗时：" + (action2 - action1) + "毫秒。 err = " + err);
            })

            //清理redis过期的登录用户
            $session_catch.clear();
        });
    },

    //结束定时任务
    stop_insert_clear: function () {
        if (insert_clear) {
            insert_clear.cancel();
        }
    },
}

module.exports = schedule_manager

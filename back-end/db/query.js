let config = require('./config');
let mysql = require('mysql');
let amqp = require('amqplib/callback_api');
var when = require('when');
let elasticsearch = require('elasticsearch');
//网络请求类
let request = require('request');
let pool = "";
//初始化es
let client = "";
//内容组数据处理
let rabbit_connect = "";

config.getData(function (data) {
    console.log("配置：" + JSON.stringify(data));
    pool = mysql.createPool(data.sql);
    client = new elasticsearch.Client(data.es);
    amqp.connect('amqp://' + data.rabbit.username + ':' + data.rabbit.password + '@' + data.rabbit.url, (err, conn) => {
        rabbit_connect = conn;
    })
})

module.exports = {

    //执行mysql数据库操作
    sqlQuery(sql, val, cb) {
        pool.getConnection((err, conn) => {
            let q = conn.query(sql, val, (err, rows) => {
                cb(err, rows);
                conn.release();
            });
        });
    },

    //执行es检索
    esSearch(body, fun) {

        client.search({
            index: 't_news_index',
            type: 'info',
            body: body
        }, function (err, response) {
            fun(err, response && response.hits && response.hits.hits ? response.hits : "")
        });
    },

    //执行es遍历
    esScroll(body, fun) {

        client.search({
            index: 'cms_content',
            type: 't_content_feedback',
            scroll: '1m',
            body: body
        }, function (err, response) {
            if (response && response.hits && response.hits.hits) {
                fun(response.hits.hits, response._scroll_id);
            } else {
                fun([]);
            }
        });
    },

    //执行下一个es遍历
    esScrollNext(scroll_id, fun) {

        client.scroll({
            scroll: '1m',
            scroll_id: scroll_id
        }, function (err, response) {
            if (response && response.hits && response.hits.hits) {
                fun(response.hits.hits, response._scroll_id);
            } else {
                fun([]);
            }
        });
    },

    //执行es更新
    esCreat(content_id, body, fun) {

        //更新es缓存数据
        client.create({
            index: 'cms_content',
            type: 't_content_feedback',
            id: content_id,
            body: body
        }, function (error, response) {
            fun(error, response);
        })
    },

    //执行es更新
    esUpdate(content_id, body, fun) {

        //更新es缓存数据
        client.update({
            index: 'cms_content',
            type: 't_content_feedback',
            id: content_id,
            body: {
                doc: body
            }
        }, function (error, response) {
            fun(error, response);
        })
    },

    //执行es批量更新
    esBatchUpdate(body, fun) {

        //更新es缓存数据
        client.updateByQuery({
            index: 'cms_content',
            type: 't_content_feedback',
            body: body
        }, function (error, response) {
            fun(error, response);
        })
    },

    //发送请求
    getAppSecret(length, fn) {
        config.getData(function (data) {
            var options = {
                url: data.product_key,
                headers: {
                    'User-Agent': 'request',
                    'content-type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    "length": length
                })
            };
            request.post(options, function (error, response, body) {
                fn(error, JSON.parse(body));
            });
        })
    },

    //通知爬虫批量更新
    postBatchOffline(length, fn) {
        config.getData(function (data) {
            var options = {
                url: data.source_batch_offline,
                headers: {
                    'User-Agent': 'request',
                    'content-type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    "length": length
                })
            };
            request.post(options, function (error, response, body) {
                fn(error, JSON.parse(body));
            });
        })
    },

    //将创建的资讯发送到rbq服务  amqp
    postContent(content) {
        config.getData(data => {

            amqp.connect('amqp://' + data.rabbit.username + ':' + data.rabbit.password + '@' + data.rabbit.url, (err, conn) => {
                conn.createChannel((err, ch) => {
                    ch.assertQueue("crawler_data_exchange_test", {durable: false}, _qok => {
                        ch.sendToQueue("crawler_data_exchange_test", new Buffer(content), (err, res) => {
                            console.log(err);
                        });
                        // ch.close();
                    })
                });
            })
        })
    },

};

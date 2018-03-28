let config = require('./config');
//初始化mysql
let mysql = require('mysql');
let pool = "";
let poolZZ = "";//智子库
let poolDB = "";//大数据库
//初始化es
var elasticsearch = require('elasticsearch');
var client = "";
//初始化thrift
var thrift = require('thrift');
var ThriftTest = require('../utils/thrift/OutClassifierService');
let transport = thrift.TFramedTransport;
let protocol = thrift.TCompactProtocol;

config.getData(function (data) {
    pool = mysql.createPool(data.sql);
    poolZZ = mysql.createPool(data.zz_sql);
    poolDB = mysql.createPool(data.db_sql);
    client = new elasticsearch.Client(data.es);
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

    //执行智子mysql数据库操作
    sqlQueryZZ(sql, val, cb) {
        poolZZ.getConnection((err, conn) => {
            let q = conn.query(sql, val, (err, rows) => {
                cb(err, rows);
                conn.release();
            });
        });
    },

    //执行大数据mysql数据库操作
    sqlQueryDB(sql, val, cb) {
        poolDB.getConnection((err, conn) => {
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

    //获取产品id
    getProductId(fun) {
        console.log("获取ProductId！");

        config.getData(function (data) {

            var connection = thrift.createConnection(data.thrift.host, data.thrift.port, {
                transport: transport,
                protocol: protocol
            });
            connection.on('error', function (err) {
                console.log(false, err);
            });
            var client = thrift.createClient(ThriftTest, connection);
            client.getProductId(function (err, result, data) {
                //如果不关闭连接，那么强制断开连接，将会导致后端出现error
                connection.end();
                if (err) {
                    console.log(err);
                    fun("");
                } else {
                    fun(result);
                }
            });
        })
    },

    //获取AppSecret
    getAppSecret(fun) {
        console.log("获取AppSecret！");


        config.getData(function (data) {

            var connection = thrift.createConnection(data.thrift.host, data.thrift.port, {
                transport: transport,
                protocol: protocol
            });
            connection.on('error', function (err) {
                console.log(false, err);
            });
            var client = thrift.createClient(ThriftTest, connection);
            client.getAppSecret(function (err, result, data) {
                connection.end();
                if (err) {
                    console.log(err);
                    fun("");
                } else {
                    fun(result);
                }
            });
        })
    },

};

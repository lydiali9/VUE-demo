/**
 * 数据库配置
 * Created by yuhua.li.
 */

let DEBUG = false;//部署测试环境用true
let env = DEBUG ? 0 : 1;
let http = require('../db/http');
let fs = require('fs');  //fs是读取文件的模板工具
var path = require('path');
let config = "";
let data = {

    //mysql--数据库配置
    sql: {
        host: process.env.NODE_ENV == env ? '10.10.82.207' : '192.168.1.238',
        port: 3306,
        user: process.env.NODE_ENV == env ? 'cms' : 'root',
        password: process.env.NODE_ENV == env ? 'cmscms' : 'inveno2016',
        database: process.env.NODE_ENV == env ? 'db_mta' : 'db_mta',
        //使node中的mysql支持多条语句，带;的
        multipleStatements: true,
        characterEncoding: 'utf8',
    },

    //redis--数据库配置
    redis: process.env.NODE_ENV == env ?
        [{//线上环境
            port: 10379,
            host: '10.10.12.29'
        }, {
            port: 10379,
            host: '10.10.54.38'
        }, {
            port: 10379,
            host: '10.10.40.193'
        }] :
        [{//测试环境
            port: 9002,
            host: '192.168.1.234'
        }, {
            port: 9007,
            host: '192.168.1.234'
        }, {
            port: 9004,
            host: '192.168.1.228'
        }, {
            port: 9005,
            host: '192.168.1.228'
        }]
};

module.exports = {
    getData: function (fn) {
        if (config) {
            fn(config);
        } else {
            console.log("读取本地配置文件@")
            fs.readFile(path.join(__dirname, "../config.json"), function (err, data) {
                if (err) {
                    throw err;
                }
                config = JSON.parse(data);//获取json文件对象
                fn(config);
            })
        }
    }
};

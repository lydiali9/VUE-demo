let DEBUG = false;//部署测试环境用true
let env = DEBUG ? 0 : 1;
let http = require('../db/http');
let data = {

    //thrift--跨语言调用
    thrift: {
        port: process.env.NODE_ENV == env ? 9090 : 9098,
        host: process.env.NODE_ENV == env ? '192.168.1.174' : '192.168.1.243'
    },

    //apollo配置中心（public）
    apolloPublic: {
        host: process.env.NODE_ENV == env ? 'http://192.168.2.16:': 'http://192.168.1.238:',
        port_get:  process.env.NODE_ENV == env ? "8080" : "3492",
        port_edit: process.env.NODE_ENV == env ? "8070" : "3494",
        port_issue: process.env.NODE_ENV == env ? "8070" : "3494",
        appId: 'piemedia_cms',
        cluster: 'piemediacms',//账号名
        env: process.env.NODE_ENV == env ? 'PRO' : 'DEV',
        namespace: 'pro1.cmsPublicConfig',//公共配置库
        token: process.env.NODE_ENV == env ? '6200dc53581806df1957ecb3e0a51b114cc2c395' : 'ac61ba864b6c29a53eb03a22c4a778edde3fc90a',
        key: ''
    },
    //apollo配置中心（cms）
    apolloCms: {
        host: process.env.NODE_ENV == env ? 'http://192.168.2.16:': 'http://192.168.1.238:',
        port_get:  process.env.NODE_ENV == env ? "8080" : "3492",
        port_edit: process.env.NODE_ENV == env ? "8070" : "3494",
        port_issue: process.env.NODE_ENV == env ? "8070" : "3494",
        appId: 'piemedia_cms',
        cluster: 'piemediacms',//账号名
        env: process.env.NODE_ENV == env ? 'PRO' : 'DEV',
        namespace: 'application',//cms配置库
        token: process.env.NODE_ENV == env ? '6200dc53581806df1957ecb3e0a51b114cc2c395' : 'ac61ba864b6c29a53eb03a22c4a778edde3fc90a',
        key: ''
    },
    //apollo配置中心（offlineJobConfig）
    apolloOffline: {
        host: process.env.NODE_ENV == env ? 'http://192.168.2.16:': 'http://192.168.1.238:',
        port_get:  process.env.NODE_ENV == env ? "8080" : "3492",
        port_edit: process.env.NODE_ENV == env ? "8070" : "3494",
        port_issue: process.env.NODE_ENV == env ? "8070" : "3494",
        appId: 'piemedia_cms',
        cluster: 'piemediacms',//账号名
        env: process.env.NODE_ENV == env ? 'PRO' : 'DEV',
        namespace: 'pro1.offlineJobConfig',//offline配置库
        token: process.env.NODE_ENV == env ? '6200dc53581806df1957ecb3e0a51b114cc2c395' : 'ac61ba864b6c29a53eb03a22c4a778edde3fc90a',
        key: ''
    },

    //mysql--数据库配置
    sql: {
        host: process.env.NODE_ENV == env ? '127.0.0.1' : '127.0.0.1',
        port: 3306,
        user: process.env.NODE_ENV == env ? '' : '',
        password: process.env.NODE_ENV == env ? '' : '',
        database: process.env.NODE_ENV == env ? '' : '',
        //使node中的mysql支持多条语句，带;的
        multipleStatements: true,
        characterEncoding: 'utf8',
    },

    //大数据
    db_sql:{
        host: process.env.NODE_ENV == env ? '127.0.0.1' : '127.0.0.1',
        port: 3306,
        user: process.env.NODE_ENV == env ? '' : '',
        password: process.env.NODE_ENV == env ? '' : '',
        database: process.env.NODE_ENV == env ? '11' : '',
        //使node中的mysql支持多条语句，带;的
        multipleStatements: true,
        characterEncoding: 'utf8',
    },

    //产品配置同步智子sql
    zz_sql:{
        host: process.env.NODE_ENV == env ? '127.0.0.1' : '127.0.0.1',
        port: 3306,
        user: process.env.NODE_ENV == env ? '11' : '11',
        password: process.env.NODE_ENV == env ? 'gate@11' : '11',
        database: process.env.NODE_ENV == env ? '11' : '11',
        //使node中的mysql支持多条语句，带;的
        multipleStatements: true,
        characterEncoding: 'utf8',
    },

    //elasticsearch--数据库配置
    es: {
        hosts: process.env.NODE_ENV == env ? [{host: '127.0.0.1', port: '9200'},//线上环境
                {host: '127.0.0.1', port: '9200'},
                {host: '127.0.0.1', port: '9200'}]
            : [{host: '127.0.0.1', port: '9200'}]//测试环境
    },

    //redis--数据库配置
    redis: process.env.NODE_ENV == env ?
        [{//线上环境
            port: 6379,
            host: '127.0.0.1'
        }, {
            port: 6379,
            host: '127.0.0.1'
        }, {
            port: 6379,
            host: '127.0.0.1'
        }, {
            port: 6379,
            host: '127.0.0.1'
        }, {
            port: 6379,
            host: '127.0.0.1'
        }, {
            port: 6379,
            host: '127.0.0.1'
        }] :
        [{//测试环境
            port: 9002,
            host: '127.0.0.1'
        }, {
            port: 9007,
            host: '127.0.0.1'
        }, {
            port: 9004,
            host: '127.0.0.1'
        }, {
            port: 9005,
            host: '127.0.0.1'
        }]
};

module.exports = {
    getData: function (fn) {
        if (data) {
            fn(data);
        } else {
            // console.log("请求配置")
            http.get(config_url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let hotJson = JSON.parse(body.trim());
                    data = process.env.NODE_ENV == env ? JSON.parse(hotJson.db_host_online) : JSON.parse(hotJson.db_host_debug);
                    fn(data);
                }
            })
        }
    }
};

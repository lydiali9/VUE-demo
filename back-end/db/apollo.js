let config = require('./config');
let http = require('../db/http');


//执行apollo查询
let get = function (apollo, fn) {
    let url = apollo.host + apollo.port_get + "/configfiles/json/" + apollo.appId + "/default/" + apollo.namespace + "?";
    http.get(url, function (error, response, body) {
        fn(error, body);
    });
};

//执行apollo数据更新
let update = function (apollo, data, fn) {
    let url = apollo.host + apollo.port_edit + "/openapi/v1/envs/" + apollo.env + "/apps/" + apollo.appId + "/clusters/default/namespaces/" + apollo.namespace + "/items/" + data.key
    http.configManagerPut(url, apollo.token, {
        "key": data.key,
        "value": data.data,
        "comment": data.des,
        "dataChangeLastModifiedBy": apollo.cluster
    }, function (error, response, body) {
        fn(error, body);
    })
};

//创建nameSpace
let creat = function (data, apollo, fn) {
    let url = apollo.host + apollo.port_edit + "/openapi/v1/apps/" + apollo.appId + "/appnamespaces"
    http.nameSpaceCreat(url, apollo.token, {
        "name": data.name,
        "appId": apollo.appId,
        "format": "json",
        "isPublic": true,
        "commnet": data.commnet,
        "dataChangeCreatedBy": apollo.cluster
    }, function (error, response, body) {
        fn(error, body);
    })
}

//发布配置
let issue = function (data, apollo, fn) {

    let url = apollo.host + apollo.port_issue + "/openapi/v1/envs/" + apollo.env + "/apps/" + apollo.appId + "/clusters/default/namespaces/" + apollo.namespace + "/releases";
    console.log("发布配置：" + url);
    http.configManager(url, apollo.token, {
        "releaseTitle": "cms操作",
        "releaseComment": data.des,
        "releasedBy": apollo.cluster
    }, function (error, response, body) {
        fn(error, body);
    })
}


module.exports = {

    //更新product配置库数据
    updatePublicConfig(data, fn){
        let body = {
            key: 'product_config',
            data: JSON.stringify(data),
            des: 'cms'
        };
        config.getData(function (con) {
            update(con.apolloPublic, body, function (err, data) {
                if(err){
                    fn(err, data);
                }else{
                    issue(data, con.apolloPublic, function (e, d) {
                        fn(e, d);
                    });
                }
            });
        });
    },

};

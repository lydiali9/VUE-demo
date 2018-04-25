let path = '/api';

module.exports = {
    //crawler
    get_crawler: path + '/crawler/getInfo',
    get_info_detail: path + '/crawler/getInfoDetail',
    //limit
    limit_get: path + '/limit/get',
    limit_del: path + '/limit/del',
    limit_add_menu: path + '/limit/add_menu',
    limit_add_user: path + '/limit/add_user',
    limit_add_group: path + '/limit/add_group',
    limit_update_user: path + '/limit/update_user',
    limit_update_user_group: path + '/limit/update_user_group',
    limit_update_menu: path + '/limit/update_menu',
    
    //登陆管理
    login: path + '/login/login',
    logout: path + '/login/logout',
};

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

const baseUrl = process.env.SERVER_URL;
//跳转编辑界面url配置
const sourceUrl = process.env.SOURCE_URL;

export default new Vuex.Store({
    modules: {
        user,
    },
    state: {
        // setting
        userList: baseUrl + 'limit/get',
        addUser: baseUrl + 'limit/add_user',
        updateUser: baseUrl + 'limit/update_user',
        delUser: baseUrl + 'limit/del',
        addUserGroup: baseUrl + 'limit/add_group',
        updateUserGroup: baseUrl + 'limit/update_user_group',
        addMenu: baseUrl + 'limit/add_menu',
        updateMenu: baseUrl + 'limit/update_menu',

        // main
        login: baseUrl + 'login/login',
        userProductList: baseUrl + 'product/private/get/',

        // crawler
        getInfo: baseUrl + "crawler/getInfo",
        getInfoDetail: baseUrl + "crawler/getInfoDetail",
    }
})

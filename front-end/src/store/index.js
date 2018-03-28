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
        // main
        login: baseUrl + 'login/login',
        "imgUpload": baseUrl + "new/imgUpload",//图片上传路径


    }
})

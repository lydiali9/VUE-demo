import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

const baseUrl = process.env.SERVER_URL;

export default new Vuex.Store({
    modules: {
        user,
    },
    state: {
        // login
        "login": baseUrl + 'login/login'
    },

})

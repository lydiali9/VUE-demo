import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
import request from './utils/request'
import Utils from './utils/utils'

Vue.use(ElementUI);

Vue.prototype.$axios = axios;
Vue.prototype.$request = request;
Vue.prototype.$utils = Utils;

Vue.config.productionTip = false

Vue.prototype.setCookie = (c_name, value, expiredays) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (unescape(arr[2]));
    else
        return null;
}
Vue.prototype.getCookie = getCookie;

Vue.prototype.delCookie = (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

router.beforeEach((to, from, next) => {

    let items = [];

    if (to.fullPath == "/" || to.fullPath == "/login") {
        next();
    } else {
        next();
        /*if (!getCookie('user') || !getCookie('isLogin')) {
            // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
            next({path: '/login'})
        } else {
            items = JSON.parse(getCookie('accessedMenusCatch')) || [];
            if (items.indexOf(to.fullPath) > -1) {
                next();
            } else {
                // next({path: '/login'})
            }
        }*/
    }
})

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App},
    methods: {}
});

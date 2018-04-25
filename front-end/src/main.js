// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'vuetify/dist/vuetify.min.css'
import {Tree, DatePicker, TimePicker, Upload, Pagination, Dialog, CheckboxGroup} from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import Clipboard from 'v-clipboard'
import request from './utils/request'
import Snackbar from '../components/snackbar'
import Utils from './utils/utils'
import VueHtml5Editor from 'vue-html5-editor'
import Vuetify from 'vuetify'
import 'babel-polyfill'
import ECharts from 'vue-echarts/components/ECharts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'zrender/lib/svg/svg';

Vue.component('chart', ECharts);

Vue.use(CheckboxGroup);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Upload);
Vue.use(Tree);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Clipboard);
Vue.use(Snackbar);
Vue.use(Vuetify, {
    theme: {
        primary: "#0D47A1",
        secondary: "#6A1B9A",
        accent: "#0D47A1",
        error: "#f44336",
        warning: "#ffeb3b",
        info: "#2196f3",
        success: "#4caf50",
        toolbarTitle: "#fff",
        tableHeader: "#d9ece9",
        cardTitleBack: "#f8f9fb",
    }
});

// axios.defaults.withCredentials = true;//设置cookie可用
Vue.prototype.$axios = axios;
Vue.prototype.$request = request;
Vue.prototype.$utils = Utils;

Vue.config.productionTip = false

Vue.prototype.setCookie = (c_name, value, expiredays) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie、
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (unescape(arr[2]));
    else
        return null;
}

Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie = (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

router.beforeEach((to, from, next) => {

    // 检查是否存在session
    let items = [];
    let idPath = '';

    if(to.fullPath.indexOf("?") > -1) {
        idPath = to.fullPath.split("?")[0];
    }

    if (to.fullPath == "/" || to.fullPath == "/login" || to.path == "/FineArticleAuditDetail" || to.path == "/ArticleAuditDetail" || to.path == "/HighArticleAuditDetail" || idPath == "/editArticleManager" || to.fullPath == "/editArticleManager") {
        next();
    } else {
        if (!getCookie('user') || !getCookie('isLogin')) {
            // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
            next({path: '/login'})
        } else {
            items = JSON.parse(getCookie('accessedMenusCatch')) || [];
            if (items.indexOf(to.path) > -1) {
                next();
            } else {
                next({path: '/login'})
            }
        }
        next();
    }
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App},
    //监听路由检查登录
    // watch: {
    //   "$route": 'checkLogin'
    // },
    created() {
        // this.checkLogin();
    },
    methods: {}
})

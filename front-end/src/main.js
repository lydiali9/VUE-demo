// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'vuetify/dist/vuetify.min.css'
import { Tree, DatePicker, TimePicker, Upload, Pagination, Dialog, CheckboxGroup } from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import Clipboard from 'v-clipboard'
import request from './utils/request'
import ForceInsertDialog from '../components/insert'
import Snackbar from '../components/snackbar'
import Utils from './utils/utils'
import Config from './utils/config'
import Channel from './utils/channel'
import VueHtml5Editor from 'vue-html5-editor'
import Vuetify from 'vuetify'
import 'babel-polyfill'

Vue.use(CheckboxGroup);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Upload);
Vue.use(Tree);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Clipboard);
Vue.use(ForceInsertDialog);
Vue.use(Snackbar);
Vue.use(Vuetify, {
    theme: {
        primary: "#0D47A1",
        secondary: "#6A1B9A",
        accent: "#0D47A1",
        error: "#f44336",
        warning: "#ffeb3b",
        info: "#2196f3",
        success: "#4caf50"
    }
});
Vue.use(VueHtml5Editor, {
    // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效
    // global component name
    name: "vue-html5-editor",
    // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
    // if set true,will append module name to toolbar after icon
    showModuleName: true,
    // 自定义各个图标的class，默认使用的是font-awesome提供的图标
    // custom icon class of built-in modules,default using font-awesome
    icons: {
        text: "fa fa-pencil",
        color: "fa fa-paint-brush",
        font: "fa fa-font",
        align: "fa fa-align-justify",
        list: "fa fa-list",
        link: "fa fa-chain",
        unlink: "fa fa-chain-broken",
        tabulation: "fa fa-table",
        image: "fa fa-file-image-o",
        hr: "fa fa-minus",
        eraser: "fa fa-eraser",
        undo: "fa-undo fa",
        "full-screen": "fa fa-arrows-alt",
        // info: "fa fa-info",
    },
    // 配置图片模块
    // config image module
    image: {
        // 文件最大体积，单位字节  max file size
        sizeLimit: 512 * 1024,
        // 上传参数,默认把图片转为base64而不上传
        // upload config,default null and convert image to base64
        upload: {
            url: process.env.SERVER_URL + 'new/imgUpload',
            headers: {},
            params: {'isRestrictedSize': 0},
            fieldName: 'file'
        },
        // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
        // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
        // set null to disable compression
        compress: null,
        // 响应数据处理,最终返回图片链接
        // handle response data，return image url
        uploadHandler(responseText){
            //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
            var json = JSON.parse(responseText);
            if(json.code == 200) {
                return json.data.url;
            } else {
                //this.$message.error(json.err);
                alert(json.err);
            }
        }
    },
    // 语言，内建的有英文（en-us）和中文（zh-cn）
    //default en-us, en-us and zh-cn are built-in
    language: "zh-cn",
    // 自定义语言
    i18n: {
        //specify your language here
        "zh-cn": {
            "align": "对齐方式",
            "image": "图片",
            "list": "列表",
            "link": "链接",
            "unlink": "去除链接",
            "table": "表格",
            "font": "文字",
            "full screen": "全屏",
            "text": "排版",
            "eraser": "格式清除",
            "info": "关于",
            "color": "颜色",
            "please enter a url": "请输入地址",
            "create link": "创建链接",
            "bold": "加粗",
            "italic": "倾斜",
            "underline": "下划线",
            "strike through": "删除线",
            "subscript": "上标",
            "superscript": "下标",
            "heading": "标题",
            "font name": "字体",
            "font size": "文字大小",
            "left justify": "左对齐",
            "center justify": "居中",
            "right justify": "右对齐",
            "ordered list": "有序列表",
            "unordered list": "无序列表",
            "fore color": "前景色",
            "background color": "背景色",
            "row count": "行数",
            "column count": "列数",
            "save": "确定",
            "upload": "上传",
            "progress": "进度",
            "unknown": "未知",
            "please wait": "请稍等",
            "error": "错误",
            "abort": "中断",
            "reset": "重置"
        }
    },
    // 隐藏不想要显示出来的模块
    // the modules you don't want
    hiddenModules: [],
    // 自定义要显示的模块，并控制顺序
    // keep only the modules you want and customize the order.
    // can be used with hiddenModules together
    visibleModules: [
        "text",
        "color",
        "font",
        "align",
        "list",
        "link",
        "unlink",
        "tabulation",
        "image",
        "hr",
        "eraser",
        "undo",
        "full-screen",
        // "info",
    ],
    // 扩展模块，具体可以参考examples或查看源码
    // extended modules
    modules: {
        //omit,reference to source code of build-in modules
    }
});

// axios.defaults.withCredentials = true;//设置cookie可用
Vue.prototype.$axios = axios;
Vue.prototype.$request = request;
Vue.prototype.$utils = Utils;
Vue.prototype.$config = Config;
Vue.prototype.$channel = Channel;

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

    if (to.fullPath == "/" || to.fullPath == "/login" || to.fullPath == "/newsedit" || to.fullPath == "/UIManager" || to.fullPath == "/DWNewsEdit" || to.fullPath == "/HWNewsEdit") {
        next();
    } else {
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

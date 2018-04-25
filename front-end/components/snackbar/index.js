/**
 * Created by LynnLi on 2018/03/09.
 */
import Vue from 'vue'
const SnackbarConstructor = Vue.extend(require('./Snackbar.vue')) // 直接将Vue组件作为Vue.extend的参数
var nId = 1

const Snackbar = (data) => {
    let id = 'notice-' + nId++;
    const SnackbarInstance = new SnackbarConstructor({
        data: {
            color: data.color,
            alertInfo: data.alertInfo,
            snackbar: true,
        }
    });
    SnackbarInstance.id = id;
    SnackbarInstance.vm = SnackbarInstance.$mount();
    SnackbarInstance.dom = SnackbarInstance.vm.$el;
    document.body.appendChild(SnackbarInstance.dom);
    SnackbarInstance.initConfig();

    return SnackbarInstance.vm;
}
export default {
    install: Vue => {
        Vue.prototype.$Snackbar = Snackbar // 将Notice组件暴露出去，并挂载在Vue的prototype上
    }
}

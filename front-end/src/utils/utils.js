import htmlTojson from 'html2json';

let html2json = htmlTojson.html2json;
let json2html = htmlTojson.json2html;

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

const utils = {

    isEmpty: function (s) {
        if (s == null || s.trim() == "" || s.replace(/(^s*)|(s*$)/g, "").length == 0) {
            return true;
        }
        return false;
    },

    //转换时间格式
    formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
            }
        }
        return fmt;
    }
}

export default utils

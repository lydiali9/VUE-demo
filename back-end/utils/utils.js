function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

const utils = {

    //十进制转十六进制格式
    ten2sixteen: function (ten) {
        ten = (ten).toString(16);
        let s = '0x00000000';
        let l = ten.toString().length;
        s = s.substring(0, 10 - l);
        s += ten;
        return s;
    },

    getQueryString: function (url) {
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            let option = url.substr(url.indexOf('?') + 1);
            var strs = option.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },

    //判断是否为空
    is_empty: function (s) {
        return s === null || s === undefined || s === '';
    },

    //判断是否不为空
    is_not_empty: function (s) {
        return !(s === null || s === undefined || s === '');
    },

    //判断是否包含空
    has_empty: function (ss) {
        return ss.some(s => s === null || s === undefined)
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
    },
}

module.exports = utils

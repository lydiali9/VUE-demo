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

    //十进制转十六进制格式
    ten2sixteen: function (ten) {
        ten = (ten).toString(16);
        let s = '0x00000000';
        let l = ten.toString().length;
        s = s.substring(0, 10 - l);
        s += ten;
        return s;
    },

    //将16进制的arr的id值与reqType,得到一个arr中的des数组
    displayTypeNumToArray(arr, reqType) {
        var tmpArray = [];
        if (reqType) {
            arr.forEach(function (val) {
                if ((val.id & reqType) > 0) {
                    tmpArray.push(val.des);
                }
            });
        }
        return tmpArray;
    },

    //将多选框的选择结果，转换成arr里面的ID值之和
    displayTypeArrayToNum(arr, reqArray) {
        var num = 0;
        arr.forEach(function (val) {
            if (reqArray.indexOf(val.des) > -1) {
                num += parseInt(val.id, 16);
            }
        })
        return num;
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

    // format Json to send request.
    formatJson(json, attr, text) {
        var self = this;

        console.log(json);
        var isLine = 0;
        var labelArr = ['div', 'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'section', 'font', 'ol', 'ul', 'li', 'tr', 'td', 'th', 'tbody', 'thead', 'table', 'article', 'header', 'footer'];

        json.child.forEach(function (val, index) {
            if ((val.node == 'element' && labelArr.includes(val.tag)) || val.node == 'text') {
                text += val.text ? val.text : '';
                if (text) {
                    attr.push({
                        "paragraph": text,
                    })
                    text = "";
                }
                if (val.child && val.child.length > 0) {
                    self.formatJson(val, attr, text);
                }
            } else if (val.node == 'element' && val.tag == 'img') {
                let obj = {
                    "paragraph": text,
                    "paragraph_image": {
                        "img_url": val.attr.src,
                        "format": val.attr.format,
                        "width": val.attr.width,
                        "surl": decodeURIComponent(val.attr.surl),
                        "height": val.attr.height
                    }
                };
                if (val.attr.desc) {
                    obj.paragraph_image.desc = val.attr.desc;
                }
                attr.push(obj);
                text = "";     //即使清空text，供下次使用
            } else if (val.node == 'element' && val.tag == 'a') {
                var isLineBefore = json.child[index - 1] && (json.child[index - 1].tag == 'p' || json.child[index - 1].tag == 'div');
                var isLineAfter = json.child[index + 1] && (json.child[index + 1].tag == 'p' || json.child[index + 1].tag == 'div');

                if (isLineBefore || (typeof isLineBefore == 'undefined' && typeof isLineAfter !== 'undefined')) {
                    isLine = -1;
                } else if (isLineAfter || (typeof isLineAfter == 'undefined' && typeof isLineBefore !== 'undefined')) {
                    isLine = 1;
                } else if (isLineBefore && isLineAfter || (typeof isLineBefore == 'undefined' && typeof isLineAfter == 'undefined')) {
                    isLine = 2;
                } else {
                    isLine = 0;
                }
                var obj = {
                    "paragraph": (val.child && val.child[0] && val.child[0].text) ? val.child[0].text : '',
                    "link": val.attr.href,
                    'is_line': isLine
                }
                attr.push(obj);
                text = "";    //即使清空text，供下次使用
            }
        });
        // 如果文章的结尾是文字
        if (text) {
            attr.push({
                "paragraph": text,
            })
            text = "";
        }
        return JSON.stringify(attr);
    },

    //将富文本内容转化成json
    html2json(content, form) {
        var self = this;
        let attr = [];

        //如果是视频内容
        if (form.video_url) {
            attr.push({
                "paragraph": "",
                "paragraph_video": {
                    "duration": form.video_duration,
                    "title": form.title,
                    "player_type": "1",
                    "url": form.video_url,
                    "video_id": "",
                    "thumbnail": {
                        "format": form.video_img_format,
                        "height": form.video_img_h,
                        "img_url": form.video_img,
                        "surl": form.video_img,
                        "width": form.video_img_w
                    }
                }
            })
            return JSON.stringify(attr);
        } else {
            let attr = [];
            let text = ""
            let json = html2json(content);
            return self.formatJson2(json, attr, text);
        }
    },

    formatJson2(json, attr, text) {
        json.child.forEach(function (item, index) {
            if (item.node == "element") {
                if (item.tag == "p") {
                    let content = ""
                    let p = {"paragraph": ""};
                    let a = [];
                    let hasTag = false;
                    item.child.forEach(function (child) {
                        if (child.node == "text") {
                            content += child.text;
                            a.push({
                                tag: "text",
                                text: child.text
                            })
                        } else if (child.node == "element" && child.child) {
                            hasTag = true;
                            child.child.forEach(function (child2) {
                                content += child2.text;
                                a.push({
                                    tag: child.tag,
                                    text: child2.text,
                                    link: child.attr.href
                                })
                            })
                        }
                    })
                    p.paragraph = content;
                    if(hasTag){
                        p.attr = a;
                    }
                    attr.push(p);
                }else if(item.tag == "a"){
                    let content = ""
                    let p = {"paragraph": ""};
                    let a = [];
                    item.child.forEach(function (child) {
                        content += child.text;
                        a.push({
                            tag: child.tag,
                            text: child.text,
                            link: item.attr.href
                        })
                    })
                    p.paragraph = content;
                    p.attr = a;
                    attr.push(p);
                }else if(item.tag == "img"){
                    let obj = {
                        "paragraph": text,
                        "paragraph_image": {
                            "img_url": item.attr.src,
                            "format": item.attr.format,
                            "width": item.attr.width,
                            "surl": decodeURIComponent(item.attr.surl),
                            "height": item.attr.height
                        }
                    };
                    if (item.attr.desc) {
                        obj.paragraph_image.desc = item.attr.desc;
                    }
                    attr.push(obj);
                }
            }
        });
        return JSON.stringify(attr);
    }

}

export default utils

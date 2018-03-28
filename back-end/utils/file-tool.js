let fs = require('fs');

let file_tool = {

    mkdirSync : function (url, mode, cb) {

        var arr = url.split("/");
        cb = cb || function () {
            };
        mode = mode || '0755';
        if (arr[0] === ".") {//处理 ./aaa
            arr.shift();
        }
        if (arr[0] == "..") {//处理 ../ddd/d
            arr.splice(0, 2, arr[0] + "/" + arr[1])
        }
        function inner(cur) {
            fs.exists(cur, function (exists) {
                if (!exists) {
                    //不存在就创建一个
                    fs.mkdirSync(cur, mode)
                }

                if (arr.length) {
                    inner(cur + "/" + arr.shift());
                } else {
                    cb();
                }
            });
        }

        arr.length && inner(arr.shift());
    }
}

module.exports = file_tool;
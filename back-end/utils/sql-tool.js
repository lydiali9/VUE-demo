let newsSupport = [
    "type", "publisher", "source_type", "source", "source_feeds", "channel",
    "source_feeds_url", "author", "keywords", "duration", "link",
    "title", "content", "summary", "body_images", "list_images", "body_images_count",
    "list_images_count", "display_list_images", "firm_app", "update_time", "content_type", "link_type",
    "display_type", "state", "offshelf_code", "offshelf_reason", "crawler_type", "firm_media",
    "tagid", "original_content"
];
let configUnSupport = ["id"];

let sql_body = {
    body: '',
    values: [],
    //资讯更新sql组装
    news_update: function (table, data) {
        this.body = 'UPDATE ' + table + ' SET ';
        this.values.length = 0;
        for (var p in data) {
            if (newsSupport.indexOf(p) > -1) {
                this.body = this.body + ("status" == p ? "state" : p) + ' = ?, ';
                this.values.push(data[p]);
            }
        }
        this.body = this.body.substring(0, this.body.length - 2);
        this.body += ' WHERE content_id = "' + data.content_id + '"';
        return this;
    },

    //资讯插入sql组装
    news_insert: function (table, data) {
        this.body = 'INSERT INTO ' + table + ' (';
        this.values.length = 0;
        let values_str = 'VALUES (';
        for (var p in data) {
            // if (newsSupport.indexOf(p) > -1 || p == "content_id") {
            this.body = this.body + ("status" == p ? "state" : p) + ', ';
            this.values.push(data[p]);
            values_str += '?,';
            // }
        }
        this.body = this.body.substring(0, this.body.length - 2) + ") " + values_str.substring(0, values_str.length - 1) + ')';
        return this;
    },


    //配置列表更新
    config_update: function (table, data) {
        this.body = 'UPDATE ' + table + ' SET ';
        this.values.length = 0;
        for (var p in data) {
            if (configUnSupport.indexOf(p) == -1) {
                this.body = this.body + p + ' = ?, ';
                this.values.push(data[p]);
            }
        }
        this.body = this.body.substring(0, this.body.length - 2);
        this.body += ' WHERE id = ' + data.id;
        return this;
    },


    //配置列表插入
    config_insert: function (table, data) {
        this.body = 'INSERT INTO ' + table + ' (';
        this.values.length = 0;
        let values_str = 'VALUES (';
        for (var p in data) {
            this.body = this.body + p + ', ';
            values_str += '?,';
            this.values.push(data[p]);
        }
        this.body = this.body.substring(0, this.body.length - 2) + ") " + values_str.substring(0, values_str.length - 1) + ')';
        return this;
    },


    select: function (table, data, member) {
        this.body = 'SELECT * FROM ' + table + ' WHERE ';
        let keys = data.keys();
        keys.forEach(function (val, index) {
            this.body = this.body + val + ' = ? AND '
            this.values.push(data[val]);
        })
        return this;
    },


    //源批量下架操作
    source_soldOut: function (table, sqlData, data) {

        this.body = 'UPDATE ' + table + ' SET ';
        this.values.length = 0;
        for (var p in sqlData) {
            this.body = this.body + p + ' = ?, ';
            this.values.push(sqlData[p]);
        }
        this.body = this.body.substring(0, this.body.length - 2);
        // this.body += ' WHERE publisher = ' + publisher + ' AND source = '+source;

        this.body += ' WHERE ';
        for (var q in data) {
            if (data[q]) {
                let qs = q == "tagId" ? "tagid" : q;//数据库为tagid,es为tagId
                this.body += qs + ' = "' + data[q] + '" AND ';
            }
        }
        this.body = this.body.substring(0, this.body.length - 5);
        // if (publisher && source) {
        //     this.body += ' WHERE publisher = "' + publisher + '" AND source = "' + source + '"';
        // } else if (publisher) {
        //     this.body += ' WHERE publisher = "' + publisher + '"';
        // } else {
        //     this.body += ' WHERE source = "' + source + '"';
        // }
        return this;
    },

    //获取所有的资讯表名称(从2017-9第一张表至今，所有的表)
    getContentTable: function () {
        let date = new Date();
        // let month = date.getMonth() + 1;
        let tables = [];
        // let table = '';
        let startYear = 2017, startMonth = 9, endYear = date.getFullYear(), endMonth = date.getMonth() + 1;
        for (var year = startYear; year <= endYear; year++) {
            for (var month = startMonth; month <= (year == endYear ? endMonth : 12); month++) {
                tables.push('t_content_' + year + '_' + (month < 10 ? '0' + month : month))
                // table+='t_content_' + year + '_' + (month < 10 ? '0' + month : month)+', '
                if (month == 12) {
                    startMonth = 1;//重置月份
                }
            }
        }
        return tables;
    }
}

module.exports = sql_body;
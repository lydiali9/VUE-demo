let es_body = {
    body: {},
    start: function (page, count) {
        this.body = {};
        this.body.query = {};
        this.body.query.bool = {};
        this.body.query.bool.filter = [];//过滤条件
        this.body.query.bool.must = [];//查询条件
        this.body.sort = [];
        this.body.size = count;
        this.body.from = page * count;
        return this;
    },
    size: function (size) {
        this.body.size = size;
    },
    from: function (from) {
        this.body.from = from;
    },
    must: function (obj) {
        let match = {
            "match_phrase": obj
        }
        this.body.query.bool.must.push(match)
        return this;
    },
    filter_term: function (objs) {
        let and = {"term": objs};
        this.body.query.bool.filter.push(and);
        return this;
    },
    filter_range: function (objs) {
        let and = {"range": objs};
        this.body.query.bool.filter.push(and);
        return this;
    },
    sort: function (objs) {
        this.body.sort.push(objs);
        return this;
    },
    end: function () {
        return JSON.stringify(this.body);
    }
}

module.exports = es_body;
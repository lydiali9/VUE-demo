/**
 * Created by Administrator on 2017/7/7.
 */
let Redis = require('ioredis');
let config = require('../db/config');
let util = require('util');
let cluster = null;

module.exports = {
    /*    var cluster = () => new Redis.Cluster(db.redisInfo),*/

    set (key, val, fn) {
        config.getData(function (data) {
            if(cluster == null){
                cluster = new Redis.Cluster(data.redis);
            }
            cluster.set(key, val, (err, res) => {
                fn && fn(err, res);
            });
        })
    },

    get (key, fn) {
        config.getData(function (data) {
            if(cluster == null){
                cluster = new Redis.Cluster(data.redis);
            }
            cluster.get(key, (err, res) => {
                fn && fn(err, res);
            });
        })
    },

    del (key, fn) {
        config.getData(function (data) {
            if(cluster == null){
                cluster = new Redis.Cluster(data.redis);
            }
            cluster.del(key, (err, res) => {
                fn && fn(err, res);
            })
        })
    },

    hset (key, field, val, fn) {

        config.getData(function (data) {
            if(cluster == null){
                cluster = new Redis.Cluster(data.redis);
            }
            cluster.hset(key, field, val, (err, res) => {
                fn && fn(err, res);
            })
        })
    },

    hgetall (key){
        config.getData(function (data) {
            if(cluster == null){
                cluster = new Redis.Cluster(data.redis);
            }
            cluster.hgetall(key, function (err, res) {
                if (err) {
                    return err.message;
                } else {
                    return util.inspect(res);
                }
            });
        })

    },

    hdel (key, field, fn) {
        config.getData(function (data) {
            if(cluster == null){
                cluster = new Redis.Cluster(data.redis);
            }
            cluster.hdel(key, field, (err, res) => {
                fn && fn(err, res);
            });
        })

    },

    zrem (key, member, fn){
        config.getData(function (data) {
            if(cluster == null){
                cluster = new Redis.Cluster(data.redis);
            }
            cluster.zrem(key, member, (err, res) => {
                fn && fn(err, res);
            });
        })
    },

    zadd (key, member, val, fn){
        config.getData(function (data) {
            if(cluster == null){
                cluster = new Redis.Cluster(data.redis);
            }
            cluster.zadd(key, member, val, (err, res) => {
                fn && fn(err, res);
            })
        })
    },

    zrange (key, start, end, withScores, fn){
        config.getData(function (data) {
            if(cluster == null){
                cluster = new Redis.Cluster(data.redis);
            }
            cluster.zrange(key, start, end, withScores, (err, res) => {
                fn && fn(err, res);
            });
        })
    },

    zrevrange (key, start, end, withScores, fn){
        config.getData(function (data) {
            if(cluster == null){
                cluster = new Redis.Cluster(data.redis);
            }
            cluster.zrevrange(key, start, end, withScores, (err, res) => {
                fn && fn(err, res);
            });
        })
    },

    zrevrangebyscore (key, max, min, offset, count, fn){
        config.getData(function (data) {
            if(cluster == null){
                cluster = new Redis.Cluster(data.redis);
            }
            cluster.zrevrangebyscore(key, max, min, 'LIMIT', offset, count, (err, res) => {
                fn && fn(err, res);
            });
        })
    },

    zrangebyscore (key, start, end, withScores, fn){
        config.getData(function (data) {
            if(cluster == null){
                cluster = new Redis.Cluster(data.redis);
            }
            cluster.zrangebyscore(key, start, end, withScores, (err, res) => {
                fn && fn(err,res);
            });
        });
    },

};

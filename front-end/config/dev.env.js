var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    SERVER_URL: '"http://192.168.9.36:12200/api/"',
    SOURCE_URL: '""'
})

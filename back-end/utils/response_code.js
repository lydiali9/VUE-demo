/**
 * 返回码
 */

const code = {
    SUCCESS: 200,//正常返回
    FALSE: 0,//异常
    USERNAME_PASSWORD_ERR: {code: 101, msg: "用户名或密码错误"},//账号名或密码错误
    NEED_LOGIN: 102,//需要登录
    IMAGE_UPLOAD_FALSE: 103,//图片上传异常
    QUERY_MYSQL_FALSE: 104,//数据库查询异常
    OPERATE_MYSQL_FALSE: 105,//数据库操作异常
    OPERATE_REDIS_FALSE: 106,//redis操作异常
    REPETITION: 107,//强插数据重复
    REQUEST_DATA_ERR:108,//请求数据错误
}

module.exports = code

/**
 * Created by Administrator on 2017/7/7.
 */
module.exports = {

    redis: {
        //强插
        force_insert: "",
        //混插
        min_insert: "mix_insert_list",
        //缓存登录用户
        login_list: "city_login_user_list"
    },

    sql: {
        //用户数据管理
        user_check_same_name: 'SELECT * FROM user WHERE name = ?',
        user_get: 'SELECT * FROM user',
        user_get_by_name: 'SELECT * FROM user WHERE name = ?',
        user_group_get: 'SELECT * FROM user_group',
        user_group_get_product: 'SELECT product_limit FROM user_group WHERE name in (?)',
        user_menu_get: 'SELECT * FROM menu',
        user_add: 'INSERT INTO user (`group`, name, password, des, create_time) VALUES (?,?,?,?,?)',
        user_group_add: 'INSERT INTO user_group (name, menu_limit, product_limit, create_time) VALUES (?,?,?,?)',
        user_menu_add: 'INSERT INTO cms_city_menu (type, `group`, page, num, router, name, weight, des) VALUES (?,?,?,?,?,?,?,?)',
        user_update: 'UPDATE user SET `group` = ?, name = ?, password = ?, des = ? WHERE id = ?',
        user_group_update: 'UPDATE user_group SET name = ?, menu_limit = ?, product_limit = ? WHERE id = ?',
        user_menu_update: 'UPDATE cms_city_menu SET type = ?, `group` = ?, page = ?, num = ?, router = ?, name = ?, weight = ? WHERE id = ?',
        user_del: 'DELETE FROM user WHERE id = ?',
        user_menu_del: 'DELETE FROM cms_city_menu WHERE id = ?',
        user_group_del: 'DELETE FROM user_group WHERE id = ?',

        // //登陆
        login: 'SELECT * FROM user WHERE name = ? AND password = ?',
        login_limit: 'SELECT * FROM user_group WHERE name in (',
        login_menu_limit: 'SELECT * FROM menu WHERE id in (',
    },

    img: {
        IMAGE_CLOUD_HOST: 'upload.inveno.com',
        IMAGE_CLOUD_URI: '/upload',
        IMAGE_CLOUD_KEY: '34F<S932JF;<,/SF*F56#DSfd+9fw?zF',
        IMAGE_CLOUD_APP: 'adconf',
    }

};

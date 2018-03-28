module.exports = {

    redis: {
        //强插
        force_insert: "",

        //缓存登录用户
        login_list: "pie_login_user_list"
    },

    sql: {

        //用户数据管理
        user_check_same_name: 'SELECT * FROM cms_3_user WHERE name = ?',
        user_get: 'SELECT * FROM cms_3_user',
        user_group_get: 'SELECT * FROM cms_3_user_group',
        user_menu_get: 'SELECT * FROM cms_3_menu',
        user_add: 'INSERT INTO cms_3_user (`group`, name, password, des, create_time) VALUES (?,?,?,?,?)',
        user_group_add: 'INSERT INTO cms_3_user_group (name, menu_limit, product_limit, create_time) VALUES (?,?,?,?)',
        user_menu_add: 'INSERT INTO cms_3_menu (type, `group`, page, num, router, name, weight, des) VALUES (?,?,?,?,?,?,?,?)',
        user_update: 'UPDATE cms_3_user SET `group` = ?, name = ?, password = ?, des = ? WHERE id = ?',
        user_group_update: 'UPDATE cms_3_user_group SET name = ?, menu_limit = ?, product_limit = ? WHERE id = ?',
        user_menu_update: 'UPDATE cms_3_menu SET type = ?, `group` = ?, page = ?, num = ?, router = ?, name = ?, weight = ? WHERE id = ?',
        user_del: 'DELETE FROM cms_3_user WHERE id = ?',
        user_menu_del: 'DELETE FROM cms_3_menu WHERE id = ?',
        user_group_del: 'DELETE FROM cms_3_user_group WHERE id = ?',
        
        // //登陆
        login: 'SELECT * FROM cms_3_user WHERE name = ? AND password = ?',
        login_limit: 'SELECT * FROM cms_3_user_group WHERE name in (',
        login_menu_limit: 'SELECT * FROM cms_3_menu WHERE id in (',
        

    },

    img: {
        IMAGE_CLOUD_HOST: 'upload.inveno.com',
        IMAGE_CLOUD_URI: '/upload',
        IMAGE_CLOUD_KEY: '34F<S932JF;<,/SF*F56#DSfd+9fw?zF',
        IMAGE_CLOUD_APP: 'adconf',
    }

};

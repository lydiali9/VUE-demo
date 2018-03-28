let $express = require('express');
let $api = require('../api');
var $userManager = require('../controls/UserManager');
var $loginManager = require('../controls/LoginManager');

let router = $express.Router();
//用户管理
router.post($api.limit_add_group, $userManager.add_group);
router.post($api.limit_add_user, $userManager.add_user);
router.post($api.limit_add_menu, $userManager.add_menu);
router.post($api.limit_update_user, $userManager.update_user);
router.post($api.limit_update_user_group, $userManager.update_user_group);
router.post($api.limit_update_menu, $userManager.update_menu);
router.post($api.limit_get, $userManager.get);
router.post($api.limit_del, $userManager.del);


router.post($api.login, $loginManager.login);
router.post($api.logout, $loginManager.logout);


module.exports = router;
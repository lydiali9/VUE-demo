/*
 生成左侧一级菜单对应的icon
 */
function getMenuIcon(name) {
  var icon = "";
  switch (name) {
    case "渠道概况":
      icon = "el-icon-menu"
      break;
    case "用户":
      icon = "person"
      break;
    case "文章":
      icon = "clipboard"
      break;
    case "媒体":
      icon = "videocamera"
      break;
    case "设置":
      icon = "settings"
      break;
  }
  return icon;
}
const user = {
  state: {
    name: '',
    menus: [],
    menus_list: [],
    products: [],
    accessedMenus: [],
    accessedMenusCatch: []
  },

  mutations: {
    INIT_MENU_LIST: (state, data) => {
      state.menus_list = data;
    },
    GenerateUserInfo: (state, data) => {
        state.menus = data;
        state.accessedMenusCatch = ["/", "/login"];
        var accessedMenus = data;

        let keys = Object.keys(state.menus);

        keys.forEach(function(key, index) {
            let subKeys = Object.keys(state.menus[key]);
            subKeys.forEach(function(subKey, subIndex) {
                if(subKey !== 'name') {
                    state.accessedMenusCatch.push('/' + state.menus[key][subKey].router);
                }
            });
        });
        console.log(JSON.stringify(accessedMenus));
        localStorage.setItem("accessedMenus", JSON.stringify(accessedMenus));
    }
  },

  actions: {}
}

export default user

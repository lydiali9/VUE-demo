import request from '../../utils/request';

function getMenuIcon(name) {
  let icon = "";
  switch (name) {
    case "渠道概况":
      icon = "el-icon-menu";
      break;
    case "用户":
      icon = "person";
      break;
    case "文章":
      icon = "clipboard";
      break;
    case "媒体":
      icon = "videocamera";
      break;
    case "设置":
      icon = "settings";
      break;
  }
  return icon;
}
let products = localStorage.getItem('producs_list') ? JSON.parse(localStorage.getItem('producs_list')): [];
const user = {
  state: {
    name: '',
    menus: [],
    menus_list: [],
    products: products,
    accessedMenus: [],
    accessedMenusCatch: [],
    product_limit: []
  },

  mutations: {
    INIT_MENU_LIST: (state, data) => {
      state.menus_list = data;
    },
      SET_PRODUCTS: (state,data) => {
          state.products = data;
      },
    GenerateUserInfo: (state, data) => {
        state.menus = data;
        state.accessedMenusCatch = ["/", "/login"];
        var accessedMenus = data;
        let keys = Object.keys(state.menus).sort();

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

  actions: {
      getUserProductList({ commit, rootState }) {
          request.postPromise(rootState.userProductList).then((res) => {
                if (res.data.code == '200') {
                     commit('SET_PRODUCTS', res.data.data);
                     localStorage.setItem('producs_list',JSON.stringify(res.data.data));
                } else {
                    return Promise.reject('net error');
                }
          }).catch((err) => {
              console.log(err);
          });
      }
  },
};

export default user

# front-end

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
# 编译(前端)：
# npm run build --- 同时编辑内网+外网两个环境
# npm run build:out --- 编辑外网
# npm run build:in --- 编辑内网
# (后端)修改：app.js port端口
# (后端)修改：app.js 部署外网要注释掉这段代码 -- $schedule.execute_insert_clear();
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

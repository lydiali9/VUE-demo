<template>
    <el-aside width="250px">Aside</el-aside>
</template>


<script>
    export default {
        data() {
            return {
            }
        },

        created () {
            let self = this;
            if (self.getCookie('user')) {
                self.items = JSON.parse(localStorage.getItem('accessedMenus'));
            }
        },
        computed: {
            onRoutes(){
                return this.$route.path.replace('/', '');
            }
        }
    }
</script>


<style>
    .el-aside {
        background-color: #eaeaea;
        text-align: center;
        margin-top: 2px;
        line-height: 1100px;
    }
</style>

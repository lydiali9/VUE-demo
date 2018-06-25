<template>
    <div>
        <vHead></vHead>
        <el-container>
            <vSide></vSide>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>


<script>
    import vHead from './NavBar.vue'
    import vSide from './SideBar.vue'

    export default {
        components:{
            vHead, vSide
        }
    }
</script>


<style>
    .el-main {
        background-color: #fafafa;
        color: #333;
        height: auto;
    }
  
    body > .el-container {
        margin-bottom: 40px;
    }
</style>

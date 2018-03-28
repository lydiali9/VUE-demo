<template>
    <router-view/></router-view>
</template>

<script>
    import store from './store'
    export default {
        store,
        // name: 'app',
        created () {
            window.UEDITOR_HOME_URL = this.$store.state.ueditor_home_url;
        }
    }
</script>

<style>
    @import "assets/css/main.css";

</style>

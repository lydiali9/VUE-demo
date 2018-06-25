<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import store from './store'
    export default {
        store,
        name: 'app'
    }
</script>

<style>
    @import "assets/style/main.scss";
</style>

<template>
    <v-app>
        <v-head/>
        <v-side/>
        <v-content class="backgroud-color">
             <v-container fluid>
                 <transition name="move" mode="out-in">
                     <router-view/>
                 </transition>
             </v-container>
         </v-content>
     </v-app>
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
    .content--wrap {
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        max-width: 100%;
        background: #eeeeef !important;
        height: auto;
    }
</style>

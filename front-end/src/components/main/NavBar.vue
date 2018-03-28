<template>
    <v-toolbar dark color="blue darken-4" app clipped-left>
        <v-toolbar-side-icon>
            <img class="img-logo" src="../../assets/images/logo.png" />
        </v-toolbar-side-icon>
        <v-toolbar-title>管理系统</v-toolbar-title>
        <v-spacer/>
        <v-layout style="flex-grow: 0">
            <v-menu bottom offset-y>
                <v-flex slot="activator">
                    <v-avatar>
                        <img src="../../assets/images/img.jpg" alt="">
                    </v-avatar>

                    <span>{{username}}</span>
                </v-flex>
                <v-list>
                    <v-list-tile @click="handleCommand('loginout')">
                        <v-list-tile-title class="text-xs-center">退出</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-layout>
    </v-toolbar>
</template>


<script>
    export default {
        data() {
            return {

            }
        },

        computed: {
            username() {
                let username = localStorage.getItem('user');
                return username ? username : '';
            }
        },

        methods: {
            handleCommand(command) {
                let self = this;

                if (command == 'loginout') {
                    self.delCookie('user');
                    self.delCookie('isLogin');
                    localStorage.removeItem('accessedMenus');
                    localStorage.removeItem('user');
                    this.$router.push('/login');
                }
            }
        }
    }
</script>

<style>
    .btn--icon {
        width: 50px;
    }

    .img-logo {
        width: 100%;
        border-radius: 25px;
    }
</style>

<template>
    <v-navigation-drawer app clipped width="230">
        <v-list>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <v-list-group>
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-for="subItem in item.subs " :key="subItem.name" :to="subItem.router">
                            <v-list-tile-content>
                                <v-list-tile-title class="px-3">{{ subItem.name }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                </template>
                <template v-else>
                    <v-list-tile :to="item.router">
                        <!-- <v-list-tile-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action> -->
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        data() {
            return {
                items: this.$store.state.user.accessedMenus
            }
        },

        created () {
            let self = this;
            if (self.getCookie('user')) {
                var titleItems = [];
                var items = JSON.parse(localStorage.getItem('accessedMenus'));
                let keys = Object.keys(items);

                keys.forEach(function(key, index) {
                    let subKeys = Object.keys(items[key]);
                    var titleItem = {
                        'name': '',
                        'subs': []
                    };
                    subKeys.forEach(function(subKey, subIndex) {
                        if(subKey == 'name') {
                            titleItem['name'] = items[key][subKey];
                        } else {
                            var item = {
                                'name': items[key][subKey].name ? items[key][subKey].name : '',
                                'router': items[key][subKey].router ? items[key][subKey].router : ''
                            };
                            titleItem['subs'].push(item);
                        }
                    });
                    titleItems.push(titleItem);
                });

                self.items = titleItems;
            }
        }
    }
</script>

<style scoped>
</style>

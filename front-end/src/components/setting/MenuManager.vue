<template>
    <div class="menu-container">

        <v-breadcrumbs divider="/" class="cms-breadcrumbs">
            <span class="group pa-2">
                <v-icon>widgets</v-icon>
            </span>
            <v-breadcrumbs-item v-for="item in breadcrumbs" :key="item.text" :disabled="item.disabled">
            {{ item.text }}
            </v-breadcrumbs-item>
        </v-breadcrumbs>

        <div class="cms-space-line"></div>
        <v-card>
            <v-card-title>
                <v-btn color="primary" dark slot="activator" class="mb-2" @click="editItem(0)">新增</v-btn>
                <v-spacer></v-spacer>
            </v-card-title>

            <v-data-table :headers="headers" :items="menuItems" :pagination.sync="pagination">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.id }}</td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.type }}</td>
                    <td class="text-xs-center">{{ props.item.group }}</td>
                    <td class="text-xs-center">{{ props.item.page }}</td>
                    <td class="text-xs-center">{{ props.item.num }}</td>
                    <td class="text-xs-center">{{ props.item.router }}</td>
                    <td class="text-xs-center">{{ props.item.weight }}</td>
                    <td class="justify-center layout px-0">
                        <v-btn icon class="mx-0" @click="editItem(props.item)">
                            <v-icon color="teal">edit</v-icon>
                        </v-btn>
                        <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                            <v-icon color="pink">delete</v-icon>
                        </v-btn>
                    </td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-form v-model="valid" ref="form" lazy-validation>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xl>
                                    <v-text-field label="名称" v-model="editedItem.name" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout wrap>
                                <v-flex xl>
                                    <v-select label="类型" :items="menuTypeLsit" v-model="type"></v-select>
                                </v-flex>
                            </v-layout>

                            <v-layout wrap>
                                <v-flex xl v-if="isShowFatherCodeID">
                                    <v-text-field label="组别编号" v-model="editedItem.group"  required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout wrap v-if="isShowSubCodeID">
                                <v-flex xl>
                                    <v-text-field label="页面编号" v-model="editedItem.page" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout wrap v-if="isShowPath">
                                <v-flex xl>
                                    <v-text-field label="按钮编号" v-model="editedItem.num"  required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout wrap>
                                <v-flex xl>
                                    <v-text-field label="路径" v-model="editedItem.router" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout wrap>
                                <v-flex xl>
                                    <v-text-field label="权重" v-model="editedItem.weight"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-4" flat @click.native="close">Cancel</v-btn>
                      <v-btn color="blue darken-4" flat @click.native="save" :disabled="!valid">Save</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>


<script>
    import crypto from "crypto"
    export default {
        data () {
            return {
                editedIndex: -1,
                breadcrumbs: [
                    {
                      text: '菜单管理',
                      disabled: false
                    }
                ],
                search: '',
                headers: [
                    { text: '编号', value: 'id', align: 'center', sortable: false },
                    { text: '名称', value: 'name', align: 'center', sortable: false },
                    { text: '类型', value: 'type', align: 'center', sortable: false },
                    { text: '组别编号', value: 'group', align: 'center', sortable: false },
                    { text: '页面编号', value: 'page', align: 'center', sortable: false },
                    { text: '按钮编号', value: 'num', align: 'center', sortable: false },
                    { text: '路径', value: 'router', align: 'center', sortable: false },
                    { text: '权重', value: 'weight', align: 'center', sortable: true },
                    { text: '操作', value: 'operation', align: 'center', sortable: false}
                ],
                menuItems: [],
                dialog: false,
                menuTypeLsit: ["主菜单", "子菜单", '按钮'],
                type: '',
                editedItem: {
                    name: '',
                    group: '',
                    page: '',
                    num: '',
                    router: '',
                    weight: 0
                },
                isShowFatherCodeID: false,
                isShowSubCodeID: false,
                isShowPath: false,
                valid: true,
                defaultItem: {},
                pagination: {
                    descending: true,
                    sortBy: 'weight'
                }
            }
        },

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? '新增' : '编辑';
            }
        },

        watch: {
            dialog(val) {
                val || this.close();
            },

            type(val) {
                switch(val) {
                    case '主菜单':
                        this.isShowFatherCodeID = true;
                        this.isShowSubCodeID = false;
                        this.isShowPath = false;
                        break;
                    case '子菜单':
                        this.isShowFatherCodeID = true;
                        this.isShowSubCodeID = true;
                        this.isShowPath = false;
                        break;
                    case '按钮':
                        this.isShowFatherCodeID = true;
                        this.isShowSubCodeID = true;
                        this.isShowPath = true;
                        break;
                }
            }
        },

        created() {
            let self = this;
            self.getMenuList();
        },

        methods: {
            getMenuList() {
                let self = this;

                self.$request.post(self.$store.state.userList, { 'type': 2 }, function(data) {
                    if(200 == data.code) {
                        data.data.forEach(function(val) {
                            val.type = val.type === 0 ? "主菜单" : (val.type === 1 ? "子菜单" : "按钮");
                        });
                        self.menuItems = data.data;
                    } else {
                        let data = {
                            alertInfo: data.msg ? data.msg : '',
                            color: 'error'
                        };
                        self.$Snackbar(data);
                    }
                });
            },

            editItem(item) {
                let self = this;
                this.dialog = true;

                self.editedIndex = this.menuItems.indexOf(item);
                self.editedItem = Object.assign({}, item);
                self.type = item.type;
            },

            deleteItem(item) {
                let self = this;

                self.$request.post(self.$store.state.delUser, Object.assign({ 'type': 2, id: item.id }), function(data) {
                    if(data.code == 200) {
                        let info = {
                            alertInfo: 'Delete user success',
                            color: 'success'
                        };
                        self.$Snackbar(info);
                    } else {
                        let info = {
                            alertInfo: data.msg ? data.msg : 'Failed to delete the user',
                            color: 'error'
                        };
                        self.$Snackbar(info);
                    }
                });
                return self.getMenuList();
            },

            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                }, 300);
            },

            save() {
                let self = this;
                let type = 0;

                switch(self.type) {
                    case '主菜单':
                        type = 0;
                        break;
                    case '子菜单':
                        type = 1;
                        break;
                    case '按钮':
                        type = 2;
                        break;
                }
                delete self.editedItem.type;
                var params = Object.assign({ 'type': type}, self.editedItem);

                if (self.editedIndex > -1) {
                    if (self.$refs.form.validate()) {

                        self.$request.post(self.$store.state.updateMenu, params, function(data) {
                            if(data.code == 200) {
                                let info = {
                                    alertInfo: 'New user success',
                                    color: 'success'
                                };
                                self.$Snackbar(info);
                            } else {
                                let info = {
                                    alertInfo: 'Failed to new user',
                                    color: 'error'
                                };
                                self.$Snackbar(info);
                            }
                        });
                    }
                } else {
                    if (self.$refs.form.validate()) {
                        self.$request.post(self.$store.state.addMenu, params, function(data) {
                            if(data.code == 200) {
                                let info = {
                                    alertInfo: 'New user success',
                                    color: 'success'
                                };
                                self.$Snackbar(info);
                            } else {
                                let info = {
                                    alertInfo: 'Failed to new user',
                                    color: 'error'
                                };
                                self.$Snackbar(info);
                            }
                        });
                    }
                }
                this.close();
                return self.getMenuList();
            }
        }
    }
</script>

<style>
    .menu-container .theme--light .icon {
        color: rgb(177, 177, 176);
    }

    .menu-container .cms-space-line {
        height: 20px;
        background: #eeeeef;
    }

    .menu-container .card {
        background-color: #fff;
        color: rgba(0,0,0,.87);
        padding: 10px 25px;
    }

    .menu-container .breadcrumbs {
        background-color: #fff;
    }
</style>

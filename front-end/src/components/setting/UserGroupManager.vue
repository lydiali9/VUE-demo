<template>
    <div class="user-group-container">

        <v-breadcrumbs divider="/" class="cms-breadcrumbs">
            <span class="group pa-2">
                <v-icon>widgets</v-icon>
            </span>
            <v-breadcrumbs-item v-for="item in breadcrumbs" :key="item.text" :disabled="item.disabled">
            {{ item.text }}
            </v-breadcrumbs-item  >
        </v-breadcrumbs>

        <div class="cms-space-line"></div>
        <v-card>
            <v-card-title>
                <v-btn color="primary" dark slot="activator" class="mb-2" @click="editItem(0)">新增</v-btn>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="用户组名" single-line hide-details v-model="search" class="mt-2"></v-text-field>
            </v-card-title>

            <v-data-table :headers="headers" :items="userGroupItems" :search="search">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.id }}</td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.menu_limit }}</td>
                    <td class="justify-center layout px-0">
                        <v-btn icon class="mx-0" @click="editItem(props.item)">
                            <v-icon color="teal">edit</v-icon>
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
                                    <v-text-field label="用户组" v-model="editedItem.name" :rules="usergroupRules" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout wrap>
                                <v-flex xl>
                                    <label class="label-scenario">用户组描述</label>
                                    <el-tree :data="usergroupConfigurations" show-checkbox node-key="id" :default-expanded-keys="[1]" :props="defaultProps" :default-checked-keys="defaultCheckedKeys" ref="tree">
                                    </el-tree>
                                </v-flex>
                            </v-layout>

                            <v-layout wrap>
                                <v-flex xl>
                                    <v-select label="产品名称" :items="product_limit" v-model="product"  multiple :rules="[() => product.length > 0 || 'You must choose at least one']" item-value="product_id" item-text="name" required></v-select>
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
                breadcrumbs: [
                    {
                      text: '用户组管理',
                      disabled: false
                    }
                ],
                headers: [
                    { text: '编号', value: 'id', align: 'center', sortable: false },
                    { text: '用户组', value: 'name', align: 'center', sortable: false },
                    { text: '描述', value: 'menu_limit', align: 'center', sortable: false },
                    { text: '操作', value: 'operation', align: 'center', sortable: false}
                ],
                search: '',
                userGroupItems: [],
                dialog: false,
                editedIndex: -1,
                editedItem: {
                    name: ''
                },
                product: [],
                menu_limit: [],
                product_limit: [],
                usergroupConfigurations: [],
                defaultProps: {
                    'label': 'label',
                    'children': 'children'
                },
                valid: true,
                usergroupRules: [
                    v => !!v || 'Usergroup name is required',
                    v => (v && v.length <= 20) || 'Usergroup name must be less than 20 characters'
                ],
                defaultCheckedKeys: [],
                defaultItem: {}
            }
        },

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增' : '编辑';
            }
        },

        watch: {
            dialog (val) {
                val || this.close();
            }
        },

        created () {
            let self = this;
            self.getUserGroup();
        },

        methods: {
            getUserGroup() {
                let self = this;
                self.userGroupItems = [];

                self.$request.post(self.$store.state.userList, { 'type': 1 }, function(data) {
                    if(200 == data.code) {
                        data.data.forEach(function(val) {
                            let menu_limit = val.menu_limit && JSON.parse(val.menu_limit).length > 0 ? JSON.parse(val.menu_limit) : [];
                            menu_limit = menu_limit.join(',');
                            let product_limit = JSON.parse(val.product_limit);

                            let userGroupItems = {
                                id: val.id,
                                name: val.name,
                                menu_limit: menu_limit,
                                product_limit: product_limit,
                                create_time: val.create_time ? self.$utils.formatDate(new Date(parseInt(val.create_time)), 'yyyy-MM-dd hh:mm:ss') : ''
                            };
                            self.userGroupItems.push(userGroupItems);
                        });
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
                self.dialog = true;
                self.editedIndex = self.userGroupItems.indexOf(item);
                self.editedItem = Object.assign({}, item);
                self.menu_limit = item.menu_limit ? item.menu_limit.split(',') : [];

                self.getProductList();
                self.getMenuList();

                if (this.editedIndex > -1) {
                    self.product = item.product_limit;
                }
            },

            getProductList() {
                let self = this;
                self.product_limit = [];

                self.$request.post(self.$store.state.getProductList, {}, function(data) {
                    if(data.code == 200) {
                        self.product_limit = data.data;
                        console.log(self.product_limit);
                    }
                });
            },

            getMenuList() {
                let self = this;
                self.usergroupConfigurations = [];

                self.$request.post(self.$store.state.userList, { 'type': 2 }, function(data) {

                    if(200 == data.code) {

                        let moduleItems = [];
                        let selectedKey = [];

                        data.data.forEach(function(val, index) {
                            switch (val.type){
                                case 0:
                                    moduleItems.push({
                                        id: val.id,
                                        group: val.group,
                                        label: val.name,
                                        children: []
                                    })
                                    break;
                            }
                        });
                        data.data.forEach(function(val, index) {
                            switch (val.type){
                                case 1:
                                    moduleItems.forEach(function (item) {
                                        if(item.group == val.group){
                                            item.children.push({
                                                id: val.id,
                                                page: val.page,
                                                label: val.name,
                                                children: []
                                            })
                                        }
                                    })
                                    break;
                                case 2:
                                    break;
                            }
                        });
                        data.data.forEach(function(val, index) {
                            switch (val.type){
                                case 2:
                                    moduleItems.forEach(function (item) {
                                        if(item.group == val.group){
                                            item.children.forEach(function (chil) {
                                                if(chil.page == val.page){
                                                    chil.children.push({
                                                        id: val.id,
                                                        num: val.num,
                                                        label: val.name
                                                    })
                                                }
                                            })
                                        }
                                    })
                                    break;
                            }
                        });

                        self.usergroupConfigurations = self.usergroupConfigurations.concat(moduleItems);
                        self.usergroupConfigurations.forEach(function(val) {
                            if(self.menu_limit.indexOf(val.id.toString()) > -1 && val.children.length > 0) {
                                self.menu_limit.splice(self.menu_limit.indexOf(val.id.toString()), 1);
                            }
                        });
                        setTimeout(function () {
                            self.$refs.tree.setCheckedKeys(self.menu_limit);
                        }, 50);
                    }
                });
                return true;
            },

            close () {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                    self.$refs.tree.setCheckedKeys([]);
                    self.$refs.form.reset();
                }, 300);
            },

            save() {
                let self = this;
                delete self.editedItem.menu_limit;
                delete self.editedItem.product_limit;

                self.menu_limit = self.$refs.tree.getCheckedKeys();

                self.usergroupConfigurations.forEach(function(item) {
                    item.children.forEach(function(val) {
                        if (self.menu_limit.indexOf(val.id) > -1) {
                            self.menu_limit.push(item.id)
                        }

                        val.children.forEach(function(child) {
                            if(self.menu_limit.indexOf(child.id) > -1) {
                                self.menu_limit.push(item.id)
                            }
                        });
                    });
                });

                self.menu_limit = Array.from(new Set(self.menu_limit));
                var params = Object.assign({ 'menu_limit': self.menu_limit, 'product_limit': self.product }, self.editedItem);

                if (this.editedIndex > -1) {
                    if (this.$refs.form.validate()) {
                        self.$request.post(self.$store.state.updateUserGroup, params, function(data) {
                            if(data.code == 200) {
                                let info = {
                                    alertInfo: 'Edit user success',
                                    color: 'success'
                                };
                                self.$Snackbar(info);
                            } else {
                                let info = {
                                    alertInfo: data.msg ? data.msg : 'Failed to update the user',
                                    color: 'error'
                                };
                                self.$Snackbar(info);
                            }
                        });
                    }
                } else {
                    if (this.$refs.form.validate()) {
                        self.$request.post(self.$store.state.addUserGroup, params, function(data) {
                            if(data.code == 200) {
                                let info = {
                                        alertInfo: 'Edit user success',
                                        color: 'success'
                                };
                                self.$Snackbar(info);
                            } else {
                                let info = {
                                    alertInfo: data.msg ? data.msg : 'Failed to update the user',
                                    color: 'error'
                                };
                                self.$Snackbar(info);
                            }
                        });
                    }
                }
                this.close();
                return self.getUserGroup();
            }
        }
    }
</script>

<style>
    .user-group-container .theme--light .icon {
        color: rgb(177, 177, 176);
    }

    .user-group-container .cms-space-line {
        height: 20px;
        background: #eeeeef;
    }

    .user-group-container .label-scenario {
        font-size: 16px;
        color: rgba(0,0,0,.54);
    }

    .user-group-container .card {
        background-color: #fff;
        color: rgba(0,0,0,.87);
        padding: 10px 25px;
    }

    .user-group-container .breadcrumbs {
        background-color: #fff;
    }

    .user-group-container .el-tree {
        cursor: default;
        background: #fff;
        color: #606266;
        height: 350px;
        overflow-y: auto;
        border: 1px solid #dcdfe4;
    }
</style>

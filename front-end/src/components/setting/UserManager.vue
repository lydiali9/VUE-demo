<template>
    <div class="user-container">

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
                <v-text-field append-icon="search" label="用户名称" single-line hide-details v-model="search" class="mt-2"></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="userItems" :search="search" :pagination.sync="pagination">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.id }}</td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.create_time }}</td>
                    <td class="text-xs-center">{{ props.item.login_time }}</td>
                    <td class="text-xs-center">{{ props.item.login_ip }}</td>
                    <td class="text-xs-center">{{ props.item.login_count }}</td>
                    <td class="text-xs-center">{{ props.item.group }}</td>
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
                                <v-flex xl10>
                                    <v-text-field label="用户名" v-model="editedItem.name" :rules="rules.username" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout wrap v-if="showPwd">
                                <v-flex xl10>
                                    <v-text-field label="密码" v-model="editedItem.password" :rules="rules.password" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout wrap>
                                <v-flex xl10>
                                    <v-select label="所属用户组" :items="userConfigurations" v-model="group" multiple chips persistent-hint></v-select>
                                </v-flex>
                            </v-layout>

                            <v-layout wrap>
                                <v-flex xl10>
                                    <v-text-field label="描述" v-model="editedItem.des"></v-text-field>
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
                      text: '用户管理',
                      disabled: false
                    }
                ],
                search: '',
                headers: [
                    { text: '编号', value: 'id', align: 'center', sortable: false },
                    { text: '用户名', value: 'name', align: 'center', sortable: false },
                    { text: '创建日期', value: 'create_time', align: 'center' },
                    { text: '最后登录时间', value: 'login_time', align: 'center' },
                    { text: '最后登录IP', value: 'login_ip', align: 'center', sortable: false },
                    { text: '登录次数', value: 'login_count', align: 'center' },
                    { text: '所属用户组', value: 'group', align: 'center', sortable: false },
                    { text: '操作', value: 'operation', align: 'center', sortable: false }
                ],
                userItems: [],
                dialog: false,
                valid: true,
                showPwd: true,
                rules: {
                    username: [
                        v => !!v || 'Username is required',
                        v => (v && v.length <= 20) || 'Username must be less than 20 characters'
                    ],
                    password: [
                        v => !!v || 'password is required'
                    ]
                },
                defaultItem: {},
                editedItem: {
                    name: '',
                    password: '',
                    des: ''
                },
                group: [],
                userConfigurations: [],
                pagination: {
                    descending: true,
                    sortBy: 'create_time'
                }
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
            self.getUserList();
        },

        methods: {
            getUserList() {
                let self = this;
                self.userItems = [];

                self.$request.post(self.$store.state.userList, { 'type': 0 }, function(data) {
                    if(200 == data.code) {
                        data.data.forEach(function(val) {
                            var group = val.group ? JSON.parse(val.group) : [];
                            var userItems = {
                                'id': val.id,
                                'name': val.name,
                                'create_time': val.create_time ? self.$utils.formatDate(new Date(parseInt(val.create_time)), 'yyyy-MM-dd hh:mm:ss') : '',
                                'login_time': val.login_time ? self.$utils.formatDate(new Date(parseInt(val.login_time)), 'yyyy-MM-dd hh:mm:ss') : '',
                                'login_ip': val.login_ip,
                                'login_count': val.login_count,
                                'des': val.des,
                                'password': val.password,
                                'group': group && group.length > 0 ? group.join() : ""
                            };
                            self.userItems.push(userItems);
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

                self.editedIndex = this.userItems.indexOf(item);
                if(self.editedIndex > -1) {
                    self.showPwd = false;
                } else {
                    self.showPwd = true;
                }
                self.editedItem = Object.assign({}, item);
                self.group = item.group ? item.group.split(',') : [];
                self.getUserGroupList();
            },

            getUserGroupList() {
                let self = this;

                self.$request.post(self.$store.state.userList, { 'type': 1 }, function(data) {

                    if(200 == data.code) {
                        data.data.forEach(function(val) {
                            self.userConfigurations.push(val.name);
                        });
                    }
                });
                return true;
            },

            deleteItem(item) {
                let self = this;

                self.$request.post(self.$store.state.delUser, Object.assign({ 'type': 0 }, item), function(data) {
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
                return self.getUserList();
            },

            close() {
                let self = this;

                self.dialog = false;
                setTimeout(() => {
                    self.editedItem = Object.assign({}, self.defaultItem);
                    self.editedIndex = -1;
                    self.$refs.form.reset()
                }, 300);
            },

            save() {
                let self = this;

                if (self.editedIndex > -1) {
                    if (this.$refs.form.validate()) {
                        delete self.editedItem.group;
                        let password = self.createMd5Str(self.editedItem.password);
                        delete self.editedItem.password;
                        var params = Object.assign({ 'group': self.group, 'password': password }, self.editedItem);

                        self.$request.post(self.$store.state.updateUser, params, function(data) {
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
                        let password = self.createMd5Str(self.editedItem.password);
                        delete self.editedItem.password;
                        var params = Object.assign({ 'group': self.group, 'password': password }, self.editedItem);

                        self.$request.post(self.$store.state.addUser, params, function(data) {
                            if(data.code == 200) {
                                let info = {
                                    alertInfo: 'New user success',
                                    color: 'success'
                                };
                                self.$Snackbar(info);
                            } else {
                                let info = {
                                    alertInfo: data.msg ? data.msg : 'Failed to new user',
                                    color: 'error'
                                };
                                self.$Snackbar(info);
                            }
                        });
                    }
                }
                self.close();
                return self.getUserList();
            },

            createMd5Str(str) {
                var hasher = crypto.createHash("md5");
                hasher.update(str);
                return hasher.digest('hex');
            }
        }
    }
</script>

<style>
    .user-container .theme--light .icon {
        color: rgb(177, 177, 176);
    }

    .user-container .cms-space-line {
        height: 20px;
        background: #eeeeef;
    }

    .user-container .card {
        background-color: #fff;
        color: rgba(0,0,0,.87);
        padding: 10px 25px;
    }

    .user-container .breadcrumbs {
        background-color: #fff;
    }
</style>

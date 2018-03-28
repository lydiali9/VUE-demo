<template>
    <v-container fluid fill-height class="login-wrap">
        <v-layout align-center justify-center column>
            <h3 class="mb-5 ms-title font-color">管理系统</h3>
            <v-card width="400px" color="white">
                <v-card-text>
                    <v-form v-model="valid" ref="ruleForm">
                        <v-text-field label="username" v-model="ruleForm.username" :rules="rules.username" required></v-text-field>
                        <v-text-field label="password" v-model="ruleForm.password" :rules="rules.password" @keyup.enter.native="submitForm" required type="password"></v-text-field>
                        <v-btn block @click="submitForm" color="blue darken-4">登录</v-btn>
                        <div class="login-err">{{err}}</div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-layout>
    </v-container>
</template>


<script>
    import crypto from "crypto";
    export default {
        data: function () {
            return {
                valid: false,
                err: "",
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [(value) => !!value || 'username is required'],
                    password: [(value) => !!value || 'password is required']
                }
            }
        },

        created () {
            let self = this;
        },
        methods: {
            submitForm() {
                const self = this;
                self.err = "";

                if(self.$refs.ruleForm.validate()) {
                    let password = self.createMd5Str(self.ruleForm.password);
                    self.$request.post(self.$store.state.login, {
                        user: self.ruleForm.username,
                        password: password
                    }, function (data) {
                        if (200 == data.code) {
                            let dataAll = data.data;
                            self.$store.commit("GenerateUserInfo", dataAll.menu_limit);
                            localStorage.setItem('user', dataAll.user);
                            self.setCookie('user', dataAll.user, 3);
                            self.setCookie('isLogin', dataAll.isLogin, 3);
                            self.setCookie('token', dataAll.token, 3);
                            self.setCookie('accessedMenusCatch', JSON.stringify(self.$store.state.user.accessedMenusCatch), 3);
                            self.$router.push({path: '/articleManager'})
                        } else {
                            self.err = data.msg;
                        }
                        self.dialogFormVisible = false;
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            },

            createMd5Str(str){
                var hasher = crypto.createHash("md5");
                hasher.update(str);
                return hasher.digest('hex');
            }
        }
    }
</script>


<style>
    .login-err {
        padding-top: 10px;
        color: red;
    }

    .login-wrap {
        background-color: #fff;
    }

    .ms-title {
        text-align: center;
        font-size: 30px;
        color: #fff;
    }

    .font-color {
        color: #0D47A1;
    }
</style>

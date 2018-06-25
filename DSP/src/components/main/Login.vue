<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin">
                <div class="manage_tip">
                    <p>elm后台管理系统</p>
                </div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
                    </el-form-item>
                </el-form>
                <p class="tip">温馨提示：</p>
                <p class="tip">未登录过的新用户，自动注册</p>
                <p class="tip">注册过的用户可凭账号密码登录</p>
            </section>
        </transition>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        data(){
            return {
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                },
                showLogin: false,
            }
        },
        mounted(){
            this.showLogin = true;
            if (!this.adminInfo.id) {
                this.getAdminData()
            }
        },
        computed: {
            ...mapState(['adminInfo']),
        },
        methods: {
            ...mapActions(['getAdminData']),
            async submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await login({user_name: this.loginForm.username, password: this.loginForm.password})
                        if (res.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '登录成功'
                            });
                            this.$router.push('manage')
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                        }
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请输入正确的用户名密码',
                            offset: 100
                        });
                        return false;
                    }
                });
            },
        },
        watch: {
            adminInfo: function (newValue){
                if (newValue.id) {
                    this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
                    this.$router.push('manage')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/style/color.scss';

    .login_page{
        background-color: #324057;
    }
    .manage_tip{
        position: absolute;
        width: 100%;
        top: -100px;
        left: 0;
        p{
            font-size: 34px;
            color: #fff;
        }
    }
    .form_contianer{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 160px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff; 
        text-align: center;
        background-color: #fff;
        .submit_btn{
            width: 100%;
            font-size: 16px;
        }
    }
    .tip{
        font-size: 12px;
        color: red;
    }
    .form-fade-enter-active, .form-fade-leave-active {
        transition: all 1s;
    }
    .form-fade-enter, .form-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
</style>

<!-- <template>
    <div class="login-wrap">
        <div class="ms-title">DSP</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <div class="login-err">{{err}}</div>
            </el-form>
        </div>
    </div>
</template>


<script>
    import crypto from "crypto";
    export default {
        data: function () {
            return {
                err: "",
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },

        created () {
            let self = this;
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.err = "";
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        let password = self.createMd5Str(self.ruleForm.password);
                        self.$request.post(self.$store.state.login, {
                            user: self.ruleForm.username,
                            password: password
                        }, function (data) {
                            if (200 == data.code) {
                                let d = data.data;
                                self.$store.commit("GenerateUserInfo", d);

                                self.setCookie('user', d.user, 3);
                                self.setCookie('isLogin', d.isLogin, 3);
                                self.setCookie('token', d.token, 3);
                                self.setCookie('accessedMenusCatch', JSON.stringify(self.$store.state.user.accessedMenusCatch), 3);
                                let tmpStr = self.$store.state.user.accessedMenus[0];
                                tmpStr = tmpStr ? (tmpStr.subs && tmpStr.subs.length > 0 ? tmpStr.subs[0].index : tmpStr.index) : "";
                                self.$router.push({path: '/' + tmpStr})
                            } else {
                                self.err = data.msg;
                            }
                            self.dialogFormVisible = false;
                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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
    .login-wrap {
        width: 100%;
        height: 100%;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;

    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 160px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }

    .login-err {
        padding-top: 10px;
        color: red;
    }
</style>
 -->
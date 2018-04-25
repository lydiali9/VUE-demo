<template>
    <v-container grid-list-md text-xs-center>
        <v-form>
            <v-layout row wrap>
                <v-flex xs10>
                    <v-text-field
                        label="Keyword"
                        v-model="keyword"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs2>
                    <v-btn color="primary" slot="activator" class="mb-2 button"  @click="search">search</v-btn>
                </v-flex>
            </v-layout>
        </v-form>


        <v-list two-line v-if="infoItems.length > 0" class="card-list">
            <template v-for="(item, index) in infoItems">
                <v-list-tile avatar ripple @click="toggle(item)" :key="item.name"
                >
                    <v-list-tile-content>
                        <v-container fluid>
                            <v-layout row>
                                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs6 order-lg2>
                                    <v-list-tile-sub-title class="text--primary">工商注册号: </v-list-tile-sub-title>
                                </v-flex>
                                <v-flex xs6>
                                    <v-list-tile-sub-title>{{ item.idCardOrOrgCode }}</v-list-tile-sub-title>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-container>
</template>

<script>
    import crypto from "crypto";
    import loginBgAnimation from "../../../components/background/LoginBgAnimation";

    export default {
        data: function () {
            return {
                keyword: '',
                infoItems: []
            }
        },

        created () {
            let self = this;
        },
        methods: {
            getInfoList(params) {
                let self = this;

                return new Promise((resolve, reject) => {
                    self.$request.postPromise(self.$store.state.getInfo, params)
                        .then((response) => {
                            if (response.status == '200' && response.data.code == '200') {
                                resolve(response.data.data);
                            } else {
                                reject(response.data.msg)
                            }
                        }).catch((error) => {
                            reject(error);
                        });
                });
            },

            search() {
                let self = this;
                let params = {keyword : self.keyword};

                self.getInfoList(params)
                    .then((result) => {

                        let data = JSON.parse(result);

                        if(data && data.data && data.data.results && data.data.results.length > 0) {
                            self.infoItems = data.data.results;
                        }
                    }).catch(error => {
                        let info = {
                            alertInfo: error ? error.toString() : '',
                            color: 'error'
                        };
                        this.$Snackbar(info);
                    });
            },

            getInfoDetail(params) {
                let self = this;

                return new Promise((resolve, reject) => {
                    self.$request.postPromise(self.$store.state.getInfoDetail, params)
                        .then((response) => {
                            if (response.status == '200' && response.data.code == '200') {
                                resolve(response.data.data);
                            } else {
                                reject(response.data.msg)
                            }
                        }).catch((error) => {
                            reject(error);
                        });
                });
            },

            toggle(item) {
                let self = this;
                if(item.encryStr) {
                    item.encryStr.substr(-1);
                }

                let params = {
                    encryStr: item.encryStr,
                    name: item.name ? item.name : ''
                };
                self.getInfoDetail(params)
                    .then((result) => {
                        let data = JSON.parse(result);
                        if(data && data.result) {
                            console.log(data.result)
                        }
                    }).catch(error => {
                        let info = {
                            alertInfo: error ? error.toString() : '',
                            color: 'error'
                        };
                        this.$Snackbar(info);
                    });
            }
        }
    }
</script>

<style>
    .button {
        float: right;
    }
    .card-list div:first{
        border-bottom: 1px solid #c5c2c2;
    }
</style>

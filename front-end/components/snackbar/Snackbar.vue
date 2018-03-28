<template>
    <v-card>
        <v-snackbar
            :timeout="timeout"
            :color="color"
            v-model="snackbar"
            top>
            {{ alertInfo }}
            <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
                snackbar: false,
                color: '',
                timeout: 6000,
                alertInfo: ''
            }
        },

        created() {
            var self = this;
            self.initConfig();
        },

        methods: {
            initConfig() {
            }
        }
    }
</script>

<style>
</style>


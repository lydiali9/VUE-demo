import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/main/Login';
import Home from '@/components/main/Home';

import Index from '@/components/home/index';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: '/index',
                    component: Index,
                }
            ]
        }
    ]
})

import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/main/Login';
import Home from '@/components/main/Home';

// Setting component
import UserManager from '@/components/setting/UserManager';
import UserGroupManager from '@/components/setting/UserGroupManager';
import MenuManager from '@/components/setting/MenuManager';
import CrawlerManager from '../components/crawler/crawlerManager'


Vue.use(Router);

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
                    path: '/userManager',
                    component: UserManager,
                },
                {
                    path: '/UserGroupManager',
                    component: UserGroupManager
                },
                {
                    path: '/menuManager',
                    component: MenuManager,
                },
                {
                    path: '/crawlerManager',
                    component: CrawlerManager
                }
            ]
        }
    ]
})

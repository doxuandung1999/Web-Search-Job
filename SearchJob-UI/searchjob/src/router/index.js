import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode : "history",
    routes: [
        // {path : '/' , component: HelloWorld}
        {
            path : "/register",
            name : "register",
            component : () => import ('@/components/users/Register.vue')
        },
        {
            path : "/login",
            name : "login",
            component : () => import (/* webpackChunkName: "component-C" */'@/components/users/Login.vue')
        },
        {
            path : "/home",
            name : "home",
            component : () => import ('@/components/Home.vue'),
            redirect : '/home/job',
            children: [
                {
                    path : "job",
                    name: "job",
                    component : () => import ('@/components/pages/JobPage.vue'),
                },
                {
                    path : "job-care",
                    name: "job-care",
                    component : () => import ('@/components/pages/JobCarePage.vue'),
                },
                {
                    path : "company",
                    name: "company",
                    component : () => import ('@/components/pages/CompanyPage.vue'),
                },
                {
                    path : "recruit",
                    name: "recruit",
                    component : () => import ('@/components/pages/RecruitPage.vue'),
                },

            ]
        },

        {
            path : "**",
            redirect : 'home/job'
        },
        
    ]
});
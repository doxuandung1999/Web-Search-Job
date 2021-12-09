import Vue from 'vue';
import Router from 'vue-router';
import CompanyPage from '@/components/pages/CompanyPage.vue';
import RecruitPage from '@/components/pages/RecruitPage.vue';
import JobCarePage from '@/components/pages/JobCarePage.vue';
import ManageJob from '@/components/pages/ManageJob.vue';
import JobPage from '@/components/pages/JobPage.vue';
import Home from '@/components/Home.vue';
import Register from '@/components/users/Register.vue';
import Login from '@/components/users/Login.vue';

Vue.use(Router);

export default new Router({
    mode : "history",
    routes: [
        // {path : '/' , component: HelloWorld}
        {
            path : "/register",
            name : "register",
            component : Register
        },
        {
            path : "/login",
            name : "login",
            component : Login
        },
        {
            path : "/home",
            name : "home",
            component : Home,
            redirect : '/home/job',
            children: [
                {
                    path : "job",
                    name: "job",
                    component : JobPage,
                },
                {
                    path : "job/:jobID",
                    name: "job-detail",
                    component : () => import ('@/components/pages/JobPageDetail.vue'),
                },
                {
                    path : "job-care",
                    name: "job-care",
                    component : JobCarePage,
                },
                {
                    path : "company",
                    name: "company",
                    component : CompanyPage,
                },
                {
                    path : "company/:companyID",
                    name: "company-detail",
                    component : () => import ('@/components/pages/CompanyPageDetail.vue'),
                },
                {
                    path : "recruit",
                    name: "recruit",
                    component : RecruitPage,
                },
                {
                    path : "recruit/:PostID",
                    name: "recruit-edit",
                    component : () => import ('@/components/pages/RecruitPageEdit.vue'),
                },
                {
                    path : "manage",
                    name: "manage",
                    component : ManageJob,
                },

            ]
        },

        {
            path : "**",
            redirect : 'home/job'
        },
        
    ]
});
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../view/Login.vue';
import SingUp from '../view/SingUp.vue';
import JobList from '../view/JobList.vue';
import JobDetail from '../view/JobDetail.vue';
import JobPost from '../view/JobPost.vue';
import UserProfile from '../view/UserProfile.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/singup', component: SingUp },
    { path: '/joblist', component: JobList },
    { path: '/jobdetail', component: JobDetail },
    { path: '/jobpost', component: JobPost },
    { path: '/userprofile', component: UserProfile },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;


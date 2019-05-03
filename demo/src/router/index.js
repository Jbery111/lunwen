import Vue from 'vue'
import VueRouter from 'Vue-router';
Vue.use(VueRouter);

import Attr from '../components/index/Attr';
import Topic from '../components/Topic';
import Food from '../components/index/Food';
import Recreation from '../components/index/Recreation';
import Accommodation from '../components/index/Accommodation';
import Release from '../components/Release';
import Index from '../components/index/Index';
import Personal from '../components/personal';
import Register from    '../components/Register';
import Login from    '../components/login1';
import TopicDetail from '../components/TopicDetail';
const routes = [
    {path:'/index',component:Index,children:[
        {path:'/index/attr',component:Attr},
        {path:'/index/food',component:Food},
        {path:'/index/recreation',component:Recreation},
        {path:'/index/accommodation',component:Accommodation}
    ]},
    {path:'/personal',component:Personal},
    {path:'/topic',component:Topic},
    {path:'/release',component:Release},
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/topicDetail',component:TopicDetail},

];
const router = new VueRouter({
    routes
   })
   
export default router;


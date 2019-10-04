import Vue from 'vue';
import VueRouter from 'vue-router';
import KakaoMap from '../views/KakaoMap.vue';
import LoginPage from '../views/LoginPage.vue';
import MyPage from '../views/MyPage.vue';
import QRcodeShow from '../views/QRcodeShow.vue';
import SignIn from '../views/SignIn.vue';

Vue.use(VueRouter);


export const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path: '/',
            redirect: '/qrcode'
        },
        {
            path:'/map',
            component: KakaoMap
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/mypage',
            component: MyPage
        },
        {
            path: '/qrcode',
            component: QRcodeShow
        },
        {
            path: '/signin',
            component: SignIn
        },
    ]
})
import Vue from "vue"
import VueRouter from "vue-router"
import QRcodeShow from "../views/QRcodeShow.vue"
import LoginPage from "../views/LoginPage.vue"
import KakaoMap from '../views/KakaoMap.vue'
import MyPage from '../views/MyPage.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "qrcode",
    component: QRcodeShow
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage
  },
  {
    path: '/map',
    component: KakaoMap
  },
  {
    path: "/qrcode",
    name: "qrcode",
    component: QRcodeShow
  },
  {
    path: '/mypage',
    component: MyPage
  },
  {
    path: '/signup',
    component: SignUp
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router

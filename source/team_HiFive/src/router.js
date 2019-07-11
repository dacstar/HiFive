import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PostPage from './views/PostPage.vue'
import PortfolioPage from './views/PortfolioPage.vue'
import PortfolioWritePage from './views/PortfolioWritePage.vue'
import LoginPage from './views/LoginPage.vue'
import Vuetify from 'vuetify'
import BackToTop from 'vue-backtotop'
import VueSimplemde from 'vue-simplemde'

Vue.use(Router)
Vue.use(Vuetify)
Vue.use(BackToTop)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage
		},
		{
			path: '/post',
			name: 'post',
			component: PostPage
		},
		{
			path: '/portfolio',
			name: 'portfolio',
			component: PortfolioPage
		},
		{
			path: '/login',
			name: 'login',
			component: LoginPage
		},
    {
      path: '/portfoliowrite',
      name: 'portfoliowrite',
      component: PortfolioWritePage
    }
  ]
})

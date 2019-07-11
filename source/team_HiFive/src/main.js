import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import 'font-awesome/css/font-awesome.min.css'
import '@mdi/font/css/materialdesignicons.css'
import lineClamp from 'vue-line-clamp'
import BrowserDetect from 'vue-browser-detect-plugin';
import "vue-browser-detect-plugin/dist/vue-browser-detect-plugin.umd.js"

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(BrowserDetect)

Vue.use(Vuetify, {
	iconfont: 'fa',
	theme: {
		primary: '#3f51b5',
		secondary: '#b0bec5',
		accent: '#8c9eff',
		error: '#b71c1c'
	}
})

Vue.use(Vuetify, {
  iconfont: 'mdi'
})

Vue.use(lineClamp, {

})

Vue.use(VueSimplemde)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

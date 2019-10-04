<<<<<<< HEAD
import Vue from 'vue';
import App from './App.vue';
import {router} from './router/index.js';

Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  router,
=======
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  render: h => h(App),
>>>>>>> 80cbe27ac1c100cbac878a398b2a225d2bf232e3
}).$mount('#app')

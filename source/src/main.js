import Vue from 'vue';
import App from './App.vue';
import {router} from './routes/index.js';
import firebase from 'firebase';
import { store } from './store'

Vue.config.productionTip = false

// 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('d5e4fbca80b67f3a6a75614545dd6b7b');

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

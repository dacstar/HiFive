import Vue from 'vue';
import App from './App.vue';
import {router} from './routes/index.js';
import firebase from 'firebase';
import { store } from './store'

Vue.config.productionTip = false

// Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyCtqNi6kMaZ9Wp2ntYdMzeyzMLWnf48YTg",
//   authDomain: "hifive-211dd.firebaseapp.com",
//   databaseURL: "https://hifive-211dd.firebaseio.com",
//   projectId: "hifive-211dd",
//   storageBucket: "hifive-211dd.appspot.com",
//   messagingSenderId: "734773107278",
//   appId: "1:734773107278:web:79eab00ba8c03a1b"
// };

        // 사용할 앱의 JavaScript 키를 설정해 주세요.
        Kakao.init('d5e4fbca80b67f3a6a75614545dd6b7b');
        


// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue';
import App from './App.vue';
import {router} from './routes/index.js';
import firebase from 'firebase';
import { store } from './store'

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCtqNi6kMaZ9Wp2ntYdMzeyzMLWnf48YTg",
  authDomain: "hifive-211dd.firebaseapp.com",
  databaseURL: "https://hifive-211dd.firebaseio.com",
  projectId: "hifive-211dd",
  storageBucket: "hifive-211dd.appspot.com",
  messagingSenderId: "734773107278",
  appId: "1:734773107278:web:79eab00ba8c03a1b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

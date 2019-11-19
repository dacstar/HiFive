import Vue from "vue"
import Vuex from "vuex"
import db from "@/FirebaseService"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 여기에 컴포넌트 간에 공유할 변수 선언
    // ex) hifiveCnt : 0
    // 접근은 각 컴포넌트에서 this.$store.state.hifiveCnt 로 사용가능합니다

    // QRCode와 관련된 데이터
    // QRcode_Lat : 위도, QRcode_Lon : 경도, QRcode_Store_id : 상점 식별자
    QRcode_Store: {
      id: 0,
      lat: 0,
      lon: 0
    },
    X: 0,
    Y: 0,
    user_test_img: "",
    isLogin: false,
    user_nickname: "",
    isValid: undefined,
    stores: [],
    kakaomap: undefined
  },
  mutations: {
    increment(state) {
      state.QRcode_Lat++
    },
    doubleY(state, Y) {
      state.Y = Y
    },
    doubleX(state, X) {
      state.Y = X
    },
    SET_STORES(state, data) {
      state.stores.push(data)
    },
    SET_STORE(state, data) {
      state.stores = data
    },
    SET_MAP(state, map) {
      state.kakaomap = map
    },
    SET_STOREINFO(state, store) {
      if (store.startsWith("{")) {
        state.QRcode_Store = JSON.parse(store)
        state.isValid = true
      } else {
        state.QRcode_Store = ""
        state.isValid = false
      }
    }
  },
  actions: {
    // 상점 리스트를 가져오는 함수입니다.
    // FETCH_STORES(context){
    FETCH_STORES({ commit }) {
      db.collection("stores")
        .get()
        .then(function(Snapshot) {
          Snapshot.forEach(function(store) {
            commit("SET_STORES", store.data())
          })
        })
    },

    READ_QRCODE(context, content) {
      console.log("READ_QRCODE: " + content)
      context.commit("SET_STOREINFO", content)
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        // 여기에 컴포넌트 간에 공유할 변수 선언
        // ex) hifiveCnt : 0
        // 접근은 각 컴포넌트에서 this.$store.state.hifiveCnt 로 사용가능합니다
    }
});
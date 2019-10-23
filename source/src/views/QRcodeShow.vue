<template>
  <div>
    <p class="decode-result">
      좋은하루입니다! 하이파이브할까요?:
      <b>{{ result }}</b>
    </p>

    <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
      <div v-if="validationSuccess" class="validation-success">
        <router-link
          v-if="this.$store.state.user_nickname!=''"
          to="/mypage"
          class="accepted"
        >하이파이브 하시겠습니까??????? 마이페이지로</router-link>
        <router-link v-else to="/login" class="accepted">하이파이브 하시겠습니까 로그인 페이지로</router-link>
      </div>

      <div v-if="validationFailure" class="validation-failure">
        1. 8시간 이내에 인식하신적이 있습니까?
        2. 장소 내에 있습니까?
        아니라면 고객센터에 연락주세요.
      </div>

      <div v-if="validationPending" class="validation-pending">
        8시간 이내에 인식하신적이 있는지, 혹은 장소 내에 있는지 분석중입니다...
        잠시만 기다려주세요.
      </div>
    </qrcode-stream>
    <div class="recommend" v-if="this.$store.state.user_nickname==''">
      아직 회원이 아니신가요?
      <a href="/login" class="loginmove">로그인하기</a>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {

  components: { QrcodeStream },

  data() {
    return {
      isValid: undefined,
      camera: 'auto',
      result: null,
    }
  },

  computed: {
    validationPending() {
      return this.isValid === undefined
        && this.camera === 'off'
    },

    validationSuccess() {
      return this.isValid === true
    },

    validationFailure() {
      return this.isValid === false
    },


  },

  methods: {

    onInit(promise) {
      promise
        .catch(console.error)
        .then(this.resetValidationState)
    },

    resetValidationState() {
      this.isValid = undefined
    },

    async onDecode(content) {

      // content : 하이파이브 하시겠습니까?? 
      console.log(content)
      this.result = content
      this.turnCameraOff()

      // QRCODE READER
      this.$store.dispatch('READ_QRCODE', content);

      // pretend it's taking really long
      // 일치하는지 유효성 검사하는 곳
      await this.timeout(3000)
      this.isValid = content.startsWith('h')

      // some more delay, so users have time to read the message
      await this.timeout(2000)

      this.turnCameraOn()
    },

    turnCameraOn() {
      this.camera = 'auto'
    },

    turnCameraOff() {
      this.camera = 'off'
    },

    timeout(ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }
  }
}
</script>

<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>
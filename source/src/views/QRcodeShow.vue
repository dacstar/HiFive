<template>
<<<<<<< HEAD
  <q-rcode-scan></q-rcode-scan>
=======
  <div class="container">
    <p class="decode-result">
      좋은 하루입니다! 하이파이브할까요?<br>
      <b>주소 : {{ result }}</b>
    </p>

    <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit" id="qrcamera">
      
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
      아직 하이파이브 회원이 아니라구요?<br>
      당신을 위한 더 많은 정보가 기다리고 있답니다.<br>
      <a href="/login" class="loginmove">로그인하기</a>
    </div>
  </div>
>>>>>>> b5dacbcec35c592a2d5608546178455ae6785110
</template>

<script>
import QRcodeScan from "../components/QRcodeScan.vue";

export default {
  components: {
    QRcodeScan
  }
}
</script>

<<<<<<< HEAD
<style>
=======
<style scoped>
.decode-result {
  margin-top: 50px;
  margin-bottom: 20px;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 3vh;
}
#qrcamera{
  display: block;
  -o-object-fit: cover;
  object-fit: cover;
  width: 50%;
  height: 100%;
  margin: 0 auto;
}
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

.recommend {
  margin-top: 30px;
}
>>>>>>> b5dacbcec35c592a2d5608546178455ae6785110
</style>
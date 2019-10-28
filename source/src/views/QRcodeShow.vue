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
import db from "@/FirebaseService";

export default {

  components: { QrcodeStream },

  data() {
    return {
      isValid: undefined,
      camera: 'auto',
      result: null,
      userFromDB: [],
      storeFromDB: [],
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
      this.result = content;
      this.turnCameraOff();

      // QRCODE READER
      this.$store.dispatch('READ_QRCODE', content);
      // console.log('#QRcode',this.$store.state.QRcode_Store.id);
      // console.log('#DB USER',this.userFromDB[0].length);
      // console.log('#DB STORE',this.storeFromDB);
      await this.updateUserToDB();

      // 바로 카메라가 켜지지않도록 5초의 시간을 준다
      await this.timeout(5000)

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
    },

    async updateUserToDB() {
      var scope = this;
      console.log('#QRcodeID:',this.$store.state.QRcode_Store.id);
      // DB에서 유저정보 가져오기
      var user = this.$store.state.user_nickname;     // 여기에 사용자 이름 가져와서
      var userDocRef = db.collection("users").doc(user);  
      await userDocRef.get().then(function(doc) {
        if (doc.exists) {
          scope.userFromDB.push(doc.data().store);
        } else {
          console.log("No such User document!");
        }
      }).catch(function(error) {
          console.log("Error getting user document:", error);
      });

      // DB에서 가게정보 가져오기(QRcode에 있는 가게정보)
      var store = this.$store.state.QRcode_Store.id;
      var storeDocRef = db.collection("stores");
      await storeDocRef.where("storeID", "==", String(store))
        .get().then(function(querySnapshot){
          querySnapshot.forEach(function(doc) {
            scope.storeFromDB.push(doc.data);
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

      // await scope.compareUserStore();
    },

    async compareUserStore() {
      var scope = this;
      // 유저정보와 비교해서 있으면 업데이트, 없으면 추가
      var tmp = scope.storeFromDB.storeID;
      var idx = 0;
      var flag = false;
      console.log('tmp:',tmp,' flag:', flag);
      for(var i=0; i < scope.userFromDB[0].length; i++) {
        if (tmp == scope.userFromDB[0][i].storeID) {
          console.log('$compare success')
          flag = true;
          idx = i;
          break;
        }
      }
      
      var user = this.$store.state.user_nickname;
      var userDocRef = db.collection("users").doc(user);
      if (flag) {
        // DB 업데이트
        var props = store[idx].count;
        await userDocRef.update({
          prop : scope.userFromDB[idx].count + 1,
        });
      } else {
        // DB 추가
        var newStore = "{count: 1,lastVisit: {seconds: 1341234123, nanoseconds: 0,}, location: { _lat: 36.34961122142392, _long: 127.2982571051557, }, storeName: '카페니치 한밭대점',}";
        await userDocRef.update({
          store: firebase.firestore.FieldValue.arrayUnion(newStore)
        });
      }

      var storeDocRef = db.collection("stores").doc("store1");
      await storeDocRef.update({
        count: firebase.firestore.FieldValue.increment(1)
      });
    }
    // updateUserToDB(){
    //   var scope = this;
      
    //   var userID = "newUser"; // 사용자 식별자 넣기
    //   var storeDB = [
    //     {
    //         count: count+1, // 기존 userDB에서 가져오기
    //         lastVisit: {    // 현재 시간함수로 가져오기
    //           seconds: 0,
    //           nanoseconds: 0,
    //         },
    //         location: {     // 기존 storeDB에서 가져오기(1)
    //           _lat: 0.0,
    //           _long: 0.0,
    //         },
    //         storeName: "Rom122", // 기존 storeDB에서 가져오기(2)
    //     },
    //     {
    //         count: 1,
    //         lastVisit: {
    //           seconds: 1341234123,
    //           nanoseconds: 0,
    //         },
    //         location: {
    //           _lat: 36.34961122142392, 
    //           _long: 127.2982571051557,
    //         },
    //         storeName: "카페니치 한밭대점",
    //     }
      //     {
          //   title: "카페니치 한밭대점",
          //   latlng: new kakao.maps.LatLng(36.34961122142392, 127.2982571051557),
          //   address: "대전광역시 유성구 학하서로121번길 55-9 1층(덕명동 589-2)",
          //   hifive_count: 78
          // },
    //   ]
    //   var docRef = db.collection("user").doc(userID);
    //   return docRef.update({
    //     store: storeDB,
    //   }).then(function(doc) {
    //     console.log("Document successfully updated!")
    //   }).catch(function(error) {
    //     console.log("Error updating document:", error);
    //   });
    // }
  },
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
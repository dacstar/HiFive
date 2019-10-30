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
        올바른 하이파이브 QRcode가 아닙니다!
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
import firebase from 'firebase/app'

export default {

  components: { QrcodeStream },

  data() {
    return {
      // isValid: undefined,
      camera: 'auto',
      result: null,
      userFromDB: [],
      storeFromDB: [],
    }
  },

  computed: {
    validationPending() {
      // return this.isValid === undefined
      //   && this.camera === 'off'v
      console.log('validationPending');
      return this.$store.state.isValid === undefined
        && this.camera === 'off'
    },

    validationSuccess() {
      // return this.isValid === true
      console.log('validationSuccess');
      return this.$store.state.isValid === true
    },

    validationFailure() {
      // return this.isValid === false
      console.log('validationFailure');
      return this.$store.state.isValid === false
    },
  },

  methods: {

    onInit(promise) {
      promise
        .catch(console.error)
        .then(this.resetValidationState)
    },

    resetValidationState() {
      this.$store.state.isValid = undefined;
      console.log('카메라 초기화!!');
    },
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!함수 시작
    async onDecode(content) {
      this.result = content;
      this.turnCameraOff();

      // QRCODE READER
      await this.$store.dispatch('READ_QRCODE', content);
      
      await this.getUserFromDB();
      await this.getStoreFromDB();
      await this.updateDataToDB(this.userFromDB, this.storeFromDB);
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

    async getUserFromDB() {
      var scope = this;
      // DB에서 유저정보 가져오기
      var userName = this.$store.state.user_nickname;
      if (userName == "") {
        console.log("유저가 로그인 하지않았습니다!");
        return ;
      }

      var userDocRef = db.collection("users").doc(userName);  
      await userDocRef.get().then(function(doc) {
        if (doc.exists) {
          scope.userFromDB.push(doc.data().store);
        } else {
          console.log("No such User document!");
        }
      }).catch(function(error) {
          console.log("Error getting user document:", error);
      });
    },

    async getStoreFromDB() {
      var scope = this;
      // DB에서 가게정보 가져오기(QRcode에 있는 가게정보)
      // !!!!!!!!!!!!!!!!!!!!!!!!
      // storeID 부분 확실한 수정 필요!
      // !!!!!!!!!!!!!!!!!!!!!!!!

      var store = 'store'+this.$store.state.QRcode_Store.id;
      var storeDocRef = db.collection("stores");
      await storeDocRef.where("storeID", "==", store)
        .get().then(function(querySnapshot){
          if(querySnapshot.empty){
            scope.storeFromDB = [];
          } else {
            querySnapshot.forEach(function(doc) {
              scope.storeFromDB.push(doc.data());
              console.log('가져온 데이터',doc.data())
            });
          }
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    },

    async updateDataToDB(userObj, storeObj) {
      console.log('메인함수');
      var scope = this;

      if (userObj.length == 0) {
        return ;
      } else if (storeObj.length == 0) {
        console.log('store가 비어있음');
        return ;
      }
    
      // 유저정보와 비교해서 있으면 업데이트, 없으면 추가
      var currentStoreID = await storeObj[0].storeID;
      var idx = 0;
      var flag = false;
      console.log('for문 시작');
      for(var i=0; i < userObj[0].length; i++) {
        if (currentStoreID == userObj[0][i].storeID) {
          console.log('$compare success')
          flag = true;
          idx = i;
          break;
        }
      }
      console.log('StoreID:',currentStoreID,' flag:', flag, 'idx:', idx);

      var userName = this.$store.state.user_nickname;
      var userDocRef = db.collection("users").doc(userName);
      if (flag) {
        console.log('#flag is true, DBupdate');
        // DB 업데이트
        var storeData = userObj[0];
        storeData[idx].count = storeData[idx].count + 1;
        var docData = {
          store: storeData,
          userID: null,
          userName: userName,
        };

        userDocRef.set(docData)
        .then(function() {
          console.log("Store successfully updated!");
        })
        .catch(function(error) {
          console.error("Error updating store: ", error);
        });
      } else {
        console.log('#flag is false, DBadd');
        // DB 추가
        userDocRef.update({
          store: firebase.firestore.FieldValue.arrayUnion({
            count: 1,
            lastVisit: firebase.firestore.Timestamp.fromDate(new Date("15:03:03 October 20, 2019")),  // new Date안에 현재 시간 불러오기
            location:new firebase.firestore.GeoPoint(36.34961122142392, 127.2982571051557), // storeObj에 있는 좌표값 넣어주기
            storeID: '2', // storesw
            storeName: '카페니치 한밭대점'
          })
        })
        .then(function() {
          console.log("Store successfully added!");
        })
        .catch(function(error) {
          console.error("Error adding store: ", error);
        });
      }

      var storeDocRef = db.collection("stores").doc(currentStoreID);
      storeDocRef.update({
        count: firebase.firestore.FieldValue.increment(1)
      });

      scope.QRcodeInit();
      console.log('메인함수끝');
    },

    QRcodeInit() {
      this.$store.state.QRcode_Store = "None";
      this.userFromDB = [];
      this.storeFromDB = [];
    }
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
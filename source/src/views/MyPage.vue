<template>
  <div class="app">
    <div class="container">
      <div class="row">
        <div>
          <h1>내 방문장소</h1>
        </div>
        <template v-if="visit === true">
          <template v-for="place in Lank">
            <div :key="place.storeName" class="left">
              <div style="float:left;">
                <img
                  src="https://post-phinf.pstatic.net/MjAxNzA2MDlfMjE3/MDAxNDk2OTg3ODIzODA5.MyG6GA71J-5DQE2UIusK6Zl9LyekZXHS4vzSkvSKRZkg.mTjbmTr-iLdD3idvOt5haiN90Iw0IV6Lb5hUkomEX7Eg.JPEG/%EA%B3%B5%EC%9C%A0.jpg?type=w1200"
                  style="width:500px; height:500px; float:left;"/>
                <div class="right">
                  <h2 v-on:click="sendlocation(place.location._lat, place.location._long)">{{ place.storeName }}</h2>
                  <h2>{{ place.count }}</h2>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase";

export default {
  data() {
    return {
      Lank: [],
      visit: true,
      userVisitStore: []
    };
  },
  methods: {
    sendlocation(Y, X) {
      this.$store.commit("doubleY", Y);
      this.$store.commit("doubleX", X);
      this.$router.push("map");
    },

    update() {
      var scope = this;
      scope.visit = true;

      // console.log('####', scope.userVisitStore[0].length);
      for(var i=0; i < scope.userVisitStore[0].length; i++) {
        scope.Lank[i] = scope.userVisitStore[0][i];
      }

      scope.Lank.sort(function(a,b){
        return a.count > b.count ? -1 : 1;
      });
    },
  },
  mounted() {

  },
  created() {
    var scope = this;
    var user = "user1"; // 여기에 사용자 아이디 넣기
    var docRef = db.collection("users").doc(user);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        scope.userVisitStore.push(doc.data().store);
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  },
  watch : {
    userVisitStore : function () {
      this.update()
    }
  }
}
</script>

<style>
.left {
  width: 100%;
  height: 500px;
  border: 3px solid #73ad21;
  padding: 10px;
}
.right {
  float: right;
}
</style>
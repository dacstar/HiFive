<template>
  <div class="container">
    <div class="row">
      <div v-if="this.$store.state.user_nickname!=='' ">
        <div class="my_hifive_info">{{this.$store.state.user_nickname}}님의 하이파이브 정보</div>
      </div>
      <div v-else>
        <div class="my_hifive_info">내 하이파이브 정보를 보려면 <router-link to="/login">로그인</router-link>해주세요!</div>
      </div>
      <div class="hifive_rank">내가 방문한 하이파이브존 TOP3를 확인해보세요!</div>
      <div class="store_list">
        <ul>
          <template v-if="visit === true">
            <template v-for="(place, index) in Lank">
              <li :key="place.storeName">
                <div>
                  <span class="number">{{ index+1 }}</span>
                  <img
                    src="../assets/coffee.png"
                    style="width:50px; height:50px;"
                  />
                  <span
                    class="name"
                    v-on:click="sendlocation(place.location._lat,place.location._long)"
                  >{{ place.storeName }}</span>
                </div>
                <div>
                  <span class="hifive_count">하이파이브 : {{ place.count }}회</span>
                </div>
              </li>
            </template>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/FirebaseService";
import firebase from 'firebase/app';

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

      for (var i = 0; i < scope.userVisitStore[0].length; i++) {
        scope.Lank[i] = scope.userVisitStore[0][i];
      }

      scope.Lank.sort(function (a, b) {
        return a.count > b.count ? -1 : 1;
      });
    },
  },
  mounted() {
    var scope=this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        scope.$store.state.user_nickname = user.email;
      } else {
        // No user is signed in.
      }
    });
  },
  created() {
    var scope = this;
    var user = this.$store.state.user_nickname; // 여기에 사용자 아이디 넣기
    var docRef = db.collection("users").doc(user);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        scope.userVisitStore.push(doc.data().store);
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  },
  watch: {
    userVisitStore: function () {
      this.update()
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
  height: 600px;
}

.my_hifive_info {
  margin-top: 10px;
  font-size: 2.2vw;
  font-family: "Jua", sans-serif;
}

.hifive_rank {
  font-size: 0.8rem;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: "Do Hyeon", sans-serif;
}

ul {
  position: relative;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: rgba(200, 25, 253, 0.1);
  box-shadow: inset 0 0 15px rgba(198, 1, 247, 0.2);
  /* border-block-color: purple; */

  /* border-radius: 5px; */
  overflow: hidden;
}

ul li {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  color: black;
  margin: 5px 0;
  transition: 0.5s;
  align-items: center;
  justify-content: space-between;
  font-family: "Do Hyeon", sans-serif;
}
ul li:nth-child(1) {
  background: rgba(255, 255, 255, 0.6);
}
ul li:nth-child(2) {
  background: rgba(255, 255, 255, 0.4);
}
ul li:nth-child(3) {
  background: rgba(255, 255, 255, 0.2);
}

ul li span:nth-child(1) {
  width: 30px;
  margin-right: 20px;
  /* margin-left: 10px; */
  font-size: 1rem;
}
ul li span:nth-child(2) {
  width: 200px;
  margin-left: 10px;
}
ul li span:nth-child(3) {
  text-align: right;
  margin-left: 10px;
  padding-right: 30px;
}
ul li span:nth-child(4) {
  width: 70px;
  text-align: right;
  align-items: center;
}
ul li:hover {
  transform: scale(1.06);
  background: #a120ec;
  color: white;
}

/* 
    SCREEN : DESKTOP
    SIZE : 1281px
  */
@media (min-width: 1281px) {
  .store_list {
    width: 50%;
    margin: 0 auto;
  }
}

/* 
    SCREEN : LABTOP AND DESKTOP
    SIZE : 1025 ~ 1280px
  */
@media (min-width: 1025px) and (max-width: 1280px) {
  .store_list {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
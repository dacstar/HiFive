<template>
  <v-container>
    <div class="row">
      <div class="my_hifive_info">내 하이파이브 정보</div>
      <div class="hifive_rank">내가 방문한 하이파이브존 TOP3를 확인해보세요!</div>
        <div class="store_list">
          <ul>
            <template v-if="visit === true">
              <template v-for="(place, index) in Lank">
                <li :key=place.storeName>
                  <div>
                    <span class="number">{{ index+1 }}</span>
                    <img src="https://post-phinf.pstatic.net/MjAxNzA2MDlfMjE3/MDAxNDk2OTg3ODIzODA5.MyG6GA71J-5DQE2UIusK6Zl9LyekZXHS4vzSkvSKRZkg.mTjbmTr-iLdD3idvOt5haiN90Iw0IV6Lb5hUkomEX7Eg.JPEG/%EA%B3%B5%EC%9C%A0.jpg?type=w1200" style="width:50px; height:50px;">
                    <span class="name" v-on:click="sendlocation(place.location._lat,place.location._long)">{{ place.storeName }}</span>
                  </div>
                  <div>
                    <span class="hifive_count">하이파이브 :: {{ place.count }}회</span>
                  </div>
                </li>
              </template>
            </template>
          </ul> 
      </div>
    </div>
  </v-container>
</template>

<script>
import db from "@/FirebaseService";

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
    var user = this.$store.state.user_nickname; // 여기에 사용자 아이디 넣기
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
    //         count: count+1,
    //         lastVisit: {
    //           seconds: 0,
    //           nanoseconds: 0,
    //         },
    //         location: {
    //           _lat: 0.0, 
    //           _long: 0.0,
    //         },
    //         storeName: "동죽이네",
    //     }
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
</script>

<style scoped>
.my_hifive_info {
  font-size: 30px;
  font-family: 'Jua', sans-serif;
}

.hifive_rank {
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: 'Jua', sans-serif;
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
    background: rgba(255, 255, 255, .1);
    padding: 10px 20px;
    color:black;
    margin: 5px 0;
    transition: .5s;
    align-items: center;
    justify-content: space-between;
    font-family: 'Do Hyeon', sans-serif;
}
ul li:nth-child(1) {
    background: rgba(255, 255, 255, .6)
}
ul li:nth-child(2) {
    background: rgba(255, 255, 255, .4)
}
ul li:nth-child(3) {
    background: rgba(255, 255, 255, .2);
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
    transform:scale(1.06);
    background: #a120ec;
}
</style>
<template>
  <div class="app">
    <div class="container">
       <div class="row">
         <div><h1>내 방문장소</h1></div>
         <v-container>

          
              <div :key=index class="store_list">
                <ul>
                  <template v-if="visit === true">
                    <template v-for="index in Lank">
                      <li>
                        <span class="number">{{index.idx}}</span>
                        <span class="name" v-on:click="sendlocation(index.Y,index.X)">{{index.title}}</span>
                        <span class="hifive_count">{{index.count}}</span>
                        <img src="https://post-phinf.pstatic.net/MjAxNzA2MDlfMjE3/MDAxNDk2OTg3ODIzODA5.MyG6GA71J-5DQE2UIusK6Zl9LyekZXHS4vzSkvSKRZkg.mTjbmTr-iLdD3idvOt5haiN90Iw0IV6Lb5hUkomEX7Eg.JPEG/%EA%B3%B5%EC%9C%A0.jpg?type=w1200" style="width:50px; height:50px; float:left;">
                        <!-- <span class="badge"><i class="fa fa-trophy" aria-hidden="true"></i></span> -->
                      </li>
                    </template>
                  </template>
                </ul> 
              </div>


              <!-- <div :key=index class="left">
                <div style="float:left;">
                  <img src="https://post-phinf.pstatic.net/MjAxNzA2MDlfMjE3/MDAxNDk2OTg3ODIzODA5.MyG6GA71J-5DQE2UIusK6Zl9LyekZXHS4vzSkvSKRZkg.mTjbmTr-iLdD3idvOt5haiN90Iw0IV6Lb5hUkomEX7Eg.JPEG/%EA%B3%B5%EC%9C%A0.jpg?type=w1200" style="width:500px; height:500px; float:left;">
                  <div class="right">  
                    <h2 v-on:click="sendlocation(index.Y,index.X)">{{index.title}}</h2>
                    <h2>{{index.count}}</h2>
                  </div>  
                </div>   
              </div> -->


            
        </v-container>
        </div>
     </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
     location:[
       {idx: 1, title: "국민돼지국밥", Y : 127.29761976411594 , X : 36.349580368085796, count:10},
       {idx: 2, title: "제주고기국수하르방", Y : 127.29726813490997 , X : 36.34851424918655, count:4},
       {idx: 3, title: "동죽이네", Y : 127.29232251668599 , X : 36.347481083397234,  count:5},
     ],
     count:3,
     Lank:[],
     visit:false,
    }
  },methods:{
    sendlocation:function(Y, X) {
      // alert(Y);
      // alert(X);
      this.$store.commit('doubleY',Y);
      this.$store.commit('doubleX',X);
      // alert("성공"+this.$store.state.Y);
      this.$router.push("map");
    },
    
     /////순위 결정 데이터 오름차순 정렬 부분
     update:function(){
       var scope = this;
      scope.visit=true;
       ////여기서 location에 데이터를 넣어야 한다.
        console.log("들왔오")
        //location에 들어가는 예상 data(장소이름,좌표,하이파이브횟수)
        //내림차순 정렬
        //1등부터 3등 데이터 입력
         console.log("들왔오2")
        scope.Lank[0]=scope.location[0];
        scope.Lank[1]=scope.location[1];
        scope.Lank[2]=scope.location[2]; 
        scope.Lank.sort(function(a,b){
          return a.count >b.count ? -1 : 1;
        });
        console.log(scope.Lank)
     }
     
  },mounted() {
     this.update();
  },
}

</script>

<style scoped>
/* .left {
  width: 100%;
  height: 500px;
  border: 3px solid #73AD21;
  padding: 10px;
}
.right{
  float: right;
} */

body {
    margin: 0;
    padding: 0;
    background: #ff3772;
    font-family: sans-serif;
}

ul {
    position: relative;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, .1);
    box-shadow: inset 0 0 15px rgba(0,0,0,.2);
    border-radius: 5px;
    overflow: hidden;
}

ul li {
    display: flex;
    background: rgba(255, 255, 255, .1);
    padding: 10px 20px;
    color:black;
    margin: 5px 0;
    transition: .5s;
}
ul li:nth-child(1) {
    background: rgba(255, 255, 255, .6)
}
ul li:nth-child(2) {
    background: rgba(255, 255, 255, .4)
}
ul li:nth-child(3) {
    background: rgba(255, 255, 255, .2)
}

ul li span:nth-child(1) {
    width: 30px;
}
ul li span:nth-child(2) {
    width: 200px;
}
ul li span:nth-child(3) {
    width: 100px;
    text-align: right;
}
ul li span:nth-child(4) {
    width: 70px;
    text-align: right;
}
ul li:hover {
    transform:scale(1.06);
    background: #ff3772;
}

</style>
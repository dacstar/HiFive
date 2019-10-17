<template>
  <div class="app">
      this is kakao map service & searching page
      <input type="text" name="search" placeholder="공간 검색하기">
      <div id="map" style="width:500px;height:400px;"></div>
      <div v-for='store in stores'>
        {{store.title}}
      </div>
  </div>
</template>

<script>
import {fetchStoreList} from '../api/index.js';

export default {
  data(){
    return {
      stores:[]
    }
  },
  created(){
    var scope = this;
    fetchStoreList()
    .then(function(response){
      console.log(response);
      scope.stores = response.data;
    })
    .catch(function(error){
      console.log(error);
    })
  },
  mounted() {
  var container = document.getElementById('map');
    var mapOptions = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 4 //지도의 레벨(확대, 축소 정도)
    };
    var map = new daum.maps.Map(container, mapOptions);
  }
}
</script>

<style scoped>
input[type=text] {
  width: 200px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  /* background-image: url('searchicon.png'); */
  background-position: 10px 10px; 
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
}

input[type=text]:focus {
  width: 100%;
}
</style>
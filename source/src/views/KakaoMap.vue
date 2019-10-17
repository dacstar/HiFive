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
    var map = new kakao.maps.Map(container, mapOptions);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'zoom_changed', function() {        
        
        // 지도의 현재 레벨을 얻어옵니다
        var level = map.getLevel();
        
        var message = '현재 지도 레벨은 ' + level + ' 입니다';
        var resultDiv = document.getElementById('result');  
        resultDiv.innerHTML = message;

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
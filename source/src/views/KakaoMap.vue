<template>
  <div class="app">
    this is kakao map service & searching page
    <input
      type="text"
      name="search"
      placeholder="공간 검색하기"
    />
    <div class="map_wrap">
      <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>
      <!-- 지도타입 컨트롤 div 입니다 -->
      <!-- <div class="custom_typecontrol radius_border">
          <span id="btnRoadmap" class="selected_btn" onclick="setMapType('roadmap')">지도</span>
          <span id="btnSkyview" class="btn" onclick="setMapType('skyview')">스카이뷰</span>
      </div>-->
      <!-- 지도 확대, 축소 컨트롤 div 입니다 -->
      <!-- <div class="custom_zoomcontrol radius_border"> 
          <span onclick="zoomIn()"><img src="http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대"></span>  
          <span onclick="zoomOut()"><img src="http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소"></span>
      </div>-->
    </div>
    <div v-for="store in stores">{{store}}</div>
  </div>
</template>

<script>
import { fetchStoreList } from "../api/index.js";

export default {
  data() {
    return {
      stores: []
    };
  },
  created() {
    var scope = this;
    fetchStoreList()
      .then(function(response) {
        console.log(response);
        scope.stores = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  mounted() {
    var mapContainer = document.getElementById("map");
    var mapOptions = {
      center: new kakao.maps.LatLng(36.346726, 127.297847),
      level: 4 // 1 to 13
    };
    var map = new kakao.maps.Map(mapContainer, mapOptions);

    var positions = [
      {
        title: "Rom122",
        content: "<div>Rom122</div>",
        latlng: new kakao.maps.LatLng(36.34530266111805, 127.30434520596424)
      },
      {
        title: "수통골감나무집",
        content: "<div>수통골감나무집</div>",
        latlng: new kakao.maps.LatLng(36.347029157492265, 127.29139398715604)
      },
      {
        title: "삼거리식당",
        content: "<div>삼거리식당</div>",
        latlng: new kakao.maps.LatLng(36.34992230895572, 127.29491619641085)
      },
      {
        title: "동죽이네",
        content: "<div>동죽이네</div>",
        latlng: new kakao.maps.LatLng(36.347481083397234, 127.29232251668599)
      },
      {
        title: "국민돼지국밥",
        content: "<div>국민돼지국밥</div>",
        latlng: new kakao.maps.LatLng(36.349580368085796, 127.29761976411594)
      },
      {
        title: "제주고기국수하르방",
        content: "<div>제주고기국수하르방</div>",
        latlng: new kakao.maps.LatLng(36.34851424918655, 127.29726813490997)
      }
    ];

    var imageSrc = "https://www.iconsdb.com/icons/preview/violet/hand-cursor-xxl.png";
    var imageSize = new kakao.maps.Size(25, 25);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    for (var i = 0; i < positions.length; i++) {
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage // 마커 이미지
      });

      var infowindow = new kakao.maps.InfoWindow({
        content : positions[i].content // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      });

      kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    }

    function makeOverListener(map, marker, infowindow) {
      return function() {
        infowindow.open(map, marker);
      };
    }

    function makeOutListener(infowindow) {
      return function() {
        infowindow.close();
      };
    }
    
  },
  methods: {
  //   setMapType(maptype) {
  //       var roadmapControl = document.getElementById('btnRoadmap');
  //       var skyviewControl = document.getElementById('btnSkyview');
  //       if (maptype === 'roadmap') {
  //           this.map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
  //           roadmapControl.className = 'selected_btn';
  //           skyviewControl.className = 'btn';
  //       } else {
  //           this.map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
  //           skyviewControl.className = 'selected_btn';
  //           roadmapControl.className = 'btn';
  //       }
  //   },

  //   zoomIn() {
  //       this.map.setLevel(this.map.getLevel() - 1);
  //   },

  //   zoomOut() {
  //       this.map.setLevel(this.map.getLevel() + 1);
  //   }
  }
};
</script>

<style scoped>
.map_wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 500px;
}

input[type="text"] {
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

input[type="text"]:focus {
  width: 100%;
}
</style>
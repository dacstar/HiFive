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
    </div>
    <div v-for="store in stores">{{store.title}}</div>
  </div>
</template>

<script>
import { fetchStoreList } from "../api/index.js";
import { functions } from 'firebase';
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
        alert(error.message);
      });
  },
  methods : {
    make_info(data) {
      var result = '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            data.title + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="'+ data.image_url +'" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">'+ data.address + '</div>' + 
            // '                <h6>'+ data.address + '</h6>' + 
            // '                <div><a href="http://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';
            return result;
    },
    // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
    // closeOverlay:function(){
    //   alert("hI")
    //   overlay.setMap(NULL);
    // }
    closeOverlay() {
        alert("hi");
          overlay.setMap(null);     
      }
  },
  mounted() {
    var mapContainer = document.getElementById("map");
    var mapOptions = {
      center: new kakao.maps.LatLng(36.346726, 127.297847),
      level: 4 // 1 to 13
    };
    var map = new kakao.maps.Map(mapContainer, mapOptions); // 지도 생성
    
    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);  

    var positions = [
      {
        title: "Rom122",
        content: "<div>Rom122</div>",
        latlng: new kakao.maps.LatLng(36.34530266111805, 127.30434520596424),
        // image_url:
        address: "대전광역시 유성구 학하서로 166"
        // hifive_count: 
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
    // Marker
    var imageSrc = "https://www.iconsdb.com/icons/preview/violet/hand-cursor-xl.png"; // 마커 이미지 링크
    // var imageSrc = "../assets/hifive_purple.png";
    var imageSize = new kakao.maps.Size(30, 30);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    for (var i = 0; i < positions.length; i++) {
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        // image: markerImage // 마커 이미지
      });
      var infowindow = new kakao.maps.InfoWindow({
        content : this.make_info(positions[i]) // 정보 띄우기
        // content : positions[i].content // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      });
      kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
      // kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      // kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
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
    // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
      function closeOverlay() {
        return function(){
          overlay.setMap(null);     
      };
    }
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

/* 커스텀 오버레이 */
.wrap {position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
.wrap * {padding: 0;margin: 0;}
.wrap .info {width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}
.wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}
.info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}
.info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}
.info .close:hover {cursor: pointer;}
.info .body {position: relative;overflow: hidden;}
.info .desc {position: relative;margin: 13px 0 0 90px;height: 75px;}
.desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.desc .jibun {font-size: 11px;color: #888;margin-top: -2px;}
.info .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}
.info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
.info .link {color: #5085BB;}

</style>
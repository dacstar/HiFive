<template>
  <v-container>
    <div class="app">
      <div class="hifive_zone_info">하이파이브존을 확인해주세요!</div>
      <form v-on:submit.prevent="submitForm">
        <input type="text" name="search" placeholder="공간 검색하기!!!" v-model.lazy="keyword" />
        <button type="submit">검색하기</button>
      </form>

      <div class="map_wrap">
        <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>
      </div>
      <div class="store_list">
        <ul>
          <li class="store-item" v-for="shop in shops" v-bind:key="shop">
            <p class="text">{{shop.title}}</p>
            <p class="location">{{shop.latlng}}</p>
          </li>
        </ul>
      </div>
      <div class="store_list">
        <!-- <div v-for="st in this.$store.state.stores">{{st.title}}</div> -->
        <div v-for="st in storea">{{st.title}}</div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { fetchStoreList } from "../api/index.js";
import { functions } from 'firebase';
import {mapGetters,mapState} from 'vuex';
export default {
  data() {
    return {
      stores: [],
      keyword: "",
      shops: [
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
      ]
    };
  },
  computed:{
    // stores(){
    //   return this.$store.status.stores;
    // },
    ...mapState({
      storea: state => state.stores
    })
  },
  created() {
    // var scope = this;
    // fetchStoreList()
    //   .then(function (response) {
    //     console.log(response);
    //     scope.stores = response.data;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     alert(error.message);
    //   });
    // 이걸 밑의 코드로 변형 가능하게 할 수 있습니다.
    // store.js에서 묶음으로 확인 가능합니다.
    this.$store.dispatch('FETCH_STORES')
  },
  methods: {
    submitForm: function () {

      let keyword = this.keyword;
      let kakao_map = this.mapinfo;
      let stores = this.shops;

      // 키워드로 장소를 검색합니다.
      searchPlaces();

      // 키워드 검색을 요청하는 함수입니다.
      function searchPlaces() {

        if (!keyword.replace(/^\s+|\s+$/g, '')) {
          alert('키워드를 입력해주세요!');
          return false;
        }

        // 현재 저장되어 있는 장소 배열에서 입력값과 일치하는지를 확인한다.
        // 여러 개가 검색될 시, 문제점 발생할 수 있음. (로직 수정 필요)
        var isFind = false;
        var res;
        for (var i = 0; i < stores.length; i++) {
          var store = stores[i].title;
          if (store.includes(keyword)) {
            res = stores[i];
            isFind = true;
            break;
          } else {
            continue;
          }
        }

        if (isFind == true) {
          alert('검색하신 키워드를 찾았습니다.');
          console.log(res.latlng.getLat());
          console.log(res.latlng.getLng());
          // 이동할 위도 경도 위치를 생성합니다.
          var moveLatLon = new kakao.maps.LatLng(res.latlng.getLat(), res.latlng.getLng());

          // 지도 중심을 이동 시킵니다.
          kakao_map.setCenter(moveLatLon);
        } else {
          alert('검색하신 키워드를 찾지 못하였습니다.');
        }
      }
    },
    make_info(data) {
      // 커스텀 오버레이에 표시할 컨텐츠 입니다
      var result = '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' + data.title +
        '            <div class="close" @onclick="closeOverlay()" title="닫기"></div>' +
        '        </div>' +
        '        <div class="body">' +
        '            <div class="img">' +
        '                <img src="' + data.image_url + '" width="73" height="70">' +
        '           </div>' +
        '            <div class="desc">' +
        '                <div class="ellipsis">' + data.address + '</div>' +
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
      center: new kakao.maps.LatLng(36.350185298428336, 127.29788497889939),
      level: 3 // 1 to 13
    };
    var map = new kakao.maps.Map(mapContainer, mapOptions); // 지도 생성

    this.mapinfo = map;

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다


    var positions = [
      {
        title: "카페 데일리",
        latlng: new kakao.maps.LatLng(36.348771954596096, 127.29800436467848),
        address: "대전 유성구 학하서로121번길 130(덕명동 591-6)",
        hifive_count: 132
      },
      {
        title: "O'neul(카페 오늘)",
        latlng: new kakao.maps.LatLng(36.350185298428336, 127.29788497889939),
        address: "대전 유성구 학하서로121번길 71-8(덕명동 158-3)",
        hifive_count: 92
      },
      {
        title: "카페 인누와",
        latlng: new kakao.maps.LatLng(36.34969294908846, 127.29872976493839),
        address: "대전 유성구 학하서로121번길 51(덕명동 589-5)",
        hifive_count: 49
      },
      {
        title: "카페니치 한밭대점",
        latlng: new kakao.maps.LatLng(36.34961122142392, 127.2982571051557),
        // image_url:
        address: "대전광역시 유성구 학하서로121번길 55-9 1층(덕명동 589-2)",
        hifive_count: 78
      },
      {
        title: "더카페 지오 한밭대점",
        latlng: new kakao.maps.LatLng(36.349125599049245, 127.29929351989453),
        address: "대전 유성구 학하서로121번길 39-3(덕명동 599-1)",
        hifive_count: 188
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
        content: this.make_info(positions[i]) // 정보 띄우기
        // content : positions[i].content // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      });
      kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
      // kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      // kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    }
    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }
    // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
    function closeOverlay() {
      return function () {
        overlay.setMap(null);
      };
    }

  }
};
</script>

<style scoped>
.hifive_zone_info {
  font-size: 25px;
  font-family: 'Jua', sans-serif;
}

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
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  overflow: hidden;
}
.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.info .link {
  color: #5085bb;
}
</style>
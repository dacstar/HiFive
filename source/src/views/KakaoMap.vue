<template>
  <div id="app">
    <div class="container">
      <div class="hifive_zone_info">하이파이브존을 확인해주세요!</div>
      <!-- 검색 버튼 -->
      <form v-on:submit.prevent="submitForm">
        <input type="text" name="search" placeholder="하이파이브존 검색하기!" v-model.lazy="keyword" />
        <button type="submit">하이파이브존 GO!</button>
      </form>
      <create-map></create-map>
      <!-- 카카오지도 -->
      <!-- <div class="map_wrap">
        <div id="map"></div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { functions } from 'firebase';
import { mapGetters, mapState } from 'vuex';
import CreateMap from "../components/CreateMap.vue";
export default {
  components: {
    CreateMap
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
  }
};
</script>

<style>
.hifive_zone_info {
  font-size: 25px;
  font-family: "Jua", sans-serif;
  margin-top: 20px;
  margin-bottom: 10px;
}

.map_wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 500px;
  margin-top: 15px;
}
.map_wrap #map {
  width: 50%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

/* 검색 박스 */
input[type="text"],
input[type="password"] {
  width: 250px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  font-family: "Do Hyeon", sans-serif;
  background-color: white;
  /* background-image: url('searchicon.png'); */
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 15px;
}
input[type="text"]:focus {
  width: 100%;
}

input[type="password"]:focus {
  width: 100%;
}

/* 버튼 */
button {
  background: #a120ec;
  color: #fff !important;
  border: none;
  position: relative;
  height: 30px;
  font-size: 1em;
  padding: 0 1 2em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  font-family: "Do Hyeon", sans-serif;
}
button:hover {
  background: #fff;
  color: #a120ec;
}
button:before,
button:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #a120ec;
  transition: 400ms ease all;
}
button:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}
button:hover:before,
button:hover:after {
  width: 100%;
  transition: 800ms ease all;
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
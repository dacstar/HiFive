<template>
  <div class="hifive_zone_info">
    하이파이브존을 확인해주세요!
    <!-- 검색 버튼 -->
    <form v-on:submit.prevent="submitForm">
      <input type="text" name="search" placeholder="하이파이브존 검색하기!" v-model.lazy="keyword" />
      <button type="submit">하이파이브존 GO!</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
    }
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
}
</script>

<style>
.hifive_zone_info {
  font-size: 25px;
  font-family: "Jua", sans-serif;
  margin-top: 20px;
  margin-bottom: 10px;
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
</style>
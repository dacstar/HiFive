<template>
  <div class="map_wrap">
    <div id="map"></div>
  </div>
</template>
  
<script>
import { functions } from 'firebase';
import { mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
      stores: [],
      keyword: "",
    }
  },
  computed: {
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
    // this.$store.dispatch('FETCH_STORES')
  },
  methods: {
    create_customover() {
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
      var clickedOverlay = null;

      for (var i = 0; i < positions.length; i++) {
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          // image: markerImage // 마커 이미지
        });

        var overlay = null;
        var content = document.createElement('div')
        content.className = 'wrap'
        var info = document.createElement('div');
        info.className = 'info';
        content.appendChild(info);
        var title = document.createElement('div');;
        title.className = 'title'
        title.innerHTML = positions[i].title;
        info.appendChild(title);

        var body = document.createElement('div');

        body.className = 'body';
        info.appendChild(body);
        var close = document.createElement('div');
        close.className = 'close';
        title.appendChild(close);
        overlay = new kakao.maps.CustomOverlay({
          content: content,
          position: marker.getPosition(),
        });
        close.onclick = makeOutListener(overlay);
        kakao.maps.event.addListener(marker, 'click', makeOverListener(map, overlay));
      }

      function makeOverListener(map, overlay) {
        return function () {
          overlay.setMap(map);
        };
      }

      // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
      function makeOutListener(overlay) {
        return function () {
          overlay.setMap(null);
        };
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
    closeOverlay() {
      alert("hi");
      overlay.setMap(null);
    }
  },
  mounted() {
    this.create_customover();
  }
}
</script>

<style>
</style>
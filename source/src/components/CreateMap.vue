<template>
  <div class="map_wrap">
    <div id="map"></div>
  </div>
</template>
  
<script>
import { functions } from "firebase";
import { mapGetters, mapState } from "vuex";
import db from "@/FirebaseService";
import firebase from "firebase/app";
import { async } from "q";

export default {
  computed: {
    // stores(){
    //   return this.$store.status.stores;
    // },
    ...mapState({
      storea: state => state.stores
    })
  },
  methods: {
    async create_customover() {
      // firebase database -> get store data
      // const snapshot = await db.collection('stores').get();
      // snapshot.forEach(store => {
      //   this.stores.push(store.data());
      // });

      var mapContainer = document.getElementById("map");
      var mapOptions = {
        center: new kakao.maps.LatLng(36.350185298428336, 127.29788497889939),
        level: 3 // 1 to 13
      };
      var map = new kakao.maps.Map(mapContainer, mapOptions); // 지도 생성

      this.$store.commit("SET_MAP", map);

      // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다

      var positions = this.$store.state.stores;
      console.log(positions[0]);

      // Marker
      var imageSrc =
        "https://www.iconsdb.com/icons/preview/violet/hand-cursor-xl.png"; // 마커 이미지 링크
      var imageSize = new kakao.maps.Size(30, 30);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      var clickedOverlay = null;

      for (var i = 0; i < positions.length; i++) {
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(
            positions[i].location.latitude,
            positions[i].location.longitude
          ), // 마커를 표시할 위치
          title: positions[i].storeName // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        });

        var overlay = null;
        var content = document.createElement("div");
        content.className = "wrap";
        var info = document.createElement("div");
        info.className = "info";
        content.appendChild(info);
        var title = document.createElement("div");
        title.className = "title";
        title.innerHTML = positions[i].storeName;
        info.appendChild(title);

        var body = document.createElement("div");

        body.className = "body";
        info.appendChild(body);
        var close = document.createElement("div");
        close.className = "close";
        title.appendChild(close);
        var desc = document.createElement("div");
        desc.className="desc";
        body.appendChild(desc);
        var ellipsis=document.createElement("div");
        ellipsis.className="ellipsis";
        ellipsis.innerHTML=positions[i].address;
        desc.appendChild(ellipsis)
        var jibun=document.createElement("div");
        jibun.className="ibun ellipsis";
        jibun.innerHTML="하이파이브 : "+positions[i].count+"회";
        desc.appendChild(jibun)
        
        overlay = new kakao.maps.CustomOverlay({
          content: content,
          position: marker.getPosition()
        });
        close.onclick = makeOutListener(overlay);
        kakao.maps.event.addListener(
          marker,
          "click",
          makeOverListener(map, overlay)
        );
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
      var result =
        '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        data.title +
        '            <div class="close" @onclick="closeOverlay()" title="닫기"></div>' +
        "        </div>" +
        '        <div class="body">' +
        '            <div class="img">' +
        '                <img src="' +
        data.image_url +
        '" width="73" height="70">' +
        "           </div>" +
        '            <div class="desc">' +
        '                <div class="ellipsis">' +
        data.address +
        "</div>" +
        // '                <h6>'+ data.address + '</h6>' +
        // '                <div><a href="http://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>";
      return result;
    },
    closeOverlay() {
      alert("hi");
      overlay.setMap(null);
    }
  },
  mounted() {
    this.create_customover();
    var scope=this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        scope.$store.state.user_nickname = user.email;
      } else {
        // No user is signed in.
      }
    });
  }
};
</script>

<style>
.map_wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 500px;
  margin-top: 15px;
}

.map_wrap #map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.map_wrap #map img {
  z-index: 10px;
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
  margin-right: 10px;
  margin-bottom: 15px;
}

/* 커스텀 오버레이 */
.wrap {
  position: absolute;
  left: 0;
  bottom: 22px;
  width: 288px;
  height: 132px;
  margin-left: -142.5px;
  text-align: left;
  overflow: hidden;
  font-size: 13px;
  line-height: 1.5;
}

.wrap * {
  padding: 0;
  margin: 0;
}

.wrap .info {
  width: 250px;
  height: 100px;
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
  padding-top: 7px;
  text-align: center;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-family: "Do Hyeon", sans-serif;
  font-size: 17px;
  font-weight: bold;
}

.info .close {
  position: absolute;
  top: 10px;
  right: 45px;
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
  font-family: "Do Hyeon", sans-serif;
}

.info .desc {
  margin: 10px 5px 5px 5px;
  position: relative;
  height: 75px;
}

.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 2px;
  margin-top: 2px;

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

/* 
    SCREEN : DESKTOP
    SIZE : 1281px
  */
@media (min-width: 1281px) {
  .map_wrap {
    width: 50%;
    margin: 0 auto;
  }
}

/* 
    SCREEN : LABTOP AND DESKTOP
    SIZE : 1025 ~ 1280px
  */
@media (min-width: 1025px) and (max-width: 1280px) {
  .map_wrap {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
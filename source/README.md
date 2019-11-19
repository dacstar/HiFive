# 개발한거, 공유하고싶은거 자유롭게 작성하세요



## 동관
- (중요) push 할 때 package-lock.json 제거하고 올리세요~ 아니면 버전 오류납니다.
- (중요) clone 하실 때 npm install 해주세요.
- 기본 구조 작성하였습니다.
- 개발 흐름도 작성하였습니다.
- vue-router 사용하여 APP.vue 내부에 SPA 방식으로 구현하였습니다.

1. router-view

- 따로 폴더를 만들어 관리하는 것도 괜찮은 방법

2. missing script 오류를 해결할 때 , 그리고 package.json 에 대해 배운 점 공유
   - package.json은 설치된 라이브러리의 버전을 저장해놓는 도서관의 기능을 수행한다. 이것의 목차본은 package-lock.json 이고, 때문에
     package.json을 함부로 지우면 안된다...ㅠㅠ missing script 에러가 날 수 있다.
   - 그럼에도 불구하고 실수로 지울 수 있다. 그러면 npm init으로 새로 만들어 주고, 기억을 더듬어... 다시 설치해야한다. npm install -g @vue/cli부터 시작해보면 될듯..

3. 화살표 함수를 사용하는 이유 공유합니다.

- 함수 내부와 외부의 바인딩을 그대로 가져가기 위해 사용함.

4. 회원가입 및 로그인 #firebase 구현 완료

5. 로그인 및 회원가입 완료 후 페이지 넘어가지 않던 오류 해결한거 공유합니다.

    ```javascript
    // 해결되지 않던 코드
    methods:{
        login:function(){
            firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(
                function(user){
                    alert("로그인 잘 되었습니다.")
                    this.$router.replace('map')
                },
                function(err){
                    alert(err.message)
                }
            );
        }
    },
    ```

    ```javascript
    // 해결된 코드
    methods:{
        login:function(){
            firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(
                res=> {
                    console.log(res);
                    alert("로그인 잘 되었습니다.")
                    this.$router.push("map");
                },
                function(err){
                    alert(err.message)
                }
            );
        }
    },
    ```

    - this 를 함수 내부적으로도 유지시키기 위함인 것 같은데 공부를 조금 더 해봐야 알 것 같습니다. -> 해결함(6번)

6. (19/10/22) this 콜백이 받아지지 않는 이유 해결

    - var scope = this 를 밖에서 선언해주고, 이걸 탐색하는 방식으로 바꾸면 해결되었음.

    - 캡틴판교 자바스크립트 this 4가지와 화살표 함수의 this 부분 참고

      ```javascript
      created(){
          //var scope = this;
          fetchNewsList()
              //.then(function(response){
              .then(response => {
                  console.log('호출 후: ', this);
                  scope.users = response.data;
              })
    },
      ```





## 현우
1. 카카오맵 여러개 마커에 이벤트 부여하기(19/10/17)

   하나짜리 마커에 이벤트를 부여하는 것과 여러개 마커에 이벤트를 부여하는건 차이가 조금 있습니다.

   - 하나 일 때는

   ```javascript
   // (1) 마커를 생성하고
   var marker = new kakao.maps.Marker({
     position: position
   });

   // (2) 마커를 지도에 표시한 후에
   marker.setMap(map);

   // (3) 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우 내용을 넣어주고
   var iwContent = '<div style="padding:5px;">Hello World!</div>';

   // (4) 인포윈도우를 생성하면 됩니다.
   var infowindow = new kakao.maps.InfoWindow({
       content : iwContent
   });

   // (5) 이때 마우스오버 이벤트와
   kakao.maps.event.addListener(marker, 'mouseover', function() {
     // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
       infowindow.open(map, marker);
   });

   // (6) 마우스아웃 이벤트를 등록하면 됩니다.
   kakao.maps.event.addListener(marker, 'mouseout', function() {
       // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
       infowindow.close();
   });
   ```

   - 여러 개 일때는 조금 다릅니다.

   ```javascript
   for (var i = 0; i < positions.length; i ++) {
       // for문으로 각각의 마커를 생성하고
       var marker = new kakao.maps.Marker({
           map: map,
           position: positions[i].latlng // 마커의 위치
       });

       // 마커에 표시할 인포윈도우를 생성한 후에
       var infowindow = new kakao.maps.InfoWindow({
           content: positions[i].content // 마우스오버시 출력할 내용
       });

       // 마커에 마우스오버 이벤트와 마우스 이벤트를 등록합니다
       // 이때 클로저를 만들어 등록하는데,
       // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
       kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
       kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
   }

   // 인포윈도우 오픈 함수
   function makeOverListener(map, marker, infowindow) {
       return function() {
           infowindow.open(map, marker);
       };
   }

   // 인포윈도우 클로즈 함수
   function makeOutListener(infowindow) {
       return function() {
           infowindow.close();
       };
   }

   // 또는 마커에 이벤트를 등록하는 함수를 만들고 즉시 호출하여 클로저를 만드는 방법도 있습니다.
   (function(marker, infowindow) {
      kakao.maps.event.addListener(marker, 'mouseover', function() {
          infowindow.open(map, marker);
       });

       kakao.maps.event.addListener(marker, 'mouseout', function() {
         infowindow.close();
      });
   })(marker, infowindow);
   ```

 현재 해결못한 문제

- 외부값을 받아와서 마우스오버할 때 보여주지못하는 부분
- vue와 자바스크립트 예제 코드간 다른 점을 수정하는 부분

2. vuex 적용(19/10/18)
- store.js 생성
   ```
   import Vue from 'vue'
   import Vuex from 'vuex'

   Vue.use(Vuex);

   export const store = new Vuex.Store({
       state: {
           // 여기에 컴포넌트 간에 공유할 변수 선언
           // ex) hifiveCnt : 0
           // 접근은 각 컴포넌트에서 this.$store.state.hifiveCnt 로 사용가능합니다
       }
   });
   ```

## 길준

- 2019-10-22

  - kakao map을 사용하여 검색기능 구현 완료

    - 로직 수정 필요( 문제점 발견 )
      - ex) 동일한 가게가 2개 이상 있을 시, 앞에 있는 가게의 위치로 이동한다.

  - Javascript : let, const, var 차이점

    - let
      - block scope
      - 변수 재할당 가능
    - const
      - block scope
      - 변수 재선언, 재할당 불가능
    - var
      - function scope



## 종찬
1. KaKaomap maker 다중 마커 커스텀 오버레이 달기



- result에 HTML 코드를 String로 삽입해서 커스텀 오버레이

```javascript
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
```

 문제

    ㅇString으로 인한 HTML삽입은 수정/삭제가 힘들다
    
    ㅇVue.js의 문법이 통하지 않다.



- 문제 해결 방법

  ```javascript
  //1.DOM 객체로 바인딩
  //2. Class 삽입
  //3.상위객체 선언해주기
  //4.객체별 이벤트 등록
  var content = document.createElement('div')

        content.className = 'wrap'
        var info = document.createElement('div');
        info.className = 'info';

        content.appendChild(info);
        var title = document.createElement('div');;
        title.className='title'
        title.innerHTML=positions[i].title;
        info.appendChild(title);
        var body=document.createElement('div');
        body.className='body';
        info.appendChild(body);
          var close = document.createElement('div');
        close.className='close';
         title.appendChild(close);
          overlay = new kakao.maps.CustomOverlay({
             content: content,
             position: marker.getPosition(),   
            });
        close.onclick=makeOutListener(overlay);
          kakao.maps.event.addListener(marker, 'click', makeOverListener(map,overlay));
  ```



효과

- Vue.js 문법 사용가능
- 손쉬운 HTML 코드 수정과 접근이 가능하다
- Foeach 활용으로 다중으로 커스텀 오버레이를 사용할수 있다.

주의할점

- 이벤트 등록을 동기적으로 하지 않으면 결국 가장 마지막 오버레이만 동작.
- 매 반복시마다 휘발성이 가능하도록 해야한다.



## 채원

* Git - commit message rule, branch naming rule 상위 폴더 README에 업로드 하였습니다.

* Hifive Welcome Kit 제작(상점에 제공할 계획)  - 후보 6개 중 1개 선정(회의 폴더에 파일 업로드 완료)

* Kakaomap Customizing - 1. 지도 확대/축소 제어바 추가(2019.10.18)

  ```javascript
  // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  ```



* Kakaomap Customizing - 2. Marker 클릭 했을 때 이벤트(make_) 발생하도록 동작 설정

  ```javascript
  // 마커 for문 안에 동작 설정
  var infowindow = new kakao.maps.InfoWindow({
          content : this.make_info(positions[i]) // 정보 띄우기
          // content : positions[i].content // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        });
  kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
  ```



* methods에 make_info 함수 추가 - Marker 클릭 시 오버레이로 store 정보 보여주기

  ```javascript
  methods : {
      make_info(data) {
        // 커스텀 오버레이에 표시할 컨텐츠 입니다
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
  ```



* 추후 해야할 것
  * 오버레이 닫기 기능 수행되도록 함수와 연동해야 함
  * positions에 기본 정보 추가해야 함 - title, latlng, address, hifive_count, image_url 등
  * 오버레이에 CSS 적용하기



* `v-for`는 또한 현재 항목의 인덱스에 대한 두 번째 전달인자 옵션을 제공합니다.
  * 하이파이브 지수로 정렬된 리스트에 Top3 순위를 매기기 위해 사용하였습니다.
  * 참고링크 - <https://kr.vuejs.org/v2/guide/list.html>

```html
<template v-for="(place, index) in Lank">
  <li :key=place.storeName>
     <div>
       <span class="number">{{ index+1 }}</span>
         <img src="" style="width:50px; height:50px;">
         <span class="name" v-on:click="sendlocation(place.location._lat,place.location._long)">{{ place.storeName }}</span>
      </div>
      <div>
       <span class="hifive_count">하이파이브 :: {{ place.count }}회</span>
      </div>
   </li>
 </template>
```
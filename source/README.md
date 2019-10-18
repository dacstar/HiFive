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

    - this 를 함수 내부적으로도 유지시키기 위함인 것 같은데 공부를 조금 더 해봐야 알 것 같습니다.

## 현우
1. 카카오맵 여러개 마커에 이벤트 부여하기(19/10/17)

   하나짜리 마커에 이벤트를 부여하는 것과 여러개 마커에 이벤트를 부여하는건 차이가 조금 있습니다.

   - 하나 일 때는

   ```jsp
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

   ```jsp
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



## 종찬



## 채원

 

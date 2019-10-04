<template>
  <div class="howtoContents">
      <div class="container">
          <!-- <div class="container__1">
            <div class="howto__title">
                <h1>하이파이브는 어떻게 사용하나요?</h1>
                <p>How to use hifive service</p>
            </div>
            <div class="howto__contents">
                <h3>하나, 둘, 셋 만 기억해주세요!</h3>
                <p>Just remember these step!</p>
            </div>
          </div>
          <div class="container__2">
              <div class="picture img1"></div>
              <div class="picture img2"></div>
              <div class="picture img3"></div>
              <div class="picture__1__contents">
                  <h1>하나!</h1>
                  <p>마음에 드는 장소로 이동!</p>
              </div>
              <div class="picture__2__contents">
                  <h1>둘!</h1>
                  <p>장소가 마음에 든다면 큐알코드를 인식하여 하이파이브하기!</p>
              </div>
              <div class="picture__3__contents">
                  <h1>셋!</h1>
                  <p>끝!</p>
              </div>
          </div> -->
          <div class="howto__title">
                <h1>하이파이브는 어떻게 사용하나요?</h1>
                <p>How to use hifive service</p>
            </div>
            <div class="howto__contents">
                <h3>하나, 둘, 셋 만 기억해주세요!</h3>
                <p>Just remember these step!</p>
            </div>
              <div class="column">
                  <div class="box">
                      <div class="title">
                          <h1>1</h1>
                          <h2>하나</h2>
                      </div>
                      <div class="option">
                          <ul>
                              <li><i class="fa fa-check fa"></i>맛집</li>
                              <li><i class="fa fa-check fa"></i>사람</li>
                              <li><i class="fa fa-check fa"></i>명소</li>
                              <li>마음에 드는 장소로 이동하기</li>
                          </ul>
                      </div>
                  </div>
                  <div class="box">
                      <div class="title">
                          <h1>2</h1>
                          <h2>둘</h2>
                      </div>
                      <div class="option">
                          <ul>
                              <li><i class="fa fa-check fa"></i>앱실행</li>
                              <li><i class="fa fa-check fa"></i>큐알코드</li>
                              <li><i class="fa fa-check fa"></i>찰칵</li>
                              <li>큐알코드 인식으로 하이파이브!</li>
                          </ul>
                      </div>
                  </div>
                  <div class="box">
                      <div class="title">
                          <h1>3</h1>
                          <h2>셋</h2>
                      </div>
                      <div class="option">
                          <ul>
                              <li><i class="fa fa-check fa"></i>맛집</li>
                              <li><i class="fa fa-check fa"></i>사람</li>
                              <li><i class="fa fa-check fa"></i>명소</li>
                              <li>즐겁게 이용하기</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
  </div>
</template>

<script>

export default {
    data(){
        return {
            
        }
    }
}
</script>

<style scoped>

/* 시작지점 */
.column{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width:80%;
    margin: 0 auto;
    text-align: center;
    transition: .5s;
    grid-column-gap: 100px;
}
.box{
    background: linear-gradient(0deg,#202022,#464646);
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 150px;
    border-bottom-right-radius: 150px;
    border :3px solid #ffc98e;
    box-shadow: 0 0 0 6px #323232, 0 0 0 10px #ffc98e, 0 0 0 20px #323232, 0 10px 150px rgba(0,0,0,1);
    overflow: hidden;
    padding: 30px 0;
    transition: .5s;
}
.box:hover{
    transform: scale(1.1);
}
.fa{
    color:#ffe98e;
}
h1{
    color:#ffe98e;
}
h2{
    color:#fff;
}
ul{
    margin:20px 0;
}
li{
    color:#fff;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,.1);
}

/* 끝나는 지점 */
.howtoContents{
    position: relative;
    width:80%;
    background-color: white;
    margin: 0 auto;
    height: 100%;
}
.container{
    height: 100%;
    display: grid;
    grid-template-rows: 10% 20% 50%;
}
.howto__title{
    text-align: center
}
.howto__title > h1{
    font-size: 60px;
}
.picture{
    background-color: aquamarine;
    border : 5px solid red;
    border-radius: 50%;
}
.container__2{
    display: grid;
    text-align: center;
    width: 90%;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;

}
</style>

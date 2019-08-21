<template>
  <div class="howtoContents">
      <div class="container">
          <div class="container__1">
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
    grid-template-rows: 30% 70%;
}
.howto__title{
    text-align: center
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

<template>
    <div class="container">
        <div class="team__title">
            <h1>만나면 반가운 하이파이브 서비스를 소개합니다!</h1>
            <br>
            <p>Introduction of HiFive Service</p>
            <br>
            <h5>하이파이브는 철저하게 사용자 중심 서비스입니다.<br>
            하이파이브는 보다 간편하고 빠르고 신뢰성 높은 평가 시스템을 제공하고자 합니다.</h5>
        </div>
        <div class="hifive_process">
            <div class="box">
                <h2>01</h2>
                <h3>하나,</h3><br>
                <p>하이파이브 웹 사이트로 GO!</p><br>
                <p class="hifive_url">www.hifive.zone</p>
            </div>
            <div class="box">
                <h2>02</h2>
                <h3>두울,</h3><br>
                <p>로그인하고,<br> QR코드로 하이파이브 해주세요!</p>               
            </div>
            <div class="box">
                <h2>03</h2>          
                <h3>셋!</h3><br>    
                <p>평가 끝~</p>
                <h3>♥</h3>              
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(#5e2a7c, #5e2a7c 50%, #fff 50%, #fff 100%)
} */

.container {
    /* margin-top: 80px; */
  background: linear-gradient(#5e2a7c, #5e2a7c 50%, #fff 50%, #fff 100%);
  align-items: center;
  flex-wrap: wrap;
  height: 620px;
}

.team__title{
    text-align: center;
    padding-top: 60px;
    margin-bottom: 50px;
}

.team__title > h1 {
    color:#3AC4A8;
    margin-bottom: 10px;
    font-family: "Jua", sans-serif;
    font-size: 2rem;
}

.team__title > p {
    color:#fff;
    font-family: "Do Hyeon", sans-serif;
}

.team__title > h5 {
    color: #ffe98e;
    font-size: 1.2rem;
    font-family: "Do Hyeon", sans-serif;
}

.hifive_process {
    display: flex;
    justify-content: space-between;
}

.container .box {
  position: relative;
  width: 320px;
  height: 272px;
  background: #fff;
  padding: 100px 40px 60px;
  box-shadow: 0 15px 45px rgba(0,0,0,.1);
  /* margin-bottom: 10px; */
}

.container .box:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffe98e;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.5s;
}

.container .box:hover:before {
  transform: scaleY(1);
  transform-origin: bottom;
  transition: transform 0.5s;
}

.container .box h2 {
  position: absolute;
  left: 40px;
  top: 60px;
  font-size: 3em;
  font-weight: 800;
  z-index: 1;
  opacity: 0.1;
  transition: 0.5s;
}

.container .box:hover h2 {
  opacity: 1;
  color: #fff;
  transform: translateY(-40px);
}

.container .box h3 {
  position: relative;
  font-size: 1.5em;
  font-family: 'Yeon Sung', cursive;
  z-index: 2;
  color: #333;
  transition: 0.5s;
}

.container .box:hover h3 {
  color: #f83333;
}

.container .box p {
  position: relative;
  text-align: center;
  font-size: 1.3em;
  font-family: 'Do Hyeon', sans-serif;
  z-index: 2;
  transition: 0.5s;
}

.container .box .hifive_url {
  font-size: 1.5em;
  color: #a120ec;
}

@media (min-width: 1281px) {
  .hifive_process {
    width: 80%;
    margin: 0 auto;
  }
}
/* 
    SCREEN : LABTOP AND DESKTOP
    SIZE : 1025 ~ 1280px
  */
@media (min-width: 1025px) and (max-width: 1280px) {
  .hifive_process {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
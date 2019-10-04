<template>
  <div class="MainContents">
      <div class="contents">
          <div class="contents_contains">
            <p>만나서 반갑다고</br></p>
            <h1>하이파이브</h1>
            <p>하이파이브를 만나보세요</p>
          </div>
      </div>
      <div class="useage">
          <div class="first__title">
              1.찍고
          </div>
          <div class="second__title">
              2.하이파이브!
          </div>
          <div class="third__title">
              3.끝!
          </div>
          <div class="first">
              <i class="fa fa-camera fa-5x"></i>
          </div>
          <div class="second">
              <i class="fa fa-check fa-5x"></i>
          </div>
          <div class="third">
              <h1 class="end">END</h1>
          </div>
          <div class="honor">
                나의 명예들
              <div class="honor__contents">
                <p>LV1. 싸피의 사나이</p>  
                LV10. 한밭대 탐험자
              </div>
          </div>
          <div class="start">
              <div class="start__button" onclick="alert('hi')">
                <a href="#">하이파이브하기 </a>
              </div>
          </div>
          <div class="userInfo">
            로그인 해주세요!
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="submit" value="Login">
            <ul>
                <li><a href="#">회원가입</a></li>
                <li><a href="#">Forget password?</a></li>
            </ul>
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
.MainContents{
    position: relative;
    width:80%;
    background-color: white;
    margin: 0 auto;
    height: 100%;
}
.contents{
    position: block;
    height: 30%;
}
.contents_contains{
    text-align: center;
}
.contents_contains>h1{
    font-size: 100px;
}
.useage{
    display:grid;
    text-align: center;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows:5% 30% 40%;
    height: 80%;
}
.end{
    font-size: 100px;
}
.fa{
    font-size: 100px;
}
.first{
    margin: 25px auto;
}
.second{
    margin: 25px auto;
}
.honor, .userInfo{
    box-shadow: 5px 5px 10px 5px rgba(0,0,0,.2);
}
.start__button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.start__button>a{
    text-decoration: none;
    color: white;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}
input{
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin: 5px 0;
  opacity: 0.85;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none; /* remove underline from anchors */
}
li{
   list-style-type: none; 
}
</style>

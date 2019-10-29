<template>
  <div id="header">
    <nav>
      <div class="header_container">
        <div id="hifive">
          <a href="/"><img id="hifive_logo" src="../assets/hifive_logo.png" width="28px" height="28px"></a>
          HiFive
        </div>
        
        <ul>
          <li><router-link to="/qrcode" class="active">Go HiFive</router-link></li>
          <li><router-link to="/map">HiFiveZone</router-link></li>
          <li><router-link to="/mypage">MyHifive</router-link></li>
          <li><router-link to="/login">LogIn</router-link></li>
          <li><router-link to="/signup">SignUp</router-link></li>
        </ul>
      </div>
    </nav>

    <!-- 로그인 부분 -->
    <!-- <div class="login_navbar" v-if="this.$store.state.user_nickname!=='' ">
      {{this.$store.state.user_nickname}}님 안녕하세요~?
    </div>
    <div class="login_navbar" v-else>
      로그인이 필요합니다!
    </div> -->
  </div>
</template>

<script>
export default {
 methods: {
   scrollFunction() {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("header").style.height = "80px";
        document.getElementById("hifive").style.fontSize = "25px";
        // document.getElementById("hifive_logo").style.marginTop = "5px";
        document.getElementById("hifive_logo").style.width = "25px";
        document.getElementById("hifive_logo").style.height = "25px";
        document.getElementById("hifive_logo").style.transition = "all .5s";        
      } else {
        document.getElementById("header").style.height = "100px";
        document.getElementById("hifive").style.fontSize = "35px";
        document.getElementById("hifive_logo").style.width = "35px";
        document.getElementById("hifive_logo").style.height = "35px";
      }
   }
 },
 created () {
   window.addEventListener('scroll', this.scrollFunction);
 }
}
</script>

<style scoped>
  .app{
    color: #a120ec;
    padding: 8px;
    margin: 0;
    padding: 0;
    font-family: 'Jua', sans-serif;
    height: 200px;
  }
  #header{
    padding-bottom: 100px;
    font-family: 'Jua', sans-serif;
  }
  .header_container{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 30px 100px;
  box-sizing: border-box;
  transition: .5s;
  /* background: linear-gradient(to right, #ff5858, #f857a6); */
  background: #fff;
  z-index: 100000000; 
}

nav #hifive {
  font-size: 2.3rem;
  color: #a120ec;
  float: left;

  transition: .5s;
}

nav #hifive img {
  transition: .5s;
}

nav ul {
  float: right;
  margin: 0;
  padding: 0;
  display: flex;
}

nav ul li {
  list-style: none;
}

nav ul li a {
  list-style: 80px;
  /* color: #a120ec; */
  color: black;
  padding: 5px 20px;
  text-decoration: none;
  text-transform:  uppercase;
  transition: .5s;
}

nav ul li a.active,
nav ul li a:hover {
  color: #fff;
  background-color: #a120ec;
}

@media screen and (max-width: 768px) {
  .header_container {justify-content: center;}
  .header_container ul {display: none;}
  nav #hifive img {display: none;}
}

  /* .navbar {
    height: 75px;
    width: 100%;
    background:rgba(0,0,0,0);
    border:0px;
    transition:ease-in-out 350ms;
  }
  .navbar .hifive {
    font-family: 'Jua', sans-serif;
    font-size: 1.8rem;
    display: inline;
  }
  .login_navbar{
    background-color:#8089df;
    height: 1.4rem;
    font-family: 'Jua', sans-serif;
  }
  .app a{
    color: #a120ec;
    font-size: 1rem;
    font-family: 'Jua', sans-serif;
  }
  .app a:active{
    color: rgb(141, 43, 233);
  } */
</style>
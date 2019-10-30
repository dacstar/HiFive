<template>
  <div id="header">
    <nav>
      <div class="container">
        <div class="header_container">
          <a href="/" class='logo'>
            <div class='icon'>
              <img id="hifive_logo" src="../assets/hifive_logo.png" width="28px" height="28px">
            </div>
            <div>HiFive</div>
          </a>
          <ul>
            <div class="dropdown">
              <li class="dropbtn"><router-link to="/" class="active">HiFive</router-link></li>
              <div class="dropdown-content">
                <li><router-link to="/qrcode">Go HiFive</router-link></li>
                <li><router-link to="/map">HiFiveZone</router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/howto">HowTo</router-link></li>
              </div>
            </div>
            <li><router-link to="/mypage">MyHifive</router-link></li>
            <div class="dropdown">
              <li class="dropbtn"><router-link to="/login">Join</router-link></li>
              <div class="dropdown-content">
                <li><router-link to="/login">LogIn</router-link></li>
                <li><router-link to="/signup">SignUp</router-link></li>
              </div>
            </div>
          </ul>
        </div>
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
        document.getElementById("hifive_logo").style.width = "25px";
        document.getElementById("hifive_logo").style.height = "25px";
        // document.getElementById("hifive_logo").style.transition = "all .5s";
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
    font-family: 'Jua', sans-serif;
  }
  nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 100px;
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

.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content{
  display: none;
}
.dropdown:hover .dropdown-content {
  display: none;
  position: absolute;
  margin-top: 5px;
  background-color: rgba(200, 25, 253, 0.1);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a{
  background-color: #fff;
}

.dropdown-content a:hover {
  background-color: #a120ec;
  }

.dropdown:hover .dropdown-content {
  display: block;
}

nav ul li a {
  list-style: 80px;
  /* color: #a120ec; */
  color: black;
  padding: 5px 15px;
  text-decoration: none;
  text-transform:  uppercase;
  transition: .5s;
  cursor: pointer;
}

nav ul li a.active,
nav ul li a:hover {
  color: #fff;
  background-color: #a120ec;
}
.header_container .logo{
  vertical-align: middle;
  display: flex;
}

#header > nav > div > div > a:link{
  text-decoration: none;
}
#header > nav > div > div > a > div:nth-child(1){
  margin-right: 10px;
}
#header > nav > div > div > a > div:nth-child(2){
  color: #a120ec;
  font-size: 30px;
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
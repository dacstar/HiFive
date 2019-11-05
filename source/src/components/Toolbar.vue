<template>
  <div id="header">
    <nav>
      <div class="container">
        <div class="header_container">
          <a href="/" class="logo">
            <div class="icon">
              <img id="hifive_logo" src="../assets/hifive_logo.png" width="27px" height="25px" />
            </div>
            <div id="hifive">HiFive</div>
          </a>
          <div class="header_menu">
            <ul>
              <!-- 공통 -->
              <div class="dropdown">
                <li class="dropbtn">
                  <router-link to="/" class="active">HiFive</router-link>
                </li>
                <div class="dropdown-content">
                  <li><router-link to="/qrcode">Go QRcode</router-link></li>
                  <li><router-link to="/map">HiFiveZone</router-link></li>
                </div>
              </div>
              
              <li><router-link to="/mypage">MyHifive</router-link></li>
            
              <!-- 로그인 한 상태 -->
              <div v-if="this.$store.state.user_nickname!=='' " class="login_menu">
                <li>{{this.$store.state.user_nickname}}님 반갑습니다!</li>
                <li v-on:click="logout"><router-link to="/">LogOut</router-link></li>
              </div>
              
              <!-- 로그인 안 한 상태 -->
              <div v-else>
                <div class="dropdown">
                  <li class="dropbtn"><router-link to="/login">Join</router-link></li>
                <div class="dropdown-content">
                  <li>
                    <router-link to="/login">LogIn</router-link>
                  </li>
                  <li>
                    <router-link to="/signup">SignUp</router-link>
                  </li>
                </div>
              </div>

              </div>
            </ul>

            <!-- 햄버거 메뉴 -->
            <div id="menuToggle">
              <input type="checkbox" />
              <span></span>
              <span></span>
              <span></span>
              <ul id="menu">
                <router-link to="/" class="ham_menus"><li>Home</li></router-link>
                <router-link to="/qrcode" class="ham_menus"><li>Go Hifve</li></router-link>
                <router-link to="/map" class="ham_menus"><li>HiFiveZone</li></router-link>
                <router-link to="/mypage" class="ham_menus"><li>MyHifive</li></router-link>
              <!-- 로그인 한 상태 -->
              <div v-if="this.$store.state.user_nickname!=='' " id="hamburger_logout">
                <router-link to="/"><li v-on:click="logout">LogOut</li></router-link>
              </div>
              
              <!-- 로그인 안 한 상태 -->
              <div v-else>
                <router-link to="/login" class="ham_menus"><li>LogIn</li></router-link>
                <router-link to="/signup" class="ham_menus"><li>SignUp</li></router-link>
              </div>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase';
import Swal from 'sweetalert2'
export default {
  
  methods: {
    scrollFunction() {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
          document.getElementById("header").style.height = "80px";
          document.getElementById("hifive").style.fontSize = "27px";
          document.getElementById("hifive_logo").style.width = "25px";
          document.getElementById("hifive_logo").style.height = "25px";
        } else {
          document.getElementById("header").style.height = "100px";
          document.getElementById("hifive").style.fontSize = "36px";
          document.getElementById("hifive_logo").style.width = "32px";
          document.getElementById("hifive_logo").style.height = "32px";
        }
    },
    logout() {
      firebase.auth().signOut().then(
        result => {
          // Sign-out successful.
          // alert('로그아웃 되었습니다!')
          Swal.fire('Logout Success!', '다시 돌아오기로 약속~!')
          this.$store.state.isLogin = false;
          this.$store.state.user_nickname = '';
        }).catch(function (error) {
          // An error happened.
          alert(error.message);
        });
    },
  },
  created() {
    window.addEventListener('scroll', this.scrollFunction);
  }
}
</script>

<style scoped>
.app {
  color: #a120ec;
  padding: 8px;
  margin: 0;
  padding: 0;
  height: 200px;
}
#header {
  font-family: "Jua", sans-serif;
}
.header_container:not(.ham_menus) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Jua", sans-serif;
}
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 30px 100px;
  box-sizing: border-box;
  transition: 0.5s;
  /* background: linear-gradient(to right, #ff5858, #f857a6); */
  background: #fff;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.2);
  z-index: 100000000;
}
nav #hifive {
  font-size: 2.4rem;
  color: #a120ec;
  float: left;
  transition: 0.5s;
}
nav .icon {
  transition: 0.5s;
}
.header_menu {
  display: inline;
}
nav ul:not(#menu) {
  float: right;
  margin: 0;
  padding: 0;
  display: flex;
}
nav ul:not(#menu) li {
  list-style: none;
}

.login_menu li {
  display: inline-block;
  color: black;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
}
.dropdown:hover .dropdown-content {
  display: none;
  position: absolute;
  margin-top: 5px;
  background-color: rgba(200, 25, 253, 0.1);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a {
  background-color: #fff;
}
.dropdown-content a:hover {
  background-color: #a120ec;
}
.dropdown:hover .dropdown-content {
  display: block;
}
nav ul:not(#menu) li a {
  list-style: 80px;
  color: black;
  padding: 5px 15px;
  text-decoration: none;
  text-transform: uppercase;
  transition: 0.5s;
  cursor: pointer;
}
nav ul:not(#menu) li a.active,
nav ul:not(#menu)li a:hover {
  color: #fff;
  background-color: #a120ec;
}
input[type="submit"] {
  font-family: "Jua", sans-serif;
  list-style: 80px;
  color: black;
  padding: 5px 15px;
  text-decoration: none;
  text-transform: uppercase;
  transition: 0.5s;
  cursor: pointer;
}
input[type="submit"]:hover {
  color: #fff;
  background-color: #a120ec;
}
.header_container:not(.ham_menus) .logo {
  vertical-align: middle;
  display: flex;
}
#header > nav > div > div > a:link {
  text-decoration: none;
}
#header > nav > div > div > a > div:nth-child(1) {
  margin-right: 10px;
}
#header > nav > div > div > a > div:nth-child(2) {
  color: #a120ec;
  font-size: 30px;
}

#menuToggle
{
  display: none;
  position: relative;
  left: 100px;
  
  z-index: 1;
  
  -webkit-user-select: none;
  user-select: none;
}

#menuToggle input
{
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;
  
  cursor: pointer;
  
  opacity: 0;
  z-index: 2; 
  
  -webkit-touch-callout: none;
}

#menuToggle span
{
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;
  
  background: #cdcdcd;
  border-radius: 3px;
  
  z-index: 1;
  
  transform-origin: 4px 0px;
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.55s ease;
}

#menuToggle span:first-child
{
  transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2)
{
  transform-origin: 0% 100%;
}

#menuToggle input:checked ~ span
{
  opacity: 1;
  transform: rotate(45deg) translate(-2px, -1px);
  background: #232323;
}

#menuToggle input:checked ~ span:nth-last-child(3)
{
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

#menuToggle input:checked ~ span:nth-last-child(2)
{
  transform: rotate(-45deg) translate(0, -1px);
}

#menu
{
  position: absolute;
  width: 170px;
  margin: -100px 0 0 -10px;
  padding: 40px;
  padding-top: 110px;
  
  background: #ededed;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  
  transform-origin: 0% 0%;
  transform: translate(100%, 0);
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
}

#menu .ham_menus {
  text-decoration: none;
}

#menu li
{
  padding: 10px 0;
  font-size: 22px;
  text-align: left;
}

#menuToggle input:checked ~ ul
{
  transform: none;
}

@media screen and (max-width: 768px) {
  .header_container:not(.ham_menus) {
    justify-content: center;
  }
  .header_container ul:not(#menu) {
    display: none;
  }
  #menuToggle {
    display: block;
  }
}
/* 
    SCREEN : DESKTOP
    SIZE : 1281px
  */
@media (min-width: 1281px) {
  .header_container:not(.ham_menus) {
    width: 90%;
    margin: 0 auto;
  }
}
/* 
    SCREEN : LABTOP AND DESKTOP
    SIZE : 1025px ~ 1280px
  */
@media (min-width: 1025px) and (max-width: 1281px) {
  .header_container:not(.ham_menus) {
    width: 90%;
    margin: 0 auto;
  }
}
/* 
    SCREEN : TABLET, IPAD
    SIZE : 768px to 1024px
  */
@media (min-width: 768px) and (max-width: 1024px) {
  .header_container:not(.ham_menus) {
    width: 90%;
    margin: 0 auto;
  }
}


</style>
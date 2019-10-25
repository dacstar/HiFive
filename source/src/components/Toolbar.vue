<template>
  
  <div class="app">
    <div class="navbar">
      <v-container>
        <div class="hifive">HiFive</div>
        <router-link to="/qrcode">Go HiFive</router-link> |
        <router-link to="/map">HiFiveZone</router-link> |
        <router-link to="/mypage">MyHifive</router-link> |
        <router-link to="/login">LogIn</router-link> |
        <router-link to="/signup">SignUp</router-link>
      </v-container>
    </div>

    <!-- 로그인 부분 -->
    <div class="login_navbar" v-if="this.$store.state.user_nickname!=='' ">
      {{this.$store.state.user_nickname}}님 안녕하세요~?
    </div>
    <div class="login_navbar" v-else>
      로그인이 필요합니다!
    </div>
     
  </div>

</template>

<script>
export default {
 
}
</script>

<style scoped>
  .app{
    /* color: #a120ec; */
    /* padding: 8px; */
    
  }

  
  .navbar{
    /* background-color:#a120ec; */
    /* height: 15vw; */
    height: 75px;
    width: 100%;
    background:rgba(0,0,0,0);
    border:0px;
    transition:ease-in-out 350ms;
    display: inline;
  }
  .navbar .hifive {
    font-family: 'Jua', sans-serif;
    font-size: 1.8rem;
    
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
  
  }
</style>
<template>
  <div class="app">
    <div class="navbar">
      <router-link to="/qrcode">1. 큐알코드 페이지</router-link> |
      <router-link to="/login">3. 로그인 페이지</router-link> |
      <router-link to="/signup">3-2. 회원가입 페이지</router-link> |
      <router-link to="/map">4. 카카오맵 페이지</router-link> |
      <router-link to="/mypage">5. 내 정보 관리 페이지</router-link>
    </div>
    <div class="login_navbar" v-if="this.$store.state.user_nickname!=='' ">
      {{this.$store.state.user_nickname}}님 안녕하세요~?
    </div>
    <div class="login_navbar" v-else>
      로그인이 필요합니다!
    </div>
  </div>
</template>

<style scoped>
  .app{
    color: white;
    padding: 8px;
  }
  .navbar{
    background-color:#e645dd;
  }
  .login_navbar{
    background-color:#8089df;
  }
  .app a{
    color: white;
    font-size: 24px;
  }
  .app a:active{
    color: rgb(141, 43, 233);
  }
</style>
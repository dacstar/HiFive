<template>
  <div class="app">
    <router-link to="/qrcode">1. 큐알코드 페이지</router-link> |
    <router-link to="/login">3. 로그인 페이지</router-link> |
    <router-link to="/signin">3-2. 회원가입 페이지</router-link> |
    <router-link to="/map">4. 카카오맵 페이지</router-link> |
    <router-link to="/mypage">5. 내 정보 관리 페이지</router-link>
  </div>
</template>

<style scoped>
  .app{
    color: white;
    padding: 8px;
    display: flex;
    background-color:#389664;
  }
  .app a{
    color: white;
    font-size: 24px;
  }
  .app a:active{
    color: rgb(141, 43, 233);
  }
</style>
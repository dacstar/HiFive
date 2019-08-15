<template>
  <div class="Header">
    <Navbar></Navbar>
    <HM></HM>
  </div>
</template>

<script>
import Navbar from "../components/HeaderContains/Navbar";
import HM from "../components/HeaderContains/HeaderMain";
export default {
  components:{
    Navbar,HM
  }
}
</script>

<style>
.Header{
  height:100vh;
}
</style>

<template>
  <div class="HiFive">
    <Header></Header>
    <Main></Main>
    <Howto></Howto>
    <Team></Team>
    <Member/>
    <Footer/>
  </div>
</template>

<script>
import Header from './views/Header.vue';
import Main from './views/Main.vue';
import Howto from './views/HowTo.vue';
import Team from './views/Team.vue';
import Member from './views/Member.vue';
import Footer from './views/Footer.vue';

export default {
  components:{
    Header,
    Main,
    Howto,
    Team,
    Member,
    Footer
  }
}
</script>

<style>

</style>

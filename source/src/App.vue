<template>
  <div id="app">
    <!-- ToolBar 대체용품. 더 편하다@! -->
    <tool-bar></tool-bar>
    <Footer></Footer>
    <router-view></router-view>
  </div>
</template>

<script>
import ToolBar from './components/Toolbar.vue';
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    ToolBar,
    Footer
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;
}
</style>

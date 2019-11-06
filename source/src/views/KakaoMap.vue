<template>
  <div id="app">
    <div class="container">
      <searchbar></searchbar>
      <!-- 카카오지도 -->
      <create-map></create-map>
    </div>
  </div>
</template>

<script>
import { functions } from 'firebase';
import { mapGetters, mapState } from 'vuex';
import CreateMap from "../components/CreateMap.vue";
import Searchbar from "../components/Searchbar.vue";

export default {
  components: {
    CreateMap,
    Searchbar
  },
  methods: {

  }
};
</script>

<style>
</style>
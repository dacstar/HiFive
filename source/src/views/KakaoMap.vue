<template>
  <div id="app">
    <div class="container">
      <searchbar></searchbar>
      <create-map></create-map>
      <!-- 카카오지도 -->
      <!-- <div class="map_wrap">
        <div id="map"></div>
      </div>-->
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
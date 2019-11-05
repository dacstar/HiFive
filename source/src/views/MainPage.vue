<template>
  <main-page-card></main-page-card>
</template>

<script>
import MainPageCard from "../components/MainPageCard.vue";

export default {
  components: {
    MainPageCard
  },
  created() {
    this.$store.dispatch("FETCH_STORES");
  }
}
</script>

<style>
</style>




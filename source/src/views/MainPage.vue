<template>
  <div id="app">
    <div class="container">
      <h1>This is MainPage!</h1>
      <!-- <searchbar></searchbar> -->
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("FETCH_STORES");
  }
}
</script>

<style>
</style>




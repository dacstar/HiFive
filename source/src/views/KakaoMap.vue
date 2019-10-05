<template>
  <div class="app">
      this is kakao map service & searching page
      <div v-for='store in stores'>
        {{store.title}}
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return {
      stores:[]
    }
  },
  created(){
    var scope = this;
    axios.get('https://api.hnpwa.com/v0/news/1.json')
    .then(function(response){
      console.log(response);
      scope.stores = response.data;
    })
    .catch(function(error){
      console.log(error);
    })
  }
}
</script>

<style>

</style>
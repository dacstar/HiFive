<template>
  <v-footer height="auto" color="pink lighten-3">
    <v-layout justify-center row wrap>
      <v-btn v-for="link in links" :key="link.text" :to="link.page" color="white" flat round>
        {{ link.text }}
      </v-btn>
      <v-flex grey darken-3 py-3 text-xs-center white--text xs12>
        &copy;2019 — <strong>SSAFY</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      {text:'Post', page:'/post'},
      {text:'Portfolio', page:'/portfolio'},
      {text:'Login', page:'/login'}
    ]
  })
}
</script>

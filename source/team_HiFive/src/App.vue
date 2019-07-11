<template>
  <v-app>
    <v-content>
      <router-view/>
      <back-to-top bottom="50px" right="50px">
        <v-btn fab dark small color="pink lighten-3">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </back-to-top>
    </v-content>
  </v-app>
</template>

<script>
import store from './store'
import BackToTop from 'vue-backtotop'

export default {
	name: 'App',
	store,
  data() {
		return {
			browser: BrowserDetect
		}
	},
  beforeCreate() {
    if(browser !== 'Chrome'){
      alert("본 사이트는 크롬버전에 최적화되어있습니다.")
    }
  }
}
</script>

<template>
<div class="hide-overflow" style="position: relative;">
    <v-toolbar fixed color="pink lighten-3">
      <v-btn flat icon to="/" color="white">
        <v-icon>home</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">YEONJI'S BLOG</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn to="/post" class="white--text" flat>Post</v-btn>
        <v-btn to="/portfolio" class="white--text" flat>Portfolio</v-btn>
        <v-btn to="/login" class="white--text" flat>Login</v-btn>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn class="white--text" flat v-on="on">
              <v-icon >star</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline pink lighten-3 white--text">
              안내
            </v-card-title>
            <v-card-text>
              즐겨찾기에 추가하려면 Ctrl+D를 누르세요
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="pink lighten-3" class="white--text" @click="dialog = false">확인</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar-items>
      <v-toolbar-side-icon class="hidden-sm-and-up white--text" @click="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>

    <v-navigation-drawer app right disable-resize-watcher v-model="drawer" class="pink lighten-3">
      <v-list>
        <v-list-tile @click="$router.push('/post')">
          <v-list-tile-content>
            <v-list-tile-title class="white--text title">Post</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.push('/portfolio')">
          <v-list-tile-content>
            <v-list-tile-title class="white--text title">Portfolio</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.push('/login')">
          <v-list-tile-content>
            <v-list-tile-title class="white--text title">Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

</div>
</template>

<script>
export default {
  name: 'myHeader',
  props: {},
  data(){
    return {
      drawer:false,
      dialog:false
    }
  }
}
</script>

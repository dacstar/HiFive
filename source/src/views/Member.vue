<template>
  <div class="Member">
    <h1 class="grey--text">하이파이브가 이 세상에 나오기까지,<span class="purple--text">노력한 사람들</span></h1>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="person.avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div>{{ person.name }}</div>
              <div>{{ person.role }}</div>
              <div>{{ person.intro}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        team: [
        { name: '유동관', role: '팀장', avatar: '/avatar-1.png', intro: '자기소개' },
        { name: '노현우', role: 'Web developer', avatar: '/avatar-2.png', intro: '자기소개' },
        { name: '신채원', role: 'Graphic designer', avatar: '/avatar-3.png', intro: '자기소개' },
        { name: '박길준', role: 'Social media maverick', avatar: '/avatar-4.png', intro: '자기소개' }
        ]
      }
    }
  }
</script>

<style>
.Team{
  height:100vh;
    background: gold;
}
</style>

<template>
<div>
  <myHeader></myHeader>
  <ImgBanner imgSrc="https://source.unsplash.com/random/1600x900">
    <div style="line-height:1.2em;font-weight:900;color:white;" slot="text">Hello, Vue.js!</div>
  </ImgBanner>
  <v-container>
    <v-layout my-5>
      <div v-if="xs">

      </div>
      <v-flex xs12 sm8>
        <h2 class="headline mb-3">About Me</h2>
        <p class="mr-4">안녕하세요!<br />뷰를 시작했습니다.<br/>사진 출처:twitter.com/anonymous_ikm</p>
      </v-flex>
      <v-flex hidden-xs-only sm4>
        <v-img :src="getImgUrl('profile.jpg')" aspect-ratio="1.5" />
      </v-flex>
    </v-layout>

    <!-- Portfolio -->
    <v-layout my-5>
      <v-flex xs12>
        <h2 class="headline my-5 text-xs-center">Portfolio</h2>
        <PortfolioList></PortfolioList>
      </v-flex>
    </v-layout>

    <!-- Post -->
    <v-layout my-5>
      <v-flex xs12>
        <h2 class="headline my-5 text-xs-center">Post</h2>
        <PostList :column="2"></PostList>
      </v-flex>
    </v-layout>


    <!-- Github -->
    <v-layout my-5>
      <v-flex xs12>
        <h2 class="headline my-5 text-xs-center">Project</h2>
        <RepositoryList></RepositoryList>
      </v-flex>
    </v-layout>
  </v-container>
  <myFooter></myFooter>
</div>
</template>

<script>
import myHeader from '../components/myHeader'
import ImgBanner from '../components/ImgBanner'
import PortfolioList from '../components/PortfolioList'
import PostList from '../components/PostList'
import RepositoryList from '../components/RepositoryList'
import myFooter from '../components/myFooter'

export default {
  name: 'HomePage',
  components: {
    myHeader,
    ImgBanner,
    PortfolioList,
    PostList,
    RepositoryList,
    myFooter
  },
  methods: {
    getImgUrl(img) {
      return require('../assets/' + img)
    }
  }
}
</script>

<style>
  @media (min-width:601px) {
    p {
      font-size: 20px;
    }
  }
  @media (max-width:600px) {
    p {
      text-align: center;
      font-size: 15px;
    }
  }
</style>

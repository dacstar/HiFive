<template>
  <div>
    <myHeader></myHeader>
    <ImgBanner imgSrc="https://source.unsplash.com/random/1600x900">
      <div style="line-height:1.2em;font-size:1.2em;font-weight:900;color:white;" slot="text">Post</div>
    </ImgBanner>
    <v-container>

      <!-- Post -->
      <v-layout>
        <v-flex xs12>
          <PostList :limits="8" :load-more="true"></PostList>
        </v-flex>
      </v-layout>

    </v-container>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from '../components/myHeader'
import ImgBanner from '../components/ImgBanner'
import PostList from '../components/PostList'
import myFooter from '../components/myFooter'

export default {
	name: 'PostPage',
	components: {
    myHeader,
		ImgBanner,
		PostList,
    myFooter
	},
}
</script>

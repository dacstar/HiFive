<template>
  <div>
    <myHeader></myHeader>
    <ImgBanner imgSrc="https://source.unsplash.com/random/1600x900">
      <div style="line-height:1.2em;font-size:1.2em;font-weight:900;color:white;" slot="text">Portfolio</div>
    </ImgBanner>
    <v-container>

      <v-layout>
        <v-flex xs12 mt-4 text-xs-center>
          <v-btn class="white--text" color="pink lighten-3" to="/portfoliowrite">
            <v-icon size="25" class="mr-2">mdi-pencil-plus</v-icon> 포트폴리오 작성하기
          </v-btn>
        </v-flex>
      </v-layout>

      <!-- Portfolio -->
      <v-layout>
        <v-flex xs12>
          <PortfolioList :limits="8" :load-more="true"></PortfolioList>
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
import myFooter from '../components/myFooter'

export default {
	name: 'PortfolioPage',
	components: {
    myHeader,
		ImgBanner,
		PortfolioList,
    myFooter
	},
}
</script>

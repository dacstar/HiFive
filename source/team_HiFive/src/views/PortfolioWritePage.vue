<template>
  <div>
    <myHeader></myHeader>
    <ImgBanner imgSrc="https://source.unsplash.com/random/1600x900">
      <div style="line-height:1.2em;font-size:1.2em;font-weight:900;color:white;" slot="text">Portfolio Write</div>
    </ImgBanner>
    
    <v-container>
      <PortfolioWrite></PortfolioWrite>
    </v-container>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from '../components/myHeader'
import ImgBanner from '../components/ImgBanner'
import PortfolioWrite from '../components/PortfolioWrite'
import myFooter from '../components/myFooter'

export default {
	name: 'PortfolioWritePage',
	components: {
    myHeader,
		ImgBanner,
		PortfolioWrite,
    myFooter
	},
}
</script>

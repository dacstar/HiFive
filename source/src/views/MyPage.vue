<template>
  <my-page-list></my-page-list>
</template>

<script>
import MyPageList from "../components/MyPageList.vue";

export default {
  components: {
    MyPageList
  }
}
</script>
<<<<<<< HEAD
<style>
=======

<style scoped>
.my_hifive_info {
  font-size: 30px;
  font-family: 'Jua', sans-serif;
}

.hifive_rank {
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: 'Jua', sans-serif;
}

ul {
    position: relative;
    width: 80%;
    margin: 0 auto;
    padding: 10px;
    box-sizing: border-box;
    background: rgba(200, 25, 253, 0.1);
    box-shadow: inset 0 0 15px rgba(198, 1, 247, 0.2);
    /* border-block-color: purple; */
    
    /* border-radius: 5px; */
    overflow: hidden;
}

ul li {
    display: flex;
    background: rgba(255, 255, 255, .1);
    padding: 10px 20px;
    color:black;
    margin: 5px 0;
    transition: .5s;
    align-items: center;
    justify-content: space-between;
    font-family: 'Do Hyeon', sans-serif;
}
ul li:nth-child(1) {
    background: rgba(255, 255, 255, .6)
}
ul li:nth-child(2) {
    background: rgba(255, 255, 255, .4)
}
ul li:nth-child(3) {
    background: rgba(255, 255, 255, .2);
}

ul li span:nth-child(1) {
    width: 30px;
    margin-right: 20px;
    /* margin-left: 10px; */
    font-size: 1rem;
}
ul li span:nth-child(2) {
    width: 200px;
    margin-left: 10px;
}
ul li span:nth-child(3) {
    text-align: right;
    margin-left: 10px;
    padding-right: 30px;
}
ul li span:nth-child(4) {
    width: 70px;
    text-align: right;
    align-items: center;

}
ul li:hover {
    transform:scale(1.06);
    background: #a120ec;
}
>>>>>>> b5dacbcec35c592a2d5608546178455ae6785110
</style>
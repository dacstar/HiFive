<template>
  <div class="navbar">
      <ul>
        <li><a class="left" href="#home">Home</a></li>
         <div class="user">
            <li><a href="#contact">로그인</a></li>
            <li><a href="#about">회원가입</a></li>
        </div>
        <div class="left">
            <li><a href="right">News</a></li>
            <li><a href="#contact">vision</a></li>
            <li><a href="#contact">howto</a></li>
            <li><a href="#contact">Community</a></li>
            <li><a href="#about">team</a></li>
        </div>   
      </ul>
  </div>
</template>

<script>

export default {
    data(){
        return {
            
        }
    }
}
</script>

<style scoped>
    ul{
        display:block;
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
        position:fixed;
        top:0;
        width:100%;
    }
    ul > li{
        list-style-type: none;
        float: left;
        padding-right:25px;
    }
    li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }
    ul>.left{
        float: left;
        display: flex;
    }
    ul>.right{
        float: right;
        display:flex;
    }
    .left>li{
        padding-left: 20px;
    }
    ul>.user{
        float:right;
        display:flex;
        padding-right: 20px;
    }
    @media screen and (max-width: 768px) { ul { display: none; } }

</style>

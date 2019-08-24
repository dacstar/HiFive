<template>
  <div class="TeamContains">
      <div class="title">
        <h1>하이파이브, 뭐하는 스타트업이지?</h1>
      </div>
    
    <div class="row">
        <div class="col left">
            <ul>
                <li><a href="#">장소 평가 시스템</a></li>
                <li><a href="#">간편함</a></li>
                <li><a href="#">재미</a></li>
                <li><a href="#">성취</a></li>
                <li><a href="#">객관성</a></li>
            </ul>
        </div>
        <div class="col right">
            <ul>
                <li>간편함, 재미, 성취</li>
                <li>찍고 -- 방문했니? -- 맘에 들면 방문 한거고, 아님 안찍고. 큐알 코드를 통한 소통</li>
                <li>훈장 시스템. 여기저기 방문하면서 레밸 업 및 재미. ex) 이 구역의 수호자</li>
                <li>2차 전직, 3차 전직, 원칙.</li>
                <li>점주입장. 많이 방문한 곳은 그냥 확실한 지표이다. 시간대, 연령, 프리미엄 서비스 제공으로 인한 수익구조 창출.</li>
            </ul>
        </div>
    </div>

  </div>
</template>

<script>
export default {
    data:{
        return:{

        }
    },
    methods:{
        
    }
}
</script>

<style scoped>
    .TeamContains{
        display: grid;
        grid-template-rows: 10% 90%;
        height: 100vh;
    }
    .title{
        grid-column:1/3;
    }
    .row{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .left{
        padding: 10px;
        margin-left: 10px;
    }
    .right{
        background-color: bisque;
    }
    li{
        list-style: none;
        padding: 20px 0;
    }
    
    li > a{
        font-size: 60px;
        font-weight: bold;
        color: #ccc;
        text-decoration: none;
    }
</style>
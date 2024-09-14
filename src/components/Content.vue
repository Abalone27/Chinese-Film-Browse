<template>
  <section class="container" :class="modeClass">
    <h2>背景</h2>
    <p>
      在当今社会，获取电影信息变得前所未有的便捷。随着互联网的普及和各种数字平台的兴起，用户只需通过手机或电脑，便可以轻松访问到最新的电影资讯、预告片、影评以及上映时间等详细信息。社交媒体、专门的电影评分网站以及流媒体服务提供了丰富的资源，使得选择观看电影变得更加简单和透明。然而，由于信息的丰富性和多样性，用户也面临信息过载的问题，难以快速找到高质量、可靠的电影推荐。
    </p>

    <h3>本网站的宗旨</h3>
    <p>
      通过提供权威且高质量的电影信息和评分，帮助用户快速筛选和发现优秀的电影。本网站整合了多个可靠的电影数据源，提供全面的电影资料，包括电影海报、名称、评分等详细信息，方便用户做出观影决策。无论是想寻找高评分的经典电影，还是探索最新上映的热门影片，此网站都能为用户提供准确、及时的电影信息，极大地提升了用户获取电影资讯的效率和体验。
    </p>
  </section>
</template>

<script setup lang="ts">
import { inject ,ref,Ref,watchEffect} from 'vue';

const isDarkMode =inject("modeChange") as Ref<boolean>
const modeClass=ref("")

watchEffect(()=>{
  modeClass.value=isDarkMode.value?"night":""
})  

</script>

<style scoped lang="scss">
section.container {
  background-color: transparent;
  max-width: 80%;
  margin: 0 auto;

  h2,
  h3 {
    color: #555;
    font-size: 5rem;
    margin: 50px 0;
  }

  p {
    color: #555;
    line-height: 70px;
    font-size: 1.7rem;
    letter-spacing: 1.2px;
  }
}
section.container.night {
  h2,h3,p {
    color: #c4c2c2;
  }
}
</style>

<template>
  <section class="container" :class="['fade-in', modeClass, { active: sectionVisible }]" ref="section">
    <h2>背景</h2>
    <p ref="paragraph1" :class="{ active: paragraph1Visible }">
      在当今社会，获取电影信息变得前所未有的便捷。随着互联网的普及和各种数字平台的兴起，用户只需通过手机或电脑，便可以轻松访问到最新的电影资讯、预告片、影评以及上映时间等详细信息。社交媒体、专门的电影评分网站以及流媒体服务提供了丰富的资源，使得选择观看电影变得更加简单和透明。然而，由于信息的丰富性和多样性，用户也面临信息过载的问题，难以快速找到高质量、可靠的电影推荐。
    </p>

    <h3>本网站的宗旨</h3>
    <p ref="paragraph2" :class="{ active: paragraph2Visible }">
      通过提供权威且高质量的电影信息和评分，帮助用户快速筛选和发现优秀的电影。本网站整合了多个可靠的电影数据源，提供全面的电影资料，包括电影海报、名称、评分等详细信息，方便用户做出观影决策。无论是想寻找高评分的经典电影，还是探索最新上映的热门影片，此网站都能为用户提供准确、及时的电影信息，极大地提升了用户获取电影资讯的效率和体验。
    </p>
    <button class="chat" @click="JumpToChat()">进入在线电影聊天室</button>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useModeStore } from '../stores/modeStores';
import { useRouter } from 'vue-router';

const router = useRouter();

const modeStore = useModeStore();
const { isNightMode } = storeToRefs(modeStore);

const modeClass = ref("");
const sectionVisible = ref(false);
const paragraph1Visible = ref(false);
const paragraph2Visible = ref(false);
const section = ref<HTMLElement | null>(null);
const paragraph1 = ref<HTMLElement | null>(null);
const paragraph2 = ref<HTMLElement | null>(null);

watchEffect(() => {
  modeClass.value = isNightMode.value ? "night" : "";
});

onMounted(() => {
  const observerOptions = { threshold: 0.1 };

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.target === section.value) {
        sectionVisible.value = entry.isIntersecting;
      }
      if (entry.target === paragraph1.value) {
        paragraph1Visible.value = entry.isIntersecting;
      }
      if (entry.target === paragraph2.value) {
        paragraph2Visible.value = entry.isIntersecting;
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  if (section.value) observer.observe(section.value);
  if (paragraph1.value) observer.observe(paragraph1.value);
  if (paragraph2.value) observer.observe(paragraph2.value);
});

function JumpToChat(this: any) {
  router.push('/chat')
}
</script>

<style scoped lang="scss">
section.container {
  height: 100%;
  background-color: transparent;
  max-width: 80%;
  margin: 0 auto;
  margin-bottom: 10px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s ease, transform 1s ease;
  padding: 20px;

  &.active {
    opacity: 1;
    transform: translateY(0);
    transition-duration: 3s;
  }

  h2 {
    color: #555;
    font-size: 3.8rem;
    margin: 30px 0;
  }

  h3 {
    color: #555;
    font-size: 2.8rem;
    margin: 20px 0;
  }

  p {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    color: #555;
    line-height: 1.5;
    font-size: 1.8rem;
    letter-spacing: 0.5px;
    overflow-wrap: break-word;
    margin-bottom: 80px;

    &.active {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

section.container.night {
  h2, h3, p {
    color: #c4c2c2;
  }
}

.chat {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65%;
  margin: 0 auto;
  height: 5vh;
  background-color: rgb(108, 79, 136);
  color: azure;
  border-radius: 9px;
  font-size: 1.8rem;
  padding: 3vh 3vh;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
}

</style>

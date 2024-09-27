<template>
  <div class="container">
    <!-- 根据路由meta信息，动态显示布局或者仅显示页面内容 -->
    <div v-if="!isAuthPage">
      <film-header></film-header>
      <section :class="mode">
        <hero></hero>
        <content></content>
        <router-view></router-view>
      </section>
    </div>
    
    <!-- 如果是登录或注册页面，仅显示内容 -->
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide, watchEffect, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useModeStore } from './stores/modeStores';

const modeStore = useModeStore()
const route=useRoute()

// 检查当前路由是否是登录或注册页面
const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/register';
});

const { isNightMode } = storeToRefs(modeStore)

interface Movie {
  movieId: number;
  name: string;
  poster: string;
  score: string;
}
interface Details {
  title: String | null;
  brief: String | null;
  isActive: Boolean;
}

const API = 'https://apis.netstart.cn/maoyan/index/topRatedMovies';

const movies = ref<Movie[]>([]);

const mode = ref("")

const details = ref<Details>({
  title: null,
  brief: null,
  isActive: false,
});

provide('details', details);

async function GetInfo(API: string | URL | Request) {
  const response = await fetch(API);
  const data = await response.json();
  console.log(data);

  movies.value = data.movieList;
}

onMounted(() => {
  GetInfo(API);
});

watchEffect(() => {
  mode.value = isNightMode.value ? "night" : ""
});

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap');

:root {
  --light-bg-color: rgba(250, 235, 215, 0.3);
  --night-bg-color: rgba(50, 50, 50, 0.971);
  --text-color: #f8f4f4;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: 'Noto Sans SC', 'sans-serif';
  padding-bottom: 50px;
  color: #222;
}

.container {
  position: relative;
  height: 100%;
}

section {
  width: 100%;
  background-color: var(--light-bg-color);
}

section.night {
  background-color: var(--night-bg-color);
  color: var(--text-color);
}

.movie {
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 1000;
}
</style>
<template>
  <section :class="mode">
    <h1>Coming soon...</h1>
    <ul class="movie">
      <li v-for="movie in movies" :key="movie.id">
        <film-board :movie="movie" :infoApi="Info_API"></film-board>
      </li>
    </ul>
    <film-info></film-info>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useModeStore } from '../stores/modeStores';
import FilmBoard from '@/components/FilmBoard_Coming.vue';

const modeStore = useModeStore();
const { isNightMode } = storeToRefs(modeStore);
const mode = ref("");

interface Movie {
  id: number;
  nm: string; // 电影名称
  img: string; // 图片链接
  dir: string; // 导演
  cat: string; // 分类
  dur: number; // 时长
  wish: number; // 期待人数
  dra: string; // 简介
}

// 将 API URL 修改为通过代理路径
const API = '/api/ajax/comingList?ci=10&token=&limit=20';
const Info_API = '/api/ajax/detailmovie';

const movies = ref<Movie[]>([]);

async function GetInfo(apiUrl: string) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // 打印返回的 API 数据
    console.log("API 返回的数据:", data);
    movies.value = data.coming; 
  } catch (error) {
    console.error("获取电影数据失败:", error);
  }
}

watchEffect(() => {
  mode.value = isNightMode.value ? "night" : "";
});

onMounted(() => {
  GetInfo(API);
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap');

:root {
  --light-bg-color: rgba(250, 235, 215, 0.3);
  --night-bg-color: rgba(61, 61, 61, 0.971);
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

h1 {
  font-size: 36px;
  text-align: center;
  margin: 20px;
}
</style>

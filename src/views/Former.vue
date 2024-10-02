<template>
  <section :class="mode">
    <h1>Classic movies...</h1>
    <ul class="movie">
      <li v-for="movie in movies" :key="movie.id">
        <film-board :movie="movie" :infoApi="Info_API"></film-board>
      </li>
    </ul>
  </section>
  <film-info></film-info>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useModeStore } from '@/stores/modeStores';
import FilmBoard from '@/components/FilmBoard_Former.vue';


interface Movie {
  id: number;
  img: string;
  nm: string;
  sc: string;
}

const modeStore = useModeStore();
const { isNightMode } = storeToRefs(modeStore);
const mode = ref("");

// API 路径
const API = '/api/asgard/asgardapi/mmdb/movieboard/moviedetail/fixedboard/39.json?ci=1&year=0&term=0&limit=100&offset=0';
const Info_API = '/api/ajax/detailmovie';

// 定义电影列表
const movies = ref<Movie[]>([]);

// 获取往期经典电影数据
async function GetClassicMovies(apiUrl: string) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // 打印返回的 API 数据
    console.log("API 返回的数据:", data);
    movies.value = data.data.movies;
  } catch (error) {
    console.error("获取电影数据失败:", error);
  }
}

// 根据夜间模式调整样式
watchEffect(() => {
  mode.value = isNightMode.value ? "night" : "";
});

// 组件挂载时获取数据
onMounted(() => {
  GetClassicMovies(API);
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

h1 {
  font-size: 36px;
  text-align: center;
  margin: 20px;
}
</style>
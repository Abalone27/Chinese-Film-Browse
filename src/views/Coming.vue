<template>
  <section :class="mode">
    <h1>即将推出</h1>
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
  comingTitle: string;
  img: string;
  nm: string;
  sc: string;
  rt: string;
  star: string;
  showInfo: string;
  wish: number;
}

const API = 'https://apis.netstart.cn/maoyan/index/comingList';
const Info_API = 'https://apis.netstart.cn/maoyan/movie/detail';

const movies = ref<Movie[]>([]);

async function GetInfo(apiUrl: string) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    movies.value = data.coming; 
  } catch (error) {
    console.error("Failed to fetch movie data:", error);
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
</style>

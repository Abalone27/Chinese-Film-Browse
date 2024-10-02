<template>
  <section :class="mode">
    <h1>搜索结果：“{{ keyword }}”</h1>
    <ul class="movie">
      <li v-for="movie in movies" :key="movie.id">
        <film-board :movie="movie" :infoApi="Info_API" :key="movie.id"></film-board>
      </li>
    </ul>

    <film-info></film-info>
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useModeStore } from '../stores/modeStores';
import FilmBoard from '@/components/FilmBoard_Search.vue';

const modeStore = useModeStore();
const { isNightMode } = storeToRefs(modeStore);
const mode = ref("");

interface Movie {
  id: number;
  img: string;
  nm: string;
  sc: string;
}

const Info_API = '/api/ajax/detailmovie';
const route = useRoute();
const keyword = ref(route.query.keyword || '');
const movies = ref<Movie[]>([]);

async function GetInfo() {
  const searchAPI = `/api/ajax/search?kw=${keyword.value}&cityId=1&stype=0&limits=20`;
  try {
    const response = await fetch(searchAPI);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    // 确保提取到 movies.list
    movies.value = data.movies.list || [];
  } catch (error) {
    console.error('Failed to fetch movies:', error);
  }
}


// 监测 keyword 变化，调用 GetInfo
watch(
  () => route.query.keyword,
  (newKeyword) => {
    keyword.value = newKeyword || '';
    GetInfo();
  },
  { immediate: true }
);

watchEffect(() => {
  mode.value = isNightMode.value ? "night" : "";
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

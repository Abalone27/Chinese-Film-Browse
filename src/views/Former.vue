<template>
  <section :class="mode">
    <h1>Classic movies...</h1>
    <ul class="movie">
      <li v-for="movie in movies" :key="movie.movieId">
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

interface MovieInfo {
  title: string;
  actors: string;
  showInfo: string;
}

interface Movie {
  movieId: number;
  poster: string;
  score: string;
  movieInfo: MovieInfo;
}

const modeStore = useModeStore();
const { isNightMode } = storeToRefs(modeStore);
const mode = ref("");

// API 路径
const API = 'https://apis.netstart.cn/maoyan/index/moreClassicList';
const Info_API = 'https://apis.netstart.cn/maoyan/movie/detail';

// 定义电影列表
const movies = ref<Movie[]>([]);

// 获取往期经典电影数据
async function GetClassicMovies() {
  const response = await fetch(API);
  const data = await response.json();
  console.log(data);

  // 处理返回的数据
  movies.value = data.map((movie: any) => ({
    movieId: Number(movie.movieId),
    name: movie.movieInfo?.title || movie.name || '未知标题',
    poster: movie.poster || '',
    score: movie.score || '暂无评分',
    movieInfo: {
      title: movie.movieInfo?.title || '未知标题',
      actors: movie.movieInfo?.actors || '未知演员',
      showInfo: movie.movieInfo?.showInfo || '未知上映信息',
    }
  }));
}

// 根据夜间模式调整样式
watchEffect(() => {
  mode.value = isNightMode.value ? "night" : "";
});

// 组件挂载时获取数据
onMounted(() => {
  GetClassicMovies();
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
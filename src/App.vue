<template>
  <div class="container">
    <film-header></film-header>
    <section :class="mode">
      <hero></hero>
      <content></content>
    <router-view></router-view>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, provide,watchEffect } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useModeStore } from './stores/modeStores';

  const modeStore = useModeStore()

  const {isNightMode} = storeToRefs(modeStore)

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
  const Info_API = 'https://apis.netstart.cn/maoyan/movie/detail';

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
    mode.value = isNightMode.value?"night":""
});

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap');

  :root {
    --light-bg-color:rgba(250, 235, 215, 0.3);
    --night-bg-color:rgba(50, 50, 50, 0.971);
    --text-color:#f8f4f4;
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

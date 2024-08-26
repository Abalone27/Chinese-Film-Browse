<template>
  <div class="container">
    <film-header></film-header>
    <section>
      <hero></hero>
      <content></content>
      <ul class="movie">
        <li v-for="movie in movies" :key="movie.movieId">
          <film-board :movie="movie" :infoApi="Info_API"></film-board>
        </li>
      </ul>
    </section>
    <film-info></film-info>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, provide } from 'vue';
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
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap');

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
  }

  section {
    width: 100%;
    background-color: rgba(250, 235, 215, 0.3);
  }

  .movie {
    display: flex;
    margin: 0 auto;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>

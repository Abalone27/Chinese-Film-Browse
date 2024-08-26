<template>
  <div class="container" @click="ShowDetails(movie.movieId)">
    <img :src="movie.poster" :alt="movie.name" />
    <div class="movie-info">
      <h3>{{ movie.name }}</h3>
      <span class="rating" :style="{ color: ratingColor }">{{ movie.score == '' ? '暂无评分' : movie.score }}</span>
    </div>
    <div class="details">
      <h3>details</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, inject, Ref } from 'vue';

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

  const details = inject('details') as Ref<Details>;

  function getClassByRate(vote: number) {
    if (vote >= 8) {
      return 'green';
    } else if (vote >= 5) {
      return 'orange';
    } else if (vote < 5 && vote > 0) {
      return 'red';
    } else {
      return 'grey';
    }
  }

  const props = defineProps<{ movie: Movie; infoApi: string }>();
  const ratingColor = getClassByRate(Number(props.movie.score));

  async function ShowDetails(movieId: number) {
    const response = await fetch(props.infoApi + '?movieId=' + movieId);
    const data = await response.json();
    console.log(movieId);
    console.log(data.$share.wechat.message);
    const message = data.$share.wechat.message;
    details.value = {
      title: message.title,
      brief: message.desc,
      isActive: true,
    };
  }
</script>

<style scoped lang="scss">
  .container {
    position: relative;
    width: 300px;
    background-color: rgba(250, 235, 215, 0.8);

    margin: 30px 40px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.4);
    transition: transform 0.4s ease;
    &:hover {
      cursor: pointer;
      transform: translateY(-4px) scale(1.02);
    }
  }
  .img {
    width: 100%;
    background-position: top left;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .movie-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-size: 1.5rem;
      padding: 8px 10px;
    }
    .rating {
      font-size: 1.5rem;
      margin-right: 10px;
    }
  }
  .details {
    position: absolute;
    display: none;
  }
</style>

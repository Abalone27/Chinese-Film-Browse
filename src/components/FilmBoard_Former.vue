<template>
  <div class="container" :class="modeClass" @click="ShowDetails(movie.movieId)">
      <img :src="movie.poster" :alt="movie.movieInfo.title" />
      <div class="movie-info">
          <h3>{{ movie.movieInfo.title }}</h3>
          <span class="rating" :style="{ color: ratingColor }">{{ movie.score == '' ? '暂无评分' : movie.score }}</span>
      </div>
      <div class="details">
          <h3>details</h3>
      </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, Ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useModeStore } from '../stores/modeStores';

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

interface Details {
  title: string | null;
  brief: string | null;
  isActive: boolean;
}

const details = inject('details') as Ref<Details>;
const modeStore = useModeStore();
const { isNightMode } = storeToRefs(modeStore);

const modeClass = ref("");

watchEffect(() => {
  modeClass.value = isNightMode.value ? "night" : "";
});

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
  const message = data.$share.wechat.message;
  details.value = {
      title: message.title,
      brief: message.desc,
      isActive: true,
  };
}
</script>

<style scoped lang="scss">
:root{
  --light-color:rgba(250, 235, 215, 0.8);
  --night-color:rgba(121, 111, 97, 0.8);
}
.container {
  position: relative;
  width: 300px;
  background-color: --light-bg-color;

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

.container.night {
background-color: var(--night-color);
}

img {
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

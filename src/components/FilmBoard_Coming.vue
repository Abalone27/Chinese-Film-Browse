<template>
  <div class="container" :class="modeClass" @click="ShowDetails(movie.id)">
    <img :src="movie.img" :alt="movie.comingTitle" />
    <div class="movie-info">
      <h3>{{ movie.nm }}</h3>
      <span class="rating" :style="{ color: ratingColor }">
        {{ movie.wish }}人期待
      </span>
    </div>
    <div class="details">
      <h3>{{ movie.comingTitle }}</h3>
      <p>{{ movie.rt }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, Ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useModeStore } from '../stores/modeStores';

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
const ratingColor = getClassByRate(Number(props.movie.sc));

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
:root {
  --light-color: rgba(250, 235, 215, 0.8);
  --night-color: rgba(121, 111, 97, 0.8);
}

.container {
  position: relative;
  width: 300px;
  background-color: var(--light-color);

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

.movie-info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.5rem;
    padding: 8px 10px;
  }

  .rating {
    font-size: 1.2rem;
    margin-right: 10px;
  }
}

.details {
position: absolute;
display: none;
}
</style>

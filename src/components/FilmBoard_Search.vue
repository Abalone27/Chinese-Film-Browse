<template>
  <div class="container" :class="modeClass" @click="handleSelectMovie">
    <img :src="movie.poster" :alt="movie.name" />
    <div class="movie-info">
      <h3>{{ movie.name }}</h3>
      <span class="rating" :style="{ color: ratingColor }">
        {{ movie.score === '' ? '暂无评分' : movie.score }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useModeStore } from '@/stores/modeStores';

interface Movie {
  id: number;
  name: string;
  poster: string;
  score: string;
}

// 定义 emits
const emit = defineEmits(['select']);

// 获取夜晚模式的状态
const modeStore = useModeStore();
const { isNightMode } = storeToRefs(modeStore);
const modeClass = ref('');
watchEffect(() => {
  modeClass.value = isNightMode.value ? 'night' : '';
});

// 获取评分对应的颜色
function getClassByRate(score: number) {
  if (score >= 8) {
    return 'green';
  } else if (score >= 5) {
    return 'orange';
  } else if (score < 5 && score > 0) {
    return 'red';
  } else {
    return 'grey';
  }
}

const props = defineProps<{ movie: Movie; infoApi: string }>();
const ratingColor = ref(getClassByRate(Number(props.movie.score) || 0));

function handleSelectMovie() {
  console.log("Selected movie:", props.movie);
  emit('select', props.movie);
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
  height: 450px;
  background-color: var(--light-color);
  margin: 30px 40px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.4);
  transition: transform 0.4s ease;
  cursor: pointer;

  &:hover {
    cursor: pointer;
    transform: translateY(-5px) scale(1.05);
    transition: 0.5s ease-in-out;
  }
}

.container.night {
  background-color: var(--night-color);
}
img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.movie-info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.5rem;
    padding: 8px 10px;
    max-width: 60%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .rating {
    font-size: 1.5rem;
    margin-right: 10px;
    max-width: 70%;
    overflow: hidden;
    text-overflow: ellipsis; 
  }
}
</style>

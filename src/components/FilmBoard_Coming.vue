<template>
  <div class="container" :class="['fade', modeClass]" @click="ShowDetails(movie.id)">
    <img class="img" :src="movie.img" :alt="movie.nm" />
    <div class="movie-info">
      <h3>{{ movie.nm }}</h3>
      <span class="rating">{{ movie.wish }}人期待</span>
    </div>
    <div class="details">
      <h3>{{ movie.nm }}</h3>
      <p>导演: {{ movie.dir }}</p>
      <p>分类: {{ movie.cat }}</p>
      <p>时长: {{ movie.dur }}分钟</p>
      <p>简介: {{ movie.dra }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, Ref, watchEffect, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useModeStore } from '../stores/modeStores';

interface Movie {
  id: number;
  nm: string; 
  img: string; 
  dir: string;
  cat: string;
  dur: number;
  wish: number;
  dra: string;
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

const props = defineProps<{ movie: Movie; infoApi: string }>();

async function ShowDetails(movieId: number) {
  const response = await fetch(props.infoApi + '?movieId=' + movieId);
  const data = await response.json();
  const message = data.detailMovie; // 更新以访问 detailMovie
  details.value = {
    title: message.nm,
    brief: message.dra,
    isActive: true,
  };
}

// 添加 Intersection Observer
onMounted(() => {
  const containers = document.querySelectorAll('.container');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('pop-in'); // 添加弹入效果类
      } else {
        entry.target.classList.remove('pop-in'); // 移除弹入效果类
      }
    });
  });

  containers.forEach(container => observer.observe(container));
});
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
  overflow: hidden;
  transform: translateY(50px);
  transition: transform 2s ease;

  &.pop-in {
    transform: translateY(0);
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-5px) scale(1.05);
    transition: 0.5s ease-in-out;
  }
}

.container.night {
  background-color: var(--night-color);
}

.img {
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
  overflow: hidden; 
  white-space: nowrap;
  text-overflow: ellipsis;

  h3 {
    font-size: 1.5rem;
    padding: 8px 10px;
    max-width: 50%;
    overflow: hidden; 
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

.details {
  position: absolute;
  display: none; // 这里可以根据需求更改显示方式
}
</style>

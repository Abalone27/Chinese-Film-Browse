<template>
  <div class="container" :class="['fade', modeClass]" @click="ShowDetails(movie.movieId)">
    <img class="img" :src="movie.poster" :alt="movie.name" />
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
import { inject, ref, Ref, onMounted, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useModeStore } from '../stores/modeStores';

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
  const message = data.$share.wechat.message;
  details.value = {
    title: message.title,
    brief: message.desc,
    isActive: true,
  };
}

// 添加 Intersection Observer
onMounted(() => {
  const containers = document.querySelectorAll('.container');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in'); // 添加淡入效果类
      } else {
        entry.target.classList.remove('fade-in'); // 移除淡入效果类
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
  opacity: 0;
  transition: opacity 1.5s ease,transform 0.5s ease;

  &.fade-in {
    opacity: 1; // 淡入效果
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
}

.movie-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  white-space: nowrap; // 强制单行显示
  text-overflow: ellipsis; // 省略号效果

  h3 {
    font-size: 1.5rem;
    padding: 8px 10px;
    max-width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rating {
    font-size: 1.5rem;
    margin-right: 10px;
    max-width: 40%; 
    overflow: hidden;
    text-overflow: ellipsis;
  }
}


.details {
  position: absolute;
  display: none;
}
</style>

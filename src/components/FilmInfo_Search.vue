<template>
    <div :class="['film-info', modeClass, { active: details.isActive }]">
      <div id="popup">
        <div class="content">
          <h2>{{ details.title || '标题正在加载中，请等待片刻~' }}</h2>
          <p>{{ details.description || '简介正在加载中，请等待片刻~' }}</p>
          <img src="@/assets/images/cancel.png" @click="changeActive" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { inject, ref, watchEffect } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useModeStore } from '../stores/modeStores';
  
  interface FilmDetails {
    title: string | null;
    description: string | null;
    isActive: boolean;
  }
  
  const details = inject('details') as Ref<FilmDetails>;
  const modeStore = useModeStore();
  const { isNightMode } = storeToRefs(modeStore);
  
  const modeClass = ref('');
  
  watchEffect(() => {
    modeClass.value = isNightMode.value ? 'night' : '';
  });
  
  function changeActive() {
    details.value.isActive = !details.value.isActive;
  }
  
  // 可添加一个函数用于更新电影详情
  function updateFilmDetails(movie: { $title: string; $description: string }) {
    details.value.title = movie.$title;
    details.value.description = movie.$description;
    details.value.isActive = true; // 显示弹窗
  }
  </script>
  
  <style scoped lang="scss">
  .film-info {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
    visibility: hidden;
  
    &.active {
      visibility: visible;
  
      &::before {
        backdrop-filter: blur(10px);
      }
  
      #popup {
        transform: scale(1);
      }
    }
  
    // 其他样式保持不变...
  }
  </style>
  
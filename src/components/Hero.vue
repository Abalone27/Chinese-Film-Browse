<template>
  <div class="hero" ref="hero">
    <div class="container">
      <h1 ref="title" class="fade-in" :class="{ 'active': titleVisible }">查看流行电影信息</h1>
      <p ref="description" class="fade-in" :class="{ 'active': descriptionVisible }">Find The Latest Film Info In China</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const titleVisible = ref(false);
const descriptionVisible = ref(false);
const hero = ref<HTMLElement | null>(null);
const title = ref<HTMLElement | null>(null);
const description = ref<HTMLElement | null>(null);

onMounted(() => {
  const observerOptions = { threshold: 0.1 };

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target === title.value) {
          titleVisible.value = true;
        } else if (entry.target === description.value) {
          descriptionVisible.value = true;
        }
      } else {
        if (entry.target === title.value) {
          titleVisible.value = false;
        } else if (entry.target === description.value) {
          descriptionVisible.value = false;
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  if (title.value) observer.observe(title.value);
  if (description.value) observer.observe(description.value);
});
</script>

<style scoped lang="scss">
.hero {
  z-index: 0;
  background-image: url('../assets/images/background.jpg');
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom center;
  color: #fff;
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
  position: relative;
  margin-bottom: 20px;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1, p {
      opacity: 0; 
      transform: translateY(20px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    h1.active, p.active {
      opacity: 1; 
      transform: translateY(0);
      transition-duration: 1.8s;
    }

    h1 {
      font-size: 100px;
      letter-spacing: 10px;
      margin-bottom: 30px;
    }

    p {
      font-size: 48px; /* 增大字体 */
      letter-spacing: 1px;
    }
  }
}

.hero::before {
  content: '';
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7); /* 设置背景透明度 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>

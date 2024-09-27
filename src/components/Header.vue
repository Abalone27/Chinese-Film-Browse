<template>
  <nav class="nav" :class="mode">
    <div class="container">
      <div class="logo">
        <!-- SVG logo code -->
        <h1>电影展览</h1>
      </div>
      <ul>
        <li><router-link to="/former">往期经典</router-link></li>
        <li><router-link to="/">当下热映</router-link></li>
        <li><router-link to="/search">即将推出</router-link></li>
      </ul>
      <div class="search-container">
        <input type="text" v-model="keyword" placeholder="搜索电影">
        <button @click="searchMovies">搜索</button>
      </div>
      <div class="btn">
        <button @click="handleSwitchMode">切换模式</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useModeStore } from '../stores/modeStores';

const modeStore = useModeStore();
const { isNightMode } = storeToRefs(modeStore);
const { toggleMode } = modeStore;

// 定义 mode 状态用于切换样式
const mode = ref('');

// 监听 isNightMode 的变化
watchEffect(() => {
  mode.value = isNightMode.value ? '' : 'active'; // 根据 isNightMode 切换样式
});

// 切换模式函数
function handleSwitchMode() {
  toggleMode();
}

// 搜索关键词
const keyword = ref('');
const movies = ref([]); // 用于存储搜索结果
const router = useRouter(); // 获取路由器实例

async function searchMovies() {
  if (!keyword.value.trim()) {
    alert('请输入搜索关键词');
    return;
  }

  const ci = 1;
  const limit = 20;
  const offset = 0;

  try {
    const response = await fetch(`https://apis.netstart.cn/maoyan/search/movies?keyword=${encodeURIComponent(keyword.value)}&ci=${ci}&offset=${offset}&limit=${limit}`);
    const data = await response.json();
    console.log(data);

    // 假设返回的数据是电影列表
    movies.value = data; // 将返回的数据赋值给 movies

    // 导航到搜索结果页面，并传递关键词
    router.push({ path: '/search', query: { keyword: keyword.value } });
  } catch (error) {
    console.error('搜索电影出错:', error);
  }
}
</script>


<style scoped lang="scss">
nav {
  background-color: #222;
  font-size: 24px;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: all 0.3s ease-in-out;

  a {
    color: #fff;
    text-decoration: none;
    padding: 7px 15px;
    transition: all 0.3s ease-in-out;
  }

  a:hover {
    color: #f17b6d;
    font-weight: bold;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease-in-out;

    .logo {
      display: flex;
      align-items: center;
      padding: 15px;

      h1 {
        letter-spacing: 10px;
        font-size: 30px;
        margin-left: 30px;
        color: #fff;
        opacity: 0.95;
        text-shadow: 0 1px 2px;
      }

      svg {
        width: 60px;
        height: 60px;
        margin-left: 10px;
      }
    }

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style-type: none;
      margin: 0 auto;
      padding: 7px 15px;
      opacity: 0.95;
      text-shadow: 0 0 5px;
    }

    button {
      width: 290px;
      color: #fff;
      padding: 7px 15px;
      opacity: 0.95;
      border: 10px 10px #fff;
    }
  }
}

.btn {
  padding: 7px 15px;
}

nav.active {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  .logo h1 {
    color: #222;
  }

  ul {
    color: #222;
    text-shadow: 0 0 3px #fff;
  }

  a {
    color: #000;
  }

  .container {
    padding: 5px 0;
  }

  button {
    color: #222;
  }
}
</style>

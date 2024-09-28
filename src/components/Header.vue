<template>
  <nav class="nav" :class="mode">
    <div class="container">
      <div class="logo">
        <h1>电影展览</h1>
      </div>
      <ul>
        <li><router-link to="/former">往期经典</router-link></li>
        <li><router-link to="/">当下热映</router-link></li>
        <li><router-link to="/coming">即将推出</router-link></li>
      </ul>
      <div class="search-container">
        <input 
          type="text" 
          v-model="keyword" 
          @keydown.enter="searchMovies" 
          @click="handleInputClick" 
          placeholder="请输入关键词" 
          class="search-input"
        />
        <img src="../assets/images/search.svg" alt="搜索" @click="searchMovies" class="search-icon" />
      </div>
      <div class="auth-buttons">
        <router-link to="/login">
          <button class="login-btn">登录</button>
        </router-link>
        <router-link to="/register">
          <button class="register-btn">注册</button>
        </router-link>
      </div>
      <div class="btn">
        <button @click="handleSwitchMode">切换模式</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useModeStore } from '../stores/modeStores';

const modeStore = useModeStore();
const { isNightMode } = storeToRefs(modeStore);
const { toggleMode } = modeStore;

const mode = ref('');
watchEffect(() => {
  mode.value = isNightMode.value ? '' : 'active';
});

function handleSwitchMode() {
  toggleMode();
}

const keyword = ref('');
const router = useRouter();

async function searchMovies() {
  const searchTerm = keyword.value.trim();
  if (searchTerm === "") {
    alert('请输入搜索关键词');
    return;
  }
  router.push({ path: '/search', query: { keyword: searchTerm } });
  keyword.value = '';
}

function handleInputClick() {
  keyword.value = '';
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
    width: 100px;
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
    transition: all ease-in-out 0.4s;

    .logo {
      width: 250px;
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
    }

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style-type: none;
      margin: 0;
      padding: 0;

      li {
        width: 130px;
        margin: 0 20px;
      }
    }

    .search-container {
      display: flex;
      align-items: center;
      margin-left: 50px;

      .search-input {
        background-color: rgba(64, 64, 64, 0.3);
        color: black;
        margin-right: 8px;
        width: 200px;
        transition: transform 0.3s ease;
        font-size: 1.25rem;
        padding: 4px 8px;
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, 0.3);
      }

      .search-input:focus {
        transform: scale(1.05);
      }

      .search-icon {
        cursor: pointer;
        width: 24px;
        height: 24px;
        transition: transform 0.3s ease;
      }

      .search-icon:hover {
        transform: scale(1.2);
      }
    }

    button {
      color: #fff;
      padding: 7px 15px;
    }
  }
}

.auth-buttons button {
  margin-left: 200px;
}

.btn {
  margin-left: 10px;
}

nav.active {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  .logo h1 {
    color: #222;
  }

  ul {
    color: #222;
  }

  a {
    color: #000;
  }

  .container {
    padding: 5px 0;
    .search-input {
      background-color: #fff;
    }
  }

  button {
    color: #222;
  }
}
</style>

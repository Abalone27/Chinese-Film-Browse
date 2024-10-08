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
        <input type="text" v-model="keyword" @input="fetchSuggestions" @keydown.enter="searchMovies"
          placeholder="请输入关键词" class="search-input" />
        <img src="../assets/images/search.svg" alt="搜索" @click="searchMovies" class="search-icon" />

        <!-- 添加显示建议列表 -->
        <ul v-if="suggestions.length" class="suggestions-list">
          <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)">
            {{ suggestion }}
          </li>
        </ul>
      </div>
      <div class="auth-buttons" v-if="!username">
        <router-link to="/login">
          <button class="login-btn">登录</button>
        </router-link>
        <router-link to="/register">
          <button class="register-btn">注册</button>
        </router-link>
      </div>
      <div v-else class="user-info">
        <span>欢迎，{{ username }}</span>
        <button @click="logout" class="logout-btn">注销</button>
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
import { useModeStore } from '@/stores/modeStores';
import { useUserStore } from '@/stores/userStore';

const modeStore = useModeStore();
const { isNightMode } = storeToRefs(modeStore);
const { toggleMode } = modeStore;
const userStore = useUserStore()
const { username } = storeToRefs(userStore)

const mode = ref('');
watchEffect(() => {
  mode.value = isNightMode.value ? '' : 'active';
});

function handleSwitchMode() {
  toggleMode();
}

const keyword = ref('');
const router = useRouter();
const suggestions = ref<string[]>([]);  // 添加搜索建议

async function fetchSuggestions() {
  if (keyword.value.trim() === "") {
    suggestions.value = [];
    return;
  }

  try {
    const response = await fetch(`https://apis.netstart.cn/maoyan/search/suggest?kw=${encodeURIComponent(keyword.value)}`);
    const data = await response.json();

    if (data.success) {
      suggestions.value = data.movies.list.map((movie: { nm: any; }) => movie.nm);
    } else {
      suggestions.value = []; 
    }
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    suggestions.value = [];
  }
}

function selectSuggestion(suggestion: string) {
  keyword.value = suggestion;
  searchMovies();
}

async function searchMovies() {
  const searchTerm = keyword.value.trim();
  if (searchTerm == "") {
    alert('请输入搜索关键词');
    return;
  }
  router.push({ path: '/search', query: { keyword: searchTerm } });
  keyword.value = '';
}

// 注销功能：清除用户信息并返回登录页面
function logout() {
  userStore.clearUsername();  // 清除用户名
  localStorage.removeItem('token');  // 清除 token
  router.push('/');
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
    transition: all ease-in-out 0.4s;

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
    }

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style-type: none;
      margin: 0 auto;
      padding: 7px 15px;
    }

    .search-container {
      position: relative;
      display: flex;
      align-items: center;
      margin-left: 0px;

      .search-input {
        background-color: rgba(64, 64, 64, 0.3);
        color: #fff;
        margin-right: 8px;
        width: 70%;
        transition: transform 0.3s ease;
        font-size: 1.25rem;
        padding: 4px 8px;
        border-radius: 3px;
        border-color: rgba(0, 0, 0, 0.3);
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
      .suggestions-list {
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 70%;
        background: white;
        border: 1px solid #ccc;
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .suggestions-list li {
        width: 100%;
        padding: 8px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 17px;
        text-align: left;

        &:hover {
          background-color: #f0f0f0;
        }
      }


    }

    .auth-buttons {
      display: flex;

      button {
        margin-left: 10px;
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      color: #dad9d9;
      cursor: default;

      span {
        margin-right: 15px;
      }

      .logout-btn {
        color: white;
        border: none;
        padding: 7px 15px;
        border-radius: 4px;
        cursor: pointer;
      }

      .logout-btn:hover {
        background-color: #d43f3a;
      }
    }

    button {
      color: #fff;
      padding: 7px 15px;
    }
  }
}

.btn {
  padding: 7px 15px;
  margin: 10px;
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
      color: #222;
    }

    .user-info {
      color: #222;
    }

    .logout-btn {
      color: #222;
    }
  }

  button {
    color: #222;
  }
}
</style>

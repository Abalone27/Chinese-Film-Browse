<template>
  <div class="register-page" :class="mode">
    <div class="background-container">
      <div class="images-grid">
        <img v-for="(image, index) in images" :key="index" :src="image" alt="Background image" />
      </div>
    </div>

    <div class="form-container">
      <h2>注册</h2>
      <form @submit.prevent="register">
        <label for="username">用户名:</label>
        <input type="text" v-model="username" id="username" required />
        <label for="password">密码:</label>
        <input type="password" v-model="password" id="password" required />
        <label for="confirmPassword">确认密码:</label>
        <input type="password" v-model="confirmPassword" id="confirmPassword" required />
        <button type="submit" class="submit-btn">注册</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useModeStore } from '@/stores/modeStores';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const modeStore = useModeStore();
const { isNightMode } = storeToRefs(modeStore);
const mode = ref("");

// 背景图相关
const images = ref([]); // 用来存储获取到的图片URL
const apiUrl = '/api/asgard/asgardapi/mmdb/movieboard/moviedetail/fixedboard/39.json?ci=1&year=0&term=0&limit=100&offset=0';

const fetchImages = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data && data.data && data.data.movies && Array.isArray(data.data.movies)) {
      images.value = data.data.movies.map((movie) => movie.img);
    } else {
      console.error('Unexpected data format:', data);
      images.value = [];
    }
  } catch (error) {
    console.error('Error fetching movie images:', error);
    images.value = [];
  }
};

onMounted(() => {
  window.scrollTo(0, 0);
  fetchImages();  // 获取背景图
  document.body.style.overflow = 'hidden'; 
});

onBeforeUnmount(() => {
  document.body.style.overflow = 'auto';
});

watchEffect(() => {
  mode.value = isNightMode.value ? "night" : "";
});

function register() {
  if (password.value !== confirmPassword.value) {
    alert('密码不匹配');
    return;
  }

  fetch(`/db/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('注册成功');
        router.push('/login');
      } else {
        alert(data.message);
      }
    });
}
</script>


<style scoped lang="scss">
html, body {
  overflow: hidden;
}


.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  height: 100vh;


  &.night {
    .form-container {
      background-color: #333;
      h2, form, input {
        color: #dedede;
      }
      label {
        color: #dedede;
      }
      input {
        background-color: #555;
        border-style: none;
      }
    }
  }
}

.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  filter: blur(10px);
  opacity: 0.8;
  overflow: hidden;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 0px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.images-grid img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.form-container {
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
}

input {
  width: 100%;
  padding: 4px 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #218838;
}
</style>

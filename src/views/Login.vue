<template>
    <div class="login-page" :class="mode">
      <div class="form-container">
        <h2>登录</h2>
        <form @submit.prevent="login">
          <label for="username">用户名:</label>
          <input type="text" v-model="username" id="username" required />
          <label for="password">密码:</label>
          <input type="password" v-model="password" id="password" required />
          <button type="submit" class="submit-btn">登录</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted,ref,watchEffect } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useModeStore } from '@/stores/modeStores';
  import { useUserStore } from '@/stores/userStore';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  
  const username = ref('');
  const password = ref('');
  const display = ref('登陆')

  const modeStore = useModeStore();
  const { isNightMode } = storeToRefs(modeStore);
  const mode = ref("");
  const userStore = useUserStore()

  const backend_url = 'http://localhost:3000'

  onMounted(()=>{
    window.scrollTo(0,0)
  })

  watchEffect(() => {
    mode.value = isNightMode.value ? "night" : "";
  });
  
  function login() {
    const token = localStorage.getItem('token')

    fetch(`${backend_url}/api/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
       },
      body: JSON.stringify({ username: username.value, password: password.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('登录成功');
          console.log('用户数据: ',data)
          // 保存 token 到本地存储
          localStorage.setItem('token', data.token);
          // 将用户名保存到 Pinia store 中
          userStore.setUsername(username.value);
          router.push('/');
        } else {
          alert(data.message);
        }
      });
  }
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  .login-page.night {
    background-color: var(--night-bg-color);
    .form-container {
      background-color: #333;
      h2,form,input {
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
  
  .form-container {
    background-color: #fff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #0056b3;
  }
  </style>
  
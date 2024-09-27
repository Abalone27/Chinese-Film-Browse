<template>
    <div class="login-page">
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
  import { ref } from 'vue';
  
  const username = ref('');
  const password = ref('');
  
  function login() {
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('登录成功');
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
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .submit-btn {
    width: 100%;
    padding: 10px;
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
  
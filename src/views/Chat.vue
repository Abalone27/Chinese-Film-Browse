<template>
    <div :class="mode">
  <h1>自由公共聊天室</h1>
  <ul>
    <li v-for="(message, index) in messages" :key="index" :style="{ backgroundColor: message.color }">
      <span class="time">{{ message.created_at }}</span>
      <span v-if="message.isLogin" class="login">{{ message.msg }}</span>
      <span v-else>{{ message.msg }}</span>
    </li>
  </ul>
  <form @submit.prevent="sendMessage">
    <input v-model="newMessage" type="text" placeholder="输入消息">
    <button type="submit">发送</button>
  </form>
  <p>当前聊天室在线人数：{{ onlineCount }} 人</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted,watchEffect } from 'vue';
import { io } from 'socket.io-client';
import { storeToRefs } from 'pinia';
import { useModeStore } from '../stores/modeStores';

// 定义响应式数据
const newMessage = ref('');
const messages = ref<any[]>([]);
const onlineCount = ref(0);
const usercolor = getRandomColor();
const socket = io('http://localhost:3001', {
  withCredentials: true,  // 启用跨域凭证
});
const modeStore = useModeStore();
const { isNightMode } = storeToRefs(modeStore);
const mode = ref("");

// 自定义格式化时间函数
function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 获取随机颜色
function getRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, '0')}`;
}

// 发送消息
function sendMessage() {
  if (newMessage.value.trim()) {
    socket.emit('chat message', {
      msg: newMessage.value,
      created_at: getFormattedDate(),
      color: usercolor
    });
    newMessage.value = '';
  }
}

// 当组件加载时处理Socket.io的消息
onMounted(() => {
    socket.on('connect', () => {
  console.log('Connected to Socket.io server:', socket.id);
});
    
  // 加载历史消息
  socket.on('load previous messages', (loadedMessages) => {
    if (loadedMessages) {
      messages.value = loadedMessages.map((msg: any) => ({
        ...msg,
        created_at: new Date(msg.created_at).toLocaleString()
      }));
    }
  });

  // 接收普通消息
  socket.on('chat message', (msg: any) => {
    messages.value.push({
      ...msg,
      created_at: new Date(msg.created_at).toLocaleString()
    });
    scrollToBottom();
  });

  // 接收登录消息
  socket.on('login message', (msg: any) => {
    messages.value.push({
      msg: msg.msg,
      created_at: new Date(msg.created_at).toLocaleString(),
      color: '#9eaf04',
      isLogin: true
    });
    scrollToBottom();
  });

  // 显示在线人数
  socket.on('show count', (count: any) => {
    onlineCount.value = count;
  });
});

// 滚动到页面底部
function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

watchEffect(() => {
  mode.value = isNightMode.value ? "night" : "";
});
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&family=Roboto:wght@400;700&display=swap');

:root {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
* {
  font-family: 'Noto Sans SC', sans-serif;
  font-style: normal;
}
body {
  background-color: #3c3b3b;
  height: 100vh;
  padding: 0;
  margin: 0;
}
h1 {
  font-size: 5rem;
  color: azure;
  margin: 20px auto;
  text-align: center;
}
form {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  margin: 0;
  padding: 10px;
}
button {
  width: 20%;
  border: rgba(254, 182, 182, 0.009);
  outline: none;
  color: rgba(208, 208, 208, 0.9);
  background: darkslategrey;
  margin-left: 5px;
  padding: 10px 15px;
  transition: all 0.1s;
  font-size: 16px;
  border-radius: 3px;
}
button:hover {
  cursor: pointer;
  border: 1px solid #087d81;
  box-shadow: 0 0 8px rgba(8, 77, 47, 0.5);
  transform: scale(1.03);
}
input {
  width: 100%;
  cursor: pointer;
  font-size: 24px;
  padding: 10px 0px;
  border: 1px solid rgb(8, 8, 10);
  transition: all 0.05s;
  border-radius: 3px;
}
input:focus {
  border: 1px solid #55b3f3;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.5);
}
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0 5px 5px;
  padding: 8px;
  color: white;
  font-size: 20px;
  background-color: white;
  border-radius: 3px;
  justify-self: center;
  align-self: flex-start;
  transition: all ease-in 3s;
}
.login {
  color: rgb(48, 47, 47);
  border-radius: 18%;
  padding: 20px;
  margin: 0 auto;
  text-align: center;
  width: 65%;
}
.count {
  background: rgb(95, 89, 79);
  color: white;
  font-size: 18px;
  margin: 25px 0;
  width: 35%;
  padding: 10px 5px;
  text-align: center;
  border-radius: 10px;
}
.time {
  background-color: rgba(118, 117, 117, 0.2);
  border-radius: 10px;
  padding: 2px 6px;
  color: aliceblue;
  margin: 4px auto;
  margin-top: 10px;
  font-size: 14px;
}
div {
    height: 100vh;
    background-color: antiquewhite;
    h1 {
        color: #3c3b3b;
    }
}
div.night {
    background-color: #3c3b3b;
    h1 {
        color: azure;
    }
    p {
        color: azure;
    }
}
</style>
<template>
  <nav class="nav" :class="mode">
    <div class="container">
      <div class="logo">
        <svg t="1721283185284" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4274" width="200" height="200">
          <path
            d="M853.333333 96H170.666667C130.133333 96 96 130.133333 96 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667z m10.666667 384h-149.333333v-106.666667h149.333333v106.666667z m-213.333333 0h-277.333334v-320h277.333334v320z m-341.333334 0h-149.333333v-106.666667h149.333333v106.666667z m-149.333333 64h149.333333v106.666667h-149.333333v-106.666667z m213.333333 0h277.333334v320h-277.333334v-320z m341.333334 0h149.333333v106.666667h-149.333333v-106.666667z m149.333333-373.333333v138.666666h-149.333333v-149.333333H853.333333c6.4 0 10.666667 4.266667 10.666667 10.666667zM170.666667 160h138.666666v149.333333h-149.333333V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667zM160 853.333333v-138.666666h149.333333v149.333333H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667z m693.333333 10.666667h-138.666666v-149.333333h149.333333V853.333333c0 6.4-4.266667 10.666667-10.666667 10.666667z"
            fill="#515151"
            p-id="4275"
          ></path>
        </svg>
        <h1>电影展览</h1>
      </div>
      <ul>
        <li><router-link to="/former">往期经典</router-link></li>
        <li><router-link to="/">当下热映</router-link></li>
        <li><router-link to="#">即将推出</router-link></li>
      </ul>
      <div class="btn">
        <button @click="handleSwitchMode">切换模式</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref,watchEffect} from 'vue'
import { storeToRefs } from 'pinia';
import { useModeStore } from '../stores/modeStores'

const modeStore = useModeStore()

const {isNightMode} = storeToRefs(modeStore)
const {toggleMode} =modeStore


// 定义 mode 状态用于切换样式
const mode = ref('');

// 监听 isNightMode 的变化
watchEffect(() => {
  mode.value = isNightMode.value ? '' : 'active'; // 根据 isNightMode 切换样式
});

// 切换模式函数
function handleSwitchMode() {
  toggleMode()
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

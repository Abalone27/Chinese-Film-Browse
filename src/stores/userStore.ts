import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';  // 使用 @vueuse/core 的 useStorage

export const useUserStore = defineStore('user', () => {
    // 使用 useStorage 将 username 保存在 localStorage 中，并初始化为 null
    const username = useStorage<string | null>('username', null);

    // 设置用户名
    function setUsername(name: string) {
        username.value = name;
    }

    // 清除用户名
    function clearUsername() {
        username.value = null;
    }

    return { username, setUsername, clearUsername };
});
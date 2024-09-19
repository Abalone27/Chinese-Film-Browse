import { defineStore } from "pinia";
import {Ref} from "vue";
import { useStorage } from "@vueuse/core";

export const useModeStore = defineStore('modeStore',()=>{
    const isNightMode: Ref<boolean> = useStorage('isNightMode', false);

    // 切换夜间模式
    const toggleMode = () => {
    console.log('toggleMode called'); // 调试用，确保函数被调用
    isNightMode.value = !isNightMode.value; // 切换状态
    console.log('isNightMode value:', isNightMode.value); // 打印切换后的值
  };

    return {isNightMode,toggleMode}
})
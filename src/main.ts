import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import '@/style/reset.scss';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';

// 导入其他组件
import Header from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
import Content from '@/components/Content.vue';
import FilmBoard from '@/components/FilmBoard.vue';
import FilmInfo from '@/components/FilmInfo.vue';
import Former from './views/Former.vue';
import Latest from './views/Latest.vue';
import Search from './views/Search.vue';


const app = createApp(App);
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Latest },
        { path: "/former", component: Former },
        { path: '/search', component: Search}
    ],
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 全局注册组件
app.component('film-header', Header);
app.component('hero', Hero);
app.component('content', Content);
app.component('film-board', FilmBoard);
app.component('film-info', FilmInfo);

app.use(router).use(pinia).mount('#app');
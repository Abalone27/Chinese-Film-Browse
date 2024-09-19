import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter,createWebHistory } from 'vue-router';
import '@/style/reset.scss';
import piniaPluginPersistedstate  from 'pinia-plugin-persistedstate';
import App from './App.vue';

import Header from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
import Content from '@/components/Content.vue';
import FilmBoard from '@/components/FilmBoard.vue';
import FilmInfo from '@/components/FilmInfo.vue';
import Former from './views/Former.vue';
import Latest from './views/Latest.vue';

const app = createApp(App);
const router = createRouter(
    {
        history:createWebHistory(),
        routes: [
            { path: '/', component: Latest },
            { path: "/former", component: Former }
        ],
    }
)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.component('film-header', Header);
app.component('hero', Hero);
app.component('content', Content);
app.component('film-board', FilmBoard);
app.component('film-info', FilmInfo);

app.use(router).use(pinia).mount('#app');

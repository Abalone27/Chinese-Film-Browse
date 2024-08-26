import { createApp } from 'vue';
import '@/style/reset.scss';
import App from './App.vue';

import Header from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
import Content from '@/components/Content.vue';
import FilmBoard from '@/components/FilmBoard.vue';
import FilmInfo from '@/components/FilmInfo.vue';

const app = createApp(App);

app.component('film-header', Header);
app.component('hero', Hero);
app.component('content', Content);
app.component('film-board', FilmBoard);
app.component('film-info', FilmInfo);

app.mount('#app');

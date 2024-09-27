<template>
  <div class="search-container">
    <h1>搜索结果："{{ keyword }}"</h1>
    <div class="movies">
      <film-board-search
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :infoApi="Info_API"
        @select="selectMovie"
      />
    </div>
    <div v-if="error" class="error-message">
      无法加载数据: {{ error }}
    </div>
    <film-info v-if="selectedMovie" :details="selectedMovie" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import FilmBoardSearch from '@/components/FilmBoard_Search.vue';
import FilmInfo from '@/components/FilmInfo.vue';

const Info_API = 'https://apis.netstart.cn/maoyan/movie/detail';

const route = useRoute();
const keyword = ref(route.query.keyword || '');
const movies = ref([]);
const error = ref('');
const selectedMovie = ref(null); // 用于展示详情的选中电影

// 获取电影列表
async function fetchMovies() {
  const searchAPI = `https://apis.netstart.cn/maoyan/search/movies?keyword=${encodeURIComponent(keyword.value)}&ci=1&offset=0&limit=20`;
  try {
    const response = await fetch(searchAPI);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    movies.value = data; // 根据实际 API 响应结构进行调整
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    error.value = '无法加载电影数据';
  }
}

// 获取电影详情
async function fetchMovieDetails(movieId) {
  if (!movieId) {
    console.error("Movie ID is undefined");
    return;
  }
  const detailAPI = `${Info_API}?movieId=${movieId}`;
  try {
    const response = await fetch(detailAPI);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    console.log("Fetched movie details:", data); // 调试信息

    // 更新选中的电影信息
    selectedMovie.value = {
      title: data.$title,
      description: data.$description,
      isActive: true,
    };
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
  }
}

// 当选择电影时，调用 fetchMovieDetails 并传递 id
function selectMovie(movie) {
  if (movie.id) {
    fetchMovieDetails(movie.id);
  } else {
    console.error("Movie ID is undefined");
  }
}

onMounted(fetchMovies);
watch(
  () => route.query.keyword,
  (newKeyword) => {
    keyword.value = newKeyword;
    fetchMovies();
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.search-container {
  padding: 20px;

  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .error-message {
    color: red;
    font-size: 1rem;
    margin-top: 20px;
  }
}
</style>

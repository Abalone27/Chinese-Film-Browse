<template>
  <div class="hero">
    <div class="container">
      <h1>查看流行电影信息</h1>
      <p>Find The Latest Film Info In China</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  z-index: 0;
  background-image: url('../assets/images/background.jpg');
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom center;
  color: #fff;
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
  position: relative;
  margin-bottom: 20px;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 80px;
      letter-spacing: 10px;
      margin-bottom: 30px;
    }
    p {
      font-size: 36px;
      letter-spacing: 1px;
    }
  }
}

.hero::before {
  content: '';
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>

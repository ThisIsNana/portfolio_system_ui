
<script>
export default {
  data() {
    return {
      //環境變數API
      addNewsAPI: import.meta.env.VITE_ADD_NEWS,

      // 加入loading
      isLoading: true,

      newsList: null,
      newsCategory1: null,
      newsCategory2: null,

    }
  }, created() {
    this.newsList = JSON.parse(sessionStorage.getItem('newsList'));
    this.newsCategory1 = new Set(JSON.parse(sessionStorage.getItem('newsCategory1')));
    this.newsCategory2 = new Set(JSON.parse(sessionStorage.getItem('newsCategory2')));
  }
}
</script>

<template>
  <div class="header">
    <img src="../assets/img/add_news.png " alt="ニュース追加">
  </div>
  <div class="main">
    <div class="box">
      <h2></h2>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #90bdb3;
  height: 80px;

  img {
    height: 60px;
  }


  h2 {
    text-align: center;
    font-size: 48px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      //session抓出來
      newsId: 0,
      newNews: null,
      newDescription: null,
    }
  },
  created() {
    //取網址上的newsId
    const newsId = this.$route.params.newsId;
    this.newsId = newsId;

    this.getSession();

  },
  methods: {
    getSession() {
      // 編輯模式
      if (this.newsId != 0) {
        this.newNews = JSON.parse(sessionStorage.getItem('existNews'));
      }
      // 新增模式
      else {
        this.newNews = JSON.parse(sessionStorage.getItem('newNews'));
      }
      this.newDescription = this.newNews.newsDescription;
    },
  }
}
</script>
<template >
  <div class="header">
    <img src="../assets/img/news_preview.png " alt="ニュースプレビュー">
  </div>

  <div class="tips">
    <h2>※ ご注意：これはプレビューページです ※</h2>
  </div>
  <div class="main">
    <div class="mainmain">
      <div class="title_date_count">

        <h1 class="title">{{ newNews.newsTitle }}</h1>

        <div class="date_count">
          <div class="box">
            <h3>投稿日:</h3> {{ newNews.newsCreateDate }}
          </div>
          <div class="box">
            <h3>最後更新日:</h3> {{ newNews.newsUpdateDate }}
          </div>
          <div class="box">
            <h3>カテゴリー:</h3> {{ newNews.newsCategory }}
          </div>
        </div>
      </div>
      <hr>
      <div class="news_description" v-html="newDescription"></div>
      <hr>
      <div class="fb">
        <div class="box">
          <h3>閲覧数:</h3> {{ newNews.newsReadingCount }}
        </div>
        <div class="box">
          <FacebookLike />
        </div>
      </div>
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

.tips {
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 28px;
    margin: 20px 0 0 0;
    color: red;
    font-weight: 600;
  }

}

.main {
  width: 90%;
  border: 2px solid #64847d;
  border-radius: 20px;
  margin: 30px auto;
  margin-bottom: 100px;

  .mainmain {
    margin: 20px;

    .title_date_count {
      display: flex;

      .title {
        font-size: 36px;
      }

      .date_count {
        border-left: 1px solid #64847d;
        padding-left: 10px;
        width: 260px;
        line-height: 24px;
        color: #64847d;

        .box {
          display: flex;

          h3 {
            width: 100px;
          }
        }
      }
    }

    .news_description {
      margin: 20px 5px 50px 5px;
      font-size: 20px;
    }

    .fb {
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        margin: 10px;
      }

      .box {
        display: flex;
        margin: 10px;
      }

    }
  }

  .search_failed {
    h2 {
      font-size: 24px;
      text-align: center;
      color: red;

    }
  }

}
</style>
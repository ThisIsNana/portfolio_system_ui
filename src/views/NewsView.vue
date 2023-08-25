<script>
import axios from 'axios';
import FacebookLike from '../components/FBLike.vue';
export default {
  data() {
    return {
      newsList: null,
      newsCategory1: null,
      newsCategory2: null,

      // 從網址抓Id
      newsId: 0,
      newsTitle: null,
      newsCategory: null,
      newsCreateDate: null,
      newsUpdateDate: null,
      newsReadingCount: null,
      newsDescription: null,

      //環境變數API
      showOneNewsAPI: import.meta.env.VITE_SHOW_ONE_NEWS,

      //讀取中
      isLoading: true,
      isSearchSuccess: true,
    }
  },
  components: {
    FacebookLike,
  },
  created() {
    //取網址上的newsId
    const newsId = this.$route.params.newsId;
    this.newsId = newsId;

    // this.getOneNews(this.newsId);

    this.newsList = JSON.parse(sessionStorage.getItem('newsList'));
    this.newsCategory1 = new Set(JSON.parse(sessionStorage.getItem('newsCategory1')));
    this.newsCategory2 = new Set(JSON.parse(sessionStorage.getItem('newsCategory2')));

    this.getOneNews(this.newsId);
    this.isLoading = false;
  },
  methods: {
    async getOneNews(newsId) {
      axios({
        method: 'POST',
        url: this.showOneNewsAPI,
        data: { "show_new_id": newsId }
      })
        .then(response => {
          const data = response.data;
          console.log(data);

          if (data.message !== "搜尋成功") {
            this.isSearchSuccess = false;
          }

          this.newsTitle = data.news.newsTitle;
          this.newsCategory = data.news.newsCategory;
          this.newsDescription = data.news.newsDescription;
          this.newsCreateDate = data.news.newsCreateDate;
          this.newsUpdateDate = data.news.newsUpdateDate;
          this.newsReadingCount = data.news.newsReadingCount;
        })
        .catch(err => {
          console.log("錯誤:", err)
        })
    },
  },
}
</script>
<template>
  <div>
    <div class="header">
      <img src="../assets/img/logo2.png" alt="">
    </div>

    <div v-if="isLoading" class="loading">
      <img src="../assets/img/icons8-loading.gif" alt="">
    </div>

    <div v-else class="main">

      <div class="mainmain" v-if="isSearchSuccess">
        <div class="title_date_count">
          <h1 class="title">{{ newsTitle }}</h1>
          <div class="date_count">
            <div class="box">
              <h3>投稿日:</h3> {{ newsCreateDate }}
            </div>
            <div class="box">
              <h3>最後更新日:</h3> {{ newsUpdateDate }}
            </div>
            <div class="box">
              <h3>カテゴリー:</h3> {{ newsCategory }}
            </div>
          </div>
        </div>
        <hr>
        <div class="news_description">
          <h4>
            {{ newsDescription }}
          </h4>
        </div>
        <hr>
        <div class="fb">
          <div class="box">
            <h3>閲覧数:</h3> {{ newsReadingCount }}
          </div>
          <div class="box">
            <FacebookLike />
          </div>
        </div>
      </div>

      <div class="search_failed" v-else>
        <h2>查無相關資料</h2>
      </div>

    </div>



  </div>
</template>
<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

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

.main {
  width: 90%;
  border: 2px solid #64847d;
  border-radius: 20px;
  margin: 20px auto;

  .mainmain {
    margin: 20px;

    .title_date_count {
      display: flex;

      .title {
        font-size: 36px;
        width: 70%;
      }

      .date_count {
        border-left: 1px solid #64847d;
        padding-left: 10px;
        width: 30%;
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
      margin-bottom: 50px;
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
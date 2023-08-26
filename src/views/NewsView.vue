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
      updateReadingCountAPI: import.meta.env.VITE_UPDATE_READING_COUNT,
      inactiveNewsAPI: import.meta.env.VITE_INACTIVE_NEWS,


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
    this.getOneNews(this.newsId);
  },
  methods: {
    // 取得此News資料
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
          this.newsReadingCount = data.news.newsReadingCount + 1;
          this.isLoading = false;
        }).then(result => {
          axios({
            method: 'POST',
            url: this.updateReadingCountAPI,
            data: { "update_news_id": newsId }
          })
            .then(response => {
              const data = response.data;
              console.log(data);
            })
        })
        .catch(err => {
          console.log("錯誤:", err)
        })
    },
    // 變更狀態(現階段為刪除)
    inactiveNews() {
      this.$swal({
        icon: 'question',
        title: 'このニュースを削除してもよろしいですか？',
        showComfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '確認',
        cancelButtonText: 'キャンセル',
        confirmButtonColor: '#64847d',
        cancelButtonColor: '#b80000',
        reverseButtons: true,
      }).then((result) => {
        // 確定
        if (result.isConfirmed) {
          axios({
            method: 'POST',
            url: this.inactiveNewsAPI,
            data: {
              "inactive_news_id": this.newsId,
              "is_news_active": false,
            }
          }).then((result) => {
            // 彈出成功提示
            this.$swal({
              icon: 'success',
              title: '削除しました。',
              footer: '意外に削除しまいましたか。<a href="#" target="_blank" style="color:red;">こちら</a>に管理者にご連絡ください',
              confirmButtonText: '確認',
              confirmButtonColor: '#64847d',
              timerProgressBar: true,
              timer: 3000,
            })
              .then((result) => {
                setTimeout(() => {
                  this.$router.push('/');
                }, 500); // 延遲 0.5 秒後跳頁
              })
          }).catch((err) => {
            console.log("錯誤：", err);
          })
        }
      });
    },
    // 編輯按鈕
    editNewsBtn() {
      let existNews = {
        newsTitle: this.newsTitle,
        newsCategory: this.newsCategory,
        newsCreateDate: this.newsCreateDate,
        newsUpdateDate: this.newsUpdateDate,
        newsDescription: this.newsDescription,
        newsReadingCount: this.newsReadingCount,
      }
      sessionStorage.setItem("existNews", JSON.stringify(existNews))
      this.$router.push("/addNews/" + this.newsId);
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

            <button type="button" class="editBtn" @click="editNewsBtn">
              <i class="fa-solid fa-square-pen fa-sm"></i>
              編集する
            </button>
            <button type="button" class="inactiveBtn" @click="inactiveNews">
              <i class="fa-solid fa-trash fa-sm"></i>
              削除する
            </button>
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
        <div class="news_description" v-html="newsDescription">
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

.editBtn,
.inactiveBtn {
  height: 24px;
  font-size: 16px;
  background-color: #64847d;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  margin: 5px 5px;

  &:hover {
    background-color: #81aaa1;
  }
}

.inactiveBtn {
  background-color: #485b57;
  color: #FFFFFF;
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
        width: 80%;
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
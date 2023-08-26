<script>
import axios from 'axios';
export default {
  data() {
    return {
      newsList: [],

      newsCategory1: [],
      newsCategory2: [],
      // 搜尋欄
      selectedCategory1: "",
      selectedCategory2: "",
      searchTitle: "",
      searchCategory: "",
      searchStartDate: null,
      searchEndDate: null,
      // 是否有搜尋結果
      isSearchResult: true,

      //環境變數API
      showAllNewsAPI: import.meta.env.VITE_SHOW_ALL_NEWS,
      searchNewsAPI: import.meta.env.VITE_SEARCH_NEWS,

      // 加入loading
      isLoading: true,

    }
  },
  created() {
    this.getNewsList();
  },
  methods: {
    // 取得清單
    getNewsList() {
      axios({
        method: 'GET',
        url: this.showAllNewsAPI,
      })
        .then(response => {
          const data = response.data;
          console.log(data);

          // 比較最後更新日期 => 排序
          this.newsList = data.newsList
            .filter(news => news.newsIsActive)
            .sort((a, b) => {
              const dateA = new Date(a.newsUpdateDate);
              const dateB = new Date(b.newsUpdateDate);
              return dateB - dateA;
            })

          this.isSearchResult = true;
        })
        .then(result => {

          // 抓出分類資料放進檢索選項
          const newsCategory1 = new Set();
          const newsCategory2 = new Set();

          this.newsList.forEach(news => {
            let newsCategoryArr = news.newsCategory.split(",")
            newsCategory1.add(newsCategoryArr[0])
            newsCategory2.add(newsCategoryArr[1])
          });

          this.newsCategory1 = newsCategory1;
          this.newsCategory2 = newsCategory2;

          this.isLoading = false;

        }).then((result) => {
          // 加到session裡方便利用
          sessionStorage.setItem("newsList", JSON.stringify(this.newsList))
          sessionStorage.setItem("newsCategory1", JSON.stringify(Array.from(this.newsCategory1)))
          sessionStorage.setItem("newsCategory2", JSON.stringify(Array.from(this.newsCategory2)))
        })
        .catch(error => {
          console.error('錯誤:', error);
        });
    },
    searchNews() {

      this.searchCategory = this.selectedCategory1 + "," + this.selectedCategory2

      const searchRequest = {
        "search_title": this.searchTitle,
        "search_category": this.searchCategory,
        "search_start_date": this.searchStartDate,
        "search_end_date": this.searchEndDate,
      };

      axios({
        method: 'POST',
        url: this.searchNewsAPI,
        data: searchRequest,
      })
        .then(response => {
          const data = response.data;
          console.log(data);


          if (data.message === "查無相關資料") {
            this.isSearchResult = false;
          }

          else {
            // 比較最後更新日期 => 排序
            this.newsList = data.newsList
              .filter(news => news.newsIsActive)
              .sort((a, b) => {
                const dateA = new Date(a.newsUpdateDate);
                const dateB = new Date(b.newsUpdateDate);
                return dateB - dateA;
              })

            this.isSearchResult = true;
          }
        })
        .catch((error) => {
          console.error('錯誤:', error);
        });

    },
    searchClear() {
      this.searchTitle = "";
      this.searchCategory = null;
      this.searchStartDate = "";
      this.searchEndDate = "";
      this.selectedCategory1 = "";
      this.selectedCategory2 = "";
      this.searchNews();
    }
  }
}
</script>
<template>
  <div class="header">
    <img src="../assets/img/logo2.png" alt="">
    <!-- <h2>
      ニャーニュース
    </h2> -->
  </div>
  <div class="main" id="main">

    <!-- 搜尋欄 -->
    <div class="searchBar">
      <div class="searchTitle">
        <h1>ニュース検索
          <i class="fa-solid fa-magnifying-glass fa-sm"> </i>
        </h1>
      </div>
      <div class="searchMain">

        <div class="bar">
          <h2>タイトル</h2>
          <input type="text" v-model="searchTitle">
          <h2>カテゴリー</h2>
          <select name="category1" id="category1" v-model="selectedCategory1" value="">
            <option v-for="category1 in newsCategory1" :key="category1" :value="category1">{{ category1 }}</option>
          </select>
          の
          <select name="category2" id="category2" v-model="selectedCategory2">
            <option v-for="category2 in newsCategory2" :key="category2" :value="category2"> {{ category2 }} </option>
          </select>
        </div>

        <div class="bar">
          <h2>最後更新日</h2>
          <input type="date" v-model="searchStartDate">
          から
          <input type="date" v-model="searchEndDate">
          まで
          <button type="button" class="searchBtn" @click="searchNews">検索</button>
          <button type="button" class="clearBtn" @click="searchClear">クリア</button>
        </div>

      </div>
    </div>
    <div v-if="isLoading" class="loading">
      <img src="../assets/img/icons8-loading.gif" alt="">
    </div>
    <div v-else>
      <div class="show_table" v-if="isSearchResult">
        <!-- 展示表格 -->
        <table>
          <thead>
            <tr>
              <th class="category">カテゴリー</th>
              <th class="title">タイトル</th>
              <th class="updateDate">最後更新日</th>
              <th class="createDate">投稿日</th>
              <th class="readingCount">閲覧数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(  news, index  ) in newsList " :key="index">
              <td class="category">{{ news.newsCategory }}</td>
              <td class="title">
                <RouterLink :to="`news/${news.newsId}`">
                  {{ news.newsTitle }}
                </RouterLink>
              </td>
              <td class="updateDate">{{ news.newsUpdateDate }}</td>
              <td class="createDate">{{ news.newsCreateDate }}</td>
              <td class="readingCount">{{ news.newsReadingCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="search_failed" v-else>
        <h2>検索条件と十分に一致する結果が見つかりません</h2>
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

.searchBar {
  width: 85%;
  margin: 20px auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 3px solid #90bdb3;
  position: relative;

  .searchTitle {
    h1 {
      font-size: 28px;
      border-bottom: 2px dashed #90bdb3;
      color: #64847d;
      margin: auto;
    }
  }

  .searchMain {
    flex-wrap: wrap;

    .bar {
      display: flex;
      margin: 10px;
      align-items: center;


      h2 {
        font-size: 16px;
        width: 80px;
      }

      input {
        margin: 0 10px;
        height: 30px;
        width: 150px;
        font-size: 16px;
        font-family: 'cjkFonts';
        color: #64847d;
      }

      select {
        margin: 0 10px;
        height: 35px;
        width: 100px;
        font-size: 16px;
        color: #64847d;
      }
    }
  }

  .searchBtn,
  .clearBtn {
    width: 80px;
    height: 30px;
    font-size: 16px;
    border: 0;
    border-radius: 5px;
    transition: 0.2s;


  }

  .clearBtn {
    position: absolute;
    right: 20px;
    bottom: 20px;
    background-color: #4f6862;
    color: #ffffff;

    &:hover {
      background-color: #719890;
      font-size: 18px;
    }
  }

  .searchBtn {
    position: absolute;
    right: 20px;
    bottom: 60px;
    background-color: #90bdb3;

    &:hover {
      background-color: #aee4d8;
      font-size: 18px;
    }
  }
}


.main {

  margin-bottom: 100px;

  table {
    width: 90%;
    margin: 20px auto;

    thead {

      .category,
      .title,
      .updateDate,
      .createDate,
      .readingCount {
        padding: 10px;
        background-color: #90bdb3;
        border: 4px solid #ffffff;
        border-radius: 10px;
        font-size: calc(6px + 1vw);
      }
    }

    tbody {
      border: 3px solid #90bdb3;

      tr {
        border: 2px dashed #90bdb3
      }

      .category,
      .title,
      .updateDate,
      .createDate,
      .readingCount {
        padding: 10px;
        margin: 10px;
        text-align: center;
      }

      .title {
        width: 30%;
        text-align: left;
      }

      a {
        color: #000000;

        &:hover {
          color: #64847d;
        }
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
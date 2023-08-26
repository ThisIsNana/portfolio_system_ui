
<script>
import axios from 'axios';
// import CKEditorBox from '../components/CKEditorBox.vue'
export default {
  data() {
    return {
      newsId: 0,
      newNews: null,
      selectedRadio: "existCategory",

      newsCategory1: "", //選項用
      newsCategory2: "",

      // 新資料
      newTitle: null,
      newCategory: null,
      newDescription: null,
      selectedCategory1: "", //選中的
      selectedCategory2: "",
      newsCreateDate: null, //存資料庫用
      newsUpdateDate: null,

      showCreateDate: null, //展示用
      showUpdateDate: null,


      //環境變數API
      addNewsAPI: import.meta.env.VITE_ADD_NEWS,
      updateNewsAPI: import.meta.env.VITE_UPDATE_NEWS,

      // 加入loading
      isLoading: true,

      //文字編輯器
      // editor: ClassicEditor,
      content: 'ニュース内容を入力しましょう！'
    }
  },
  components: {
    // CKEditorBox
  },
  created() {

    // 取網址上的newsId
    const newsId = this.$route.params.newsId;
    this.newsId = newsId;

    // session的分類先抓
    this.newsCategory1 = new Set(JSON.parse(sessionStorage.getItem('newsCategory1')));
    this.newsCategory2 = new Set(JSON.parse(sessionStorage.getItem('newsCategory2')));

    // 現在的日期
    let today = new Date();



    if (newsId != 0) {
      // 編輯模式>>
      this.newNews = JSON.parse(sessionStorage.getItem('existNews'));
      // console.log(this.newNews);
    }
    else {
      // 新增模式>>
      this.newNews = JSON.parse(sessionStorage.getItem('newNews'));
      // console.log(this.newNews);
    }

    if (this.newNews !== null) {
      this.newTitle = this.newNews.newsTitle;
      this.newCategory = this.newNews.newsCategory;
      this.content = this.newNews.newsDescription.replaceAll("<br>", "\n");
      let newCategoryArr = this.newCategory.split(",");
      this.selectedCategory1 = newCategoryArr[0];
      this.selectedCategory2 = newCategoryArr[1];
    }

    this.showCreateDate = today.toLocaleDateString();
    this.showUpdateDate = today.toLocaleDateString();
    this.newsCreateDate = today;
    this.newsUpdateDate = today;

    // 抓完session就跑出畫面!
    this.isLoading = false;

  },
  methods: {
    // 預覽頁面!
    preview() {
      const previewUrl = ("/preview/" + this.newsId);
      window.open(previewUrl, "_blank");
    },
    // 完成送出
    finished() {

      let newCategory = this.selectedCategory1 + "," + this.selectedCategory2

      let newDescription = this.content.replaceAll("\n", "<br>");

      // 編輯模式
      if (this.newsId != 0) {

        let addNewsData = {
          "update_news_id": this.newsId,
          "update_title": this.newTitle,
          "update_category": newCategory,
          "update_update_date": this.newsUpdateDate,
          "update_description": newDescription,
        }

        axios({
          method: 'POST',
          url: this.updateNewsAPI,
          data: addNewsData,
        })
          .then(response => {
            const data = response.data;
            // console.log(data);

            this.$swal({
              icon: 'success',
              title: 'ニュース編集成功しました，自動的にニュース一覧に移動します',
              confirmButtonText: 'はい',
              confirmButtonColor: '#42ccae',
              timerProgressBar: true,
              timer: 3000,
            })
              .then((result) => {
                sessionStorage.removeItem("existNews");
                setTimeout(() => {
                  this.$router.push('/');
                }, 500); // 延遲 0.5 秒後跳頁
              })
          })
          .catch((err) => {
            console.log("錯誤", err);
          })
      }
      // 新增模式
      else {

        let addNewsData = {
          "news_title": this.newTitle,
          "news_category": newCategory,
          "news_create_date": this.newsCreateDate,
          "news_update_date": this.newsUpdateDate,
          "news_description": newDescription,
        }

        // 測試抓的格式對不對
        // if (typeof this.newsCreateDate === 'object' && this.newsCreateDate instanceof Date) {
        //   console.log('這是一個日期（Date）物件!');
        // } else if (typeof this.newsCreateDate === 'string') {
        //   console.log('這是一個字符串（String）');
        // } else {
        //   console.log('這不是一個日期或字符串');
        // }


        axios({
          method: 'POST',
          url: this.addNewsAPI,
          data: addNewsData,
        })
          .then(response => {
            const data = response.data;
            // console.log(data);

            if (data.message !== "更新成功") {
              this.$swal({
                icon: 'success',
                title: 'ニュース追加成功しました，自動的にニュース一覧に移動します',
                confirmButtonText: 'はい',
                confirmButtonColor: '#42ccae',
                timerProgressBar: true,
                timer: 3000,
              })
                .then((result) => {
                  sessionStorage.removeItem("newNews");
                  setTimeout(() => {
                    this.$router.push('/');
                  }, 500); // 延遲 0.5 秒後跳頁
                })
            } else {
              this.$swal({
                icon: 'error',
                title: '有東西錯誤!',
                timerProgressBar: true,
                timer: 3000,
              })
            }

          })
          .catch((err) => {
            console.log("錯誤", err);
          })
      }
    },
    cancel() {
      this.$swal({
        icon: 'question',
        title: 'キャンセルして、前のページに移動しますか',
        showCancelButton: true,
        confirmButtonText: 'はい',
        cancelButtonText: 'まだ',
        confirmButtonColor: '#42ccae',
        cancelButtonColor: '#a8c3bd',
        reverseButtons: true,
      })
        .then((result) => {
          if (result.isConfirmed) {
            setTimeout(() => {
              this.$router.go(-1);
            }, 500); // 延遲 0.5 秒後跳頁
          }
        })
    },
    // 存session
    setSessionData() {
      let newCategory = this.selectedCategory1 + "," + this.selectedCategory2

      // textarea把換行也存進去!
      let newDescription = this.content.replaceAll("\n", "<br>");

      this.newNews = {
        newsTitle: this.newTitle,
        newsCreateDate: this.showCreateDate,
        newsUpdateDate: this.showUpdateDate,
        newsCategory: newCategory,
        newsDescription: newDescription,
        newsReadingCount: 0,
      }

      if (this.newsId != 0) {
        sessionStorage.setItem("existNews", JSON.stringify(this.newNews))
      }
      else {
        sessionStorage.setItem("newNews", JSON.stringify(this.newNews))
      }
    },
  },
  // 監聽，有變化就存到session
  watch: {
    newTitle: "setSessionData",
    showCreateDate: "setSessionData",
    selectedCategory1: "setSessionData",
    selectedCategory2: "setSessionData",
    content: "setSessionData",
  }
}
</script>

<template>
  <div class="header">
    <img v-if="newsId == 0" src="../assets/img/add_news.png " alt="ニュース追加">
    <img v-else src="../assets/img/update_news.png " alt="ニュース編集">
  </div>


  <div v-if="isLoading" class="loading">
    <img src="../assets/img/icons8-loading.gif" alt="">
  </div>


  <div v-else class="main">
    <div class="contain">
      <div class="box">
        <h2>タイトル</h2>
        <input type="text" v-model="newTitle" class="title_input">
      </div>

      <hr>
      <div class="boxes">
        <h2>カテゴリー</h2>

        <input name="choose_category" type="radio" id="existCategory" v-model="selectedRadio" value="existCategory"><label
          for="existCategory">既存のカテゴリを使う</label>
        <input name="choose_category" type="radio" id="newCategory" v-model="selectedRadio" value="newCategory"><label
          for="newCategory">新しいカテゴリを使う</label>
      </div>
      <div class="category_box">
        <div v-if="selectedRadio === 'existCategory'">
          <select name="category1" id="" class="category" v-model="selectedCategory1">
            <option v-for="category1 in newsCategory1" :value="category1">{{ category1 }}</option>
          </select>
          <select name="category2" id="" v-model="selectedCategory2" class="category">
            <option v-for="category2 in newsCategory2" :value="category2">{{ category2 }}</option>
          </select>
        </div>
        <div v-else>
          <input type="text" placeholder="優先順位を入力" v-model="selectedCategory1" class="category">
          <input type="text" placeholder="ニュースの種類を入力" v-model="selectedCategory2" class="category">
        </div>
      </div>
      <hr>
      <div class="box">
        <h2>内容</h2>
        <textarea name="text_area" id="text_area" v-model="content" v-html="content"></textarea>
      </div>

      <!-- 編輯模式 -->
      <div class="btn_area" v-if="newsId !== 0">
        <button class="btn cancelBtn" type="button" @click="cancel">
          <i class="fa-solid fa-circle-arrow-left fa-xl"></i>
          キャンセル
        </button>
        <button class="btn previewBtn" type="button" @click="preview" target="_blank">
          <i class="fa-solid fa-eye fa-xl"></i>
          プレビュー
        </button>
        <button class="btn finishedBtn" type="button" @click="finished">
          <i class="fa-solid fa-circle-check fa-xl"></i>
          　投　稿　
        </button>
      </div>

      <!-- 新增模式 -->
      <div class="btn_area" v-else>
        <button class="btn previewBtn" type="button" @click="preview" target="_blank">
          <i class="fa-solid fa-eye fa-xl"></i>
          プレビュー
        </button>
        <button class="btn finishedBtn" type="button" @click="finished">
          <i class="fa-solid fa-circle-check fa-xl"></i>
          　投　稿　
        </button>
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
  margin-bottom: 100px;

  .contain {
    width: 90%;
    margin: auto;

    hr {
      border: 2px dashed #64847d;
      margin: 20px 10px;
    }

    .boxes {
      margin: 10px;
      display: flex;
      justify-content: start;
      align-items: center;

      h2 {
        width: 100px;
        font-size: 20px;
        margin: 0 10px;
        background-color: #c0ede2;
      }
    }
  }


  .title_input {
    width: 90%;
    height: 25px;
    font-size: 20px;
    font-family: 'cjkFonts';
  }


  .box,
  .category_box {
    display: flex;
    margin: 20px 10px;
    justify-content: start;
    align-items: center;

    h2 {

      background-color: #c0ede2;
      text-align: center;
      width: 100px;
      font-size: 20px;
      margin: 0 10px;
    }

    .category {
      width: 180px;
      height: 25px;
      margin: 5px;
      font-size: 16px;
      font-family: 'cjkFonts';
      padding: 2px;
    }
  }

  .category_box {
    margin: 0 0 0 150px;
  }

  input[type="radio"] {
    width: 15px;
    height: 15px;
  }

  label {
    background-color: #ffffff;
    padding: 2px;

    &:hover {
      background-color: #b5dfd5;
    }
  }

  textarea {
    height: 200px;
    width: 90%;
    font-size: 16px;
    line-height: 22px;
    font-family: 'cjkFonts';
  }

  .btn_area {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .btn {
      margin: 5px 10px 20px 10px;
      height: 30px;
      width: 120px;
      border: none;
      border-radius: 5px;
      text-align: center;
      transition: 0.3s;
    }

    .previewBtn {
      background-color: #73d0bc;

      &:hover {
        background-color: #d2ebe6;
      }
    }

    .finishedBtn {
      background-color: #42ccae;

      &:hover {
        background-color: #d2ebe6;
      }
    }

    .cancelBtn {
      background-color: #a8c3bd;

      &:hover {
        background-color: #d2ebe6;
      }
    }

  }

}
</style>
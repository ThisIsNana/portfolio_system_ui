<script setup>
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        <i class="fa-solid fa-house-chimney fa-sm"></i> ホームページ
      </RouterLink>
      <RouterLink to="/news">
        <i class="fa-solid fa-newspaper fa-sm"></i> ニュース
      </RouterLink>
    </nav>

    <div class="header">
      <h2>
        <i class="fa-solid fa-kiwi-bird fa-sm" style="color: #000000;"></i>
        個人資料管理システム
      </h2>
    </div>

  </header>
</template>

<style lang="scss" scoped>
header {
  nav {
    background-color: #fff196;
    display: flex;
    justify-content: end;

    a {
      margin: 10px;
      color: #616161;

      &:hover {
        color: #8d8d8d;
      }
    }

  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff8ca;
    height: 100px;


    h2 {
      text-align: center;
      font-size: 48px;
    }
  }
}
</style>

<script setup>
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        <i class="fa-solid fa-house-chimney fa-sm"></i> ホームページ
      </RouterLink> |
      <!-- <RouterLink to="/news">
        <i class="fa-solid fa-newspaper fa-sm"></i> ニュース
      </RouterLink> -->
      <RouterLink to="/addNews">
        <i class="fa-solid fa-circle-plus fa-sm"></i> ニュース追加
      </RouterLink> |
      <RouterLink to="/login">
        <i class="fa-solid fa-user fa-sm"></i> ログイン
      </RouterLink>
    </nav>


  </header>
</template>

<style lang="scss" scoped>
header {
  nav {
    background-color: #ffffff;
    display: flex;
    justify-content: end;
    align-items: center;

    a {
      padding: 5px;
      margin: 3px 5px;
      color: #90bdb3;
      transition: 0.5s;
      border-radius: 10px;

      &:hover {
        color: #FFFFFF;
        background-color: #90bdb3;
      }
    }

  }

}
</style>

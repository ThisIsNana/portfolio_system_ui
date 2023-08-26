<script>
export default {

}
</script>
<template>
  <div class="header">
    <h2>ログイン</h2>
  </div>
  <div class="main">
    <h2>この機能は現在開発中です。</h2>
    <h3>ご期待ください。</h3>
    <img src="https://2.bp.blogspot.com/-GByhHlPZwZE/VA7mWdxdo5I/AAAAAAAAmO8/Qclltvf0zrM/s400/sankaku_road_cone.png"
      alt="作業中">
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #90bdb3;
  height: 80px;


  h2 {
    text-align: center;
    font-size: 48px;
  }
}

.main {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2,
  h3 {
    font-size: 20px;
    margin: 5px;
  }


  img {
    width: 200px;

  }
}
</style>
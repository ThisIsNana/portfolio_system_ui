<!-- 這只是用來增加好玩的 FB留言插件 -->

<script>
export default {
  data() {
    return {
      // 按讚分享的網頁功能
      FbLikeUrl: "https://developers.facebook.com/docs/plugins/",
    };
  },
  computed: {
    facebookLikeUrl() {
      // 根據路由生成不同的網址
      const currentUrl = window.location.href;
      return currentUrl;
    }
  },
  mounted() {
    // 初始化 Facebook SDK
    window.fbAsyncInit = function () {
      FB.init({
        appId: '257629184258418',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v17.0'
      });
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v17.0";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
};
</script>
<template>
  <div>
    <div id="fb-root"></div>
    <div class="fb-like" :data-href="FbLikeUrl" data-width="" data-layout="standard" data-action="like" data-size="large"
      data-share="true">
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
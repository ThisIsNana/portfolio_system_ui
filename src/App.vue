<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeBar from './components/HeaderBar.vue'
import FooterBar from './components/footerBar.vue';
</script>

<template>
  <HomeBar />
  <RouterView />
  <FooterBar />
</template>

<style lang="scss" scoped></style>

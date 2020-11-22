<template>
  <div id="app">
    <TheHeader></TheHeader>
    <router-view class="music-content"/>
    <scroll-top></scroll-top>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader'
import ScrollTop from './components/ScrollTop'
import TheFooter from './components/TheFooter'
export default {
  name: 'App',
  components: {
    TheFooter,
    ScrollTop,
    TheHeader
  }
}
</script>

<style  lang="scss" scoped>
@import './assets/css/app.scss';
</style>

<template>
  <div id="app">
    <!--头部-->
    <TheHeader></TheHeader>
    <router-view class="music-content"/>
    <song-audio></song-audio>
    <!--播放器-->
    <play-bar></play-bar>
    <!--回到顶部-->
    <scroll-top></scroll-top>
    <!--脚部-->
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader'
import ScrollTop from './components/ScrollTop'
import TheFooter from './components/TheFooter'
import SongAudio from './components/SongAudio'
import PlayBar from './components/PlayBar'
export default {
  name: 'App',
  components: {
    PlayBar,
    TheFooter,
    ScrollTop,
    TheHeader,
    SongAudio
  }
}
</script>

<style  lang="scss" scoped>
@import './assets/css/app.scss';
</style>

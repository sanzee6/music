<template>
  <transition name="slide-fade">
    <div class="the-aside" v-if="showAside">
      <h2 class="title">播放列表</h2>
      <ul class="menus">
        <li v-for="(item,index) in listOfSongs" :key="index"
        :class="{'is-play':id==item.id}" @click="toplay(item.id, item.url, item.pic, item.index, item.name, item.lyric)">
          {{replaceFName(item.name)}}
        </li>
      </ul>
      setListOfSongs
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'TheAside',
  computed: {
    ...mapGetters([
      'showAside', // 播放中的歌曲列表
      'listOfSongs', // 当前歌曲列表
      'id' // 播放中的音乐
    ])
  },
  mounted () {
    let _this = this
    document.addEventListener('click', function () {
      _this.$store.commit('setShowAside', false)
    }, true)
  },
  methods: {
    // 或缺名字前半部分歌手名--歌名
    replaceLName (str) {
      let arr = str.split('-')
      return arr[0]
    },
    replaceFName (str) {
      let arr = str.split('-')
      return arr[1]
    },
    // 播放功能
    toplay: function (id, url, pic, index, name, lyric) { // id 地址 图片 序号 歌名 歌词
      this.$store.commit('setId', id)
      this.$store.commit('setUrl', this.$store.state.configure.HOST + url)
      this.$store.commit('setPicUrl', this.$store.state.configure.HOST + pic)
      this.$store.commit('setListIndex', index)
      this.$store.commit('setTitle', this.replaceFName(name)) //  歌名
      this.$store.commit('setArtist', this.replaceLName(name)) // 歌手名
      this.$store.commit('setLyric', lyric)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/the-aside";
</style>

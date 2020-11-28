<template>
  <div class="song-list-album">
    <!--左侧-->
    <div class="album-slide">
      <div class="album-img">
        <img :src="attachImageUrl(tempList.pic)"/>
      </div>
      <div class="album-info">
        <h2>简介</h2>
        <span>
          {{tempList.introduction}}
        </span>
      </div>
    </div>
    <!--中间-->
    <div class="album-content">
      <div class=album-title>
        <p>{{tempList.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mixin} from '../mixins'
import {mapGetters} from 'vuex'
export default {
  name: 'SongListAlbum',
  mixins: [mixin],
  data () {
    return {
      songLists: [], // 当前页面需要展示的歌曲列表
      songListId: '' // 前面传来的歌单id
    }
  },
  computed: {
    ...mapGetters([
      'listOfSongs', // 当前播放列表
      'tempList' // 当前歌单对象
    ])
  },
  created () {
    this.songListId = this.$route.params.id
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/song-list-album";
</style>

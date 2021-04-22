<template>
  <div class="search-song-Lists">
    <content-list :contentList="albumDatas"></content-list>
  </div>
</template>

<script>
import ContentList from '../ContentList'
import {songOfSongTag} from '../../api/index.js'
import {mixin} from '../../mixins'

export default {
  name: 'TagSongLists',
  components: {ContentList},
  mixins: [mixin],
  data () {
    return {
      albumDatas: []
    }
  },
  mounted () {
    this.getTagList()
  },
  methods: {
    getTagList () {
      console.log(localStorage.getItem('songTitle'))
      let songName = localStorage.getItem('songTitle')
      songOfSongTag(songName).then(res => {
        console.log(res)
        this.albumDatas = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/search-song-Lists";
</style>

<template>
  <div class="search">
    <nav class="searchList-nav" ref="change">
      <span :class="{isActive: toggle=='Songs'}" @click="handleChangeView('Songs')">为你推荐</span>
    </nav>
    <component :is="currentView">

    </component>
  </div>
</template>

<script>
import tagSongs from '../components/tag/TagSongs'
import tagSongLists from '../components/tag/TagSongLists'
export default {
  name: 'Search',
  components: {
    tagSongs,
    tagSongLists
  },
  data () {
    return {
      toggle: 'Songs',
      currentView: 'tagSongLists',
      songList: []
    }
  },
  methods: {
    // 切换功能
    handleChangeView (component) {
      this.currentView = 'tag' + component
      this.toggle = component
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/css/search";
</style>

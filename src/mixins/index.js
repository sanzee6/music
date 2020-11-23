import {likeSongOfName} from '../api/index'
export const mixin = {
  methods: {
    // 提示信息
    notify (title, type) {
      this.$notify({
        title: title,
        type: type
      })
    },
    // 获取图片地址
    attachImageUrl (srcUrl) {
      return srcUrl ? this.$store.state.configure.HOST + srcUrl : '../assets/img/user.jpg'
    },
    // 根据歌手名字模糊搜索
    getSong () {
      if (!this.$route.query.keywords) {
        this.$store.commit('setListOfSongs', [])
        this.notify('您输入的内容为空', 'warning')
      } else {
        likeSongOfName(this.$route.query.keywords)
          .then(res => {
            if (!res.length) {
              this.$store.commit('setListOfSongs', [])
              this.notify('为搜索到符合条件的歌曲', 'warning')
            } else {
              this.$store.commit('setListOfSongs', res)
            }
          }).catch(err => {
            console.log(err)
          })
      }
    },
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

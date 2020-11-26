<template>
  <div class="play-bar">
    <div class="kongjian">
      <!--上一首歌-->
      <div class="item" @click="prev">
        <svg class="icon">
          <use xlink:href="#icon-ziyuanldpi"></use>
        </svg>
      </div>
      <!--播放-->
      <div class="item" @click="togglePlay">
      <svg class="icon">
        <use :xlink:href="playButtonUrl"></use>
      </svg>
    </div>
      <!--下一首歌-->
      <div class="item" @click="next">
        <svg class="icon">
          <use xlink:href="#icon-ziyuanldpi1"></use>
        </svg>
      </div>

      <!--歌曲图片-->
      <div class="item-img">
        <img :src="picUrl">
      </div>

      <!--播放进度-->
      <div class="playing-speed">
        <!--当前播放时间-->
        <div class="current-time">{{nowTime}}</div>
        <div class="progress-box">
          <div class="item-song-title">
            <div>{{this.title}}</div>
            <div>{{this.artist}}</div>
          </div>

          <div class="progress" ref="progress" @mousemove="mousemove">
            <!--进度条-->
            <div ref="bg" class="bg" @click="updatemove">
              <div ref="curProgress" class="cur-progress" :style="{width:curLength+'%'}"></div>
            </div>
            <!--拖动-->
            <div ref="idot" class="idot" :style="{left:curLength+'%'}"
            @mousedown="mousedown" @mouseup="mouseup"></div>
          </div>
        </div>

        <!--当前结束时间-->
        <div class="left-time">{{songTime}}</div>
        <!--音量-->
        <div class="item item-volume">
          <svg v-if="volume ==0" class="icon">
            <use xlink:href="#icon-yinliangjingyinheix"></use>
          </svg>
          <svg v-else class="icon">
            <use xlink:href="#icon-yinliang1"></use>
          </svg>
          <!--音量滑块-->
          <el-slider class="volume" v-model="volume" :vertical="true"></el-slider>
        </div>

        <!--收藏-->
        <div class="item item-volume">
          <svg class="icon">
            <use xlink:href="#icon-xihuan-shi"></use>
          </svg>
        </div>

        <!--下载-->
        <div class="item">
          <svg class="icon">
            <use xlink:href="#icon-xiazai"></use>
          </svg>
        </div>

        <!--当前播放列表-->
        <div class="item" @click="changeAside">
          <svg class="icon">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      nowTime: '00:00', // 当前播放时间
      songTime: '00:00', // 当前播放总时间
      curLength: 0, // 進度條的位置
      progressLength: 0, // 進度條縂長度
      mouseStartX: 0, // 拖拽開始位置
      tag: false, // 拖拽开始结束的标志，拖拽时变true
      volume: 50 // 默认音量为50
    }
  },
  name: 'PlayBar',
  computed: {
    ...mapGetters([
      'id', // 歌曲id
      'url', // 歌曲地址
      'isPlay', // 播放状态
      'playButtonUrl', // 正在播放的圖標
      'picUrl', // 播放音樂的圖片
      'title', // 歌名
      'artist', // 歌手名
      'duration', // 音乐时长
      'curTime', // 当前音乐的播放位置
      'showAside', // 播放中的歌曲列表
      'listIndex', // 歌曲在歌单中的位置
      'listOfSongs', // 当前歌单列表
      'autoNext' // 自动播放下一首
    ])
  },
  watch: {
    // 切換播放轉臺的图标
    isPlay () {
      if (this.isPlay) {
        this.$store.commit('setPlayButtonUrl', '#icon-zanting')
      } else {
        this.$store.commit('setPlayButtonUrl', '#icon-bofang')
      }
    },
    curTime () {
      this.nowTime = this.formatSeconds(this.curTime)
      this.songTime = this.formatSeconds(this.duration)
      this.curLength = (this.curTime / this.duration) * 100
    },
    // 音量大小的变化
    volume () {
      this.$store.commit('setVolume', this.volume / 100) // 百分比显示
    },
    // 自动播放下一首
    autoNext () {
      this.next()
    }
  },
  mounted () {
    this.progressLength = this.$refs.progress.getBoundingClientRect().width
    document.querySelector('.item-volume').addEventListener('click', function (e) {
      document.querySelector('.volume').classList.add('show-volume')
      e.stopPropagation()
    }, false)
    document.querySelector('.volume').addEventListener('click', function (e) {
      e.stopPropagation()
    }, false)
    document.addEventListener('click', function () {
      document.querySelector('.volume').classList.remove('show-volume')
    }, false)
  },
  methods: {
    // 音乐播放暂停
    togglePlay () {
      if (this.isPlay) {
        this.$store.commit('setIsPlay', false)
      } else {
        this.$store.commit('setIsPlay', true)
      }
    },
    // 解析時間
    formatSeconds (val) {
      let theTime = parseInt(val)
      let result = '' // 返回值
      let hour = parseInt(theTime / 3600) // 小時
      let min = parseInt((theTime / 60 % 60)) // 分鐘， 除以60 去余
      let second = parseInt(theTime % 60) // 秒
      if (hour > 0) {
        if (hour < 10) {
          result = '0' + hour + ':'
        } else {
          result = hour + ':'
        }
      }
      if (min > 0) {
        if (min < 10) {
          result += '0' + min + ':'
        } else {
          result += min + ':'
        }
      } else {
        result += '00:'
      }
      if (second > 0) {
        if (second < 10) {
          result += '0' + second
        } else {
          result += second
        }
      } else {
        result += '00'
      }
      return result
    },
    //  拖拽开始
    mousedown (e) {
      this.mouseStartX = e.clientX
      this.tag = true
    },
    // 拖拽结束
    mouseup () {
      this.tag = false
    },
    mousemove (e) {
      if (!this.duration) {
        return false
      }
      if (this.tag) {
        let movementX = e.clientX - this.mouseStartX // 移动的距离
        let curLength = this.$refs.curProgress.getBoundingClientRect().width
        let newPercent = ((movementX + curLength) / this.progressLength) * 100
        if (newPercent > 100) {
          newPercent = 100
        }
        this.curLength = newPercent
        this.mouseStartX = e.clientX
        this.changeTime(newPercent)
      }
    },
    // 更改歌曲进度
    changeTime (percent) {
      let newCurTime = (percent / 100) * this.duration
      this.$store.commit('setChangeTime', newCurTime)
    },
    // 鼠标点击移动
    updatemove (e) {
      if (!this.tag) {
        // 进度条左侧左边
        let curLength = this.$refs.bg.offsetLeft
        let newPercent = ((e.clientX - curLength) / this.progressLength) * 100 // 百分比*100 变成长度
        if (newPercent > 100) {
          newPercent = 100
        } else if (newPercent < 0) {
          newPercent = 0
        }
        this.curLength = newPercent
        this.changeTime(newPercent)
      }
    },
    // 显示播放中的歌曲列表
    changeAside () {
      this.$store.commit('setShowAside', true)
    },
    // 上一首
    prev () {
      if (this.listIndex !== -1 && this.listOfSongs.length > 1) { // 当前没有歌或者就一首歌时不执行
        if (this.listIndex > 0) { // 如果不是第一首歌
          this.$store.commit('setListIndex', this.listIndex - 1) // 返回上一首
        } else { // 第一首歌
          this.$store.commit('setListIndex', this.listOfSongs.length - 1) // 切换到倒数第一收歌
        }
        this.toplay(this.listOfSongs[this.listIndex].url)
      }
    },
    // 下一首
    next () {
      if (this.listIndex !== -1 && this.listOfSongs.length > 1) { // 当前没有歌或者就一首歌时不执行
        if (this.listIndex < this.listOfSongs.length - 1) { // 如果不是最后一首歌
          this.$store.commit('setListIndex', this.listIndex + 1) // 返回xia一首
        } else { // zuihou一首歌
          this.$store.commit('setListIndex', 0) // 切换到第一收歌
        }
        this.toplay(this.listOfSongs[this.listIndex].url)
      }
    },
    // 播放
    toplay: function (url) { // id 地址 图片 序号 歌名 歌词
      if (url && url !== this.url) {
        this.$store.commit('setId', this.listOfSongs[this.listIndex].id)
        this.$store.commit('setUrl', this.$store.state.configure.HOST + url)
        this.$store.commit('setPicUrl', this.$store.state.configure.HOST + this.listOfSongs[this.listIndex].pic)
        this.$store.commit('setTitle', this.replaceFName(this.listOfSongs[this.listIndex].name)) //  歌名
        this.$store.commit('setArtist', this.replaceLName(this.listOfSongs[this.listIndex].name)) // 歌手名
        this.$store.commit('setLyric', this.listOfSongs[this.listIndex].lyric)
      }
    },

    replaceLName (str) {
      let arr = str.split('-')
      return arr[0]
    },
    replaceFName (str) {
      let arr = str.split('-')
      return arr[1]
    }
  }

}
</script>

<style  lang="scss" scoped>
  @import '../assets/css/play-bar';
</style>

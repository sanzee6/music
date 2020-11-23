<template>
  <div class="play-bar">
    <div class="kongjian">
      <!--上一首歌-->
      <div class="item">
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
      <div class="item">
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
          <div class="progress" ref="progress">
            <!--进度条-->
            <div ref="bg" class="bg">
              <div ref="curProgress" class="cur-progress" :style="{width:curLength+'%'}"></div>
            </div>
            <!--拖动-->
            <div ref="idot" class="idot" :style="{left:curLength+'%'}"></div>
          </div>
        </div>

        <!--当前结束时间-->
        <div class="left-time">{{songTime}}</div>
        <!--音量-->
        <div class="item item-volume">
          <svg class="icon">
            <use xlink:href="#icon-yinliang1"></use>
          </svg>
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
        <div class="item">
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
      mouseStartX: 0 // 拖拽開始位置
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
      'curTime' // 当前音乐的播放位置
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
    }
  },
  mounted () {
    this.progressLength = this.$refs.progress.getBoundingClientRect().width
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
    }
  }

}
</script>

<style  lang="scss" scoped>
  @import '../assets/css/play-bar';
</style>

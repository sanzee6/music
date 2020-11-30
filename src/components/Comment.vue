<template>
  <div>
    <div class="comment">
      <h2>评论</h2>
      <div class="comment-msg">
        <!--头像-->
        <div class="comment-img">
          <img :src="attachImageUrl(avator)">
        </div>
        <!--评论内容框-->
        <el-input class="comment-input" type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
        </el-input>
      </div>
      <!--提交按钮-->
      <el-button type="primary" class="sub-btn" @click="postComment">提交评论</el-button>
    </div>
    <!--已经提交的评论-->
    <p>共有{{commentList.length}}条精选评论</p>
    <ul class="popular" v-for="(item,index) in commentList" :key="index">
      <li>
        <!--头像-->
        <div class="popular-img">
          <img :src="attachImageUrl(userPic[index])">
        </div>
        <!--名字时间和评论内容-->
        <div class="popular-msg">
          <ul>
            <li class="name">{{userName[index]}}</li>
            <li class="time">{{item.createTime}}</li>
            <li class="content">{{item.content}}</li>
          </ul>
        </div>
        <!--点赞图标-->
        <div class="up" ref="up" @click="postUp(item.id,item.up,index)">
          <svg class="icon">
            <use xlink:href="#icon-zan"></use>
          </svg>
          {{item.up}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mixin} from '../mixins'
import {mapGetters} from 'vuex'
import {setComment, setLike, getAllComment, getUserOfId} from '../api/index'
export default {
  name: 'Comment',
  mixins: [mixin],
  props: [
    'playId', // 歌曲或者歌单id
    'type' // 0代表歌曲。1代表歌单
  ],
  computed: {
    ...mapGetters([
      'id', // 歌曲或歌单id
      'loginIn', // 用户是否已登录
      'userId', // 当前登录用户id
      'avator' // 当前登录用户头像
    ])
  },
  mounted () {
    this.getComment()
  },
  data () {
    return {
      textarea: '', // 输入框评论的内容
      commentList: [], // 存放评论列表
      userPic: [], // 用户的头像
      userName: [] // 用户的昵称
    }
  },
  methods: {
    // 提交评论 先判断是否登录
    postComment () {
      if (this.loginIn) {
        let params = new URLSearchParams()
        if (this.type === 0) { // 歌曲页面
          params.append('songId', this.playId)
        } else { //  歌单页面
          params.append('songListId', this.playId)
        }
        params.append('userId', this.userId)
        params.append('type', this.type)
        params.append('content', this.textarea)
        setComment(params)
          .then(res => {
            if (res.code === 1) {
              this.notify('评论成功', 'success')
              this.textarea = ''
              this.getComment()
            } else {
              this.notify('评论失败', 'error')
            }
          })
          .catch(err => {
            this.notify('评论失败', 'error')
          })
      } else {
        this.rank = null
        this.notify('请先登录', 'warning')
      }
    },
    // 评论列表
    getComment () {
      getAllComment(this.type, this.playId)
        .then(res => {
          this.commentList = res
          for (let item of res) {
            this.getUsers(item.userId)
          }
        })
        .catch(err => {
          this.notify('评论加载失败', 'error')
        })
    },
    // 获取用户信息
    getUsers (id) {
      getUserOfId(id)
        .then(res => {
          this.userPic.push(res.avator)
          this.userName.push(res.username)
        })
        .catch(err => {
          this.notify('出错了', 'error')
        })
    },
    // 给某一个评论点赞
    postUp (id, up, index) {
      if (this.loginIn) {
        let params = new URLSearchParams()

        params.append('id', id)
        params.append('up', up + 1)
        setLike(params)
          .then(res => {
            if (res.code === 1) {
              this.notify('感谢您的点赞', 'success')
              this.$refs.up[index].children[0].style.color = '#2796cd'
              this.getComment()
            } else {
              this.notify('点赞失败', 'error')
            }
          })
          .catch(err => {
            this.notify('点赞失败', 'error')
          })
      } else {
        this.rank = null
        this.notify('请先登录', 'warning')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/css/comment";
</style>

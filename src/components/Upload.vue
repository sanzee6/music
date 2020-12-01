<template>
  <div class="upload">
    <div id="user">
      <img :src="attachImageUrl(avator)">
    </div>
    <div class="section">
      <el-upload drag :action="uploadUrl()" :show-file-list="false" :on-success="handleAvatorSuccess"
                 :before-upload="beforeAvatorUpload">
        <i class="el-icon-upload"></i>
        <div>
          将文件拖到此处，或<span style="color:blue">修改头像</span>
        </div>
        <span>只能上传jpg/png文件</span>
        <span>且不能超过10MB</span>
      </el-upload>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {mixin} from '../mixins'

export default {
  name: 'Upload',
  mixins: [mixin],
  computed: {
    ...mapGetters([
      'userId', // 用户id
      'avator' // 用户头像
    ])
  },
  methods: {
    // 上传地址
    uploadUrl () {
      return `${this.$store.state.configure.HOST}/consumer/updateConsumerPic?id=${this.userId}`
    },
    // 上传成功
    handleAvatorSuccess (res, file) {
      if (res.code === 1) {
        this.$store.commit('setAvator', res.avator)
        this.notify('修改成功', 'success')
      } else {
        this.notify('修改失败', 'error')
      }
    },
    // 上传之前的校验
    beforeAvatorUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isJPG) {
        this.notify('上传头像图片只能是JPG格式', 'error')
        return false
      }
      if (!isLt10M) {
        this.notify('上传头像图片不能大于10MB', 'error')
        return false
      }
      return true
    },
    // 获取图片地址
    attachImageUrl (srcUrl) {
      return srcUrl ? this.$store.state.configure.HOST + srcUrl : '../assets/img/user.jpg'
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../assets/css/upload.scss';
</style>

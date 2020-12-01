<template>
<!--整体-->
  <div class="setting">
        <!--左侧-->
    <div class="leftCol">
      <!--标题设置-->
      <div class="settingsMainHeader">设置</div>
        <ul class="setting-aside">
          <li v-for="(item,index) in settingList" :key="index" :class="{activeColor: activeName==item.name}"
              @click="handleClick(item)">
            {{item.name}}
          </li>
        </ul>
    </div>

        <!--右侧-->
    <div class="contentCol">
      <component :is="componentSrc"></component>
    </div>
  </div>
</template>

<script>
import Info from '../components/Info'
import Upload from '../components/Upload'
export default {
  components: {
    Info,
    Upload
  },
  data () {
    return {
      settingList: [
        {name: '个人信息', path: 'Info'},
        {name: '修改头像', path: 'Upload'}
      ],
      activeName: '个人信息',
      componentSrc: 'Info'
    }
  },
  methods: {
    handleClick (item) {
      this.activeName = item.name
      this.componentSrc = item.path
    }
  },
  name: 'Setting'
}
</script>

<style lang="scss" scoped>
@import "../assets/css/setting";
</style>

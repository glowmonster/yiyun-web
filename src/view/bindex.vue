<template>
  <el-container class="b-i-box">
    <el-header height="px2rem(7px)"><backTitle></backTitle></el-header>
    <el-container>
      <el-aside>
        <el-menu
          default-active="/bhome"
          router="router"
          class="b-i-menu"
          background-color="RGBA(0,0,255, 0)"
          @select="menuSelect">
          <el-menu-item index="/bhome">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/bsong">
            <i class="el-icon-service"></i>
            <span slot="title">歌曲管理</span>
          </el-menu-item>
          <el-menu-item index="/bsongstyle">
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">歌曲风格管理</span>
          </el-menu-item>
          <el-menu-item index="/bsonglist">
            <i class="el-icon-document"></i>
            <span slot="title">歌单管理</span>
          </el-menu-item>
          <el-menu-item index="/bloginlog">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">登陆日志</span>
          </el-menu-item>
          <el-menu-item index="/boperationlog">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">操作日志</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {mapGetters} from 'vuex'
import backTitle from '@/components/backTitle'
export default {
  data () {
    return {
    }
  },
  components: {
    backTitle
  },
  methods: {
    autoChangeFontSize () {
      let htmlSize = document.documentElement.clientWidth || document.body.clientWidth
      let dom = document.getElementsByTagName('html')[0]
      dom.style.fontSize = htmlSize / 16 + 'px'
      window.addEventListener('resize', (e) => {
        let htmlSize = document.documentElement.clientWidth || document.body.clientWidth
        dom.style.fontSize = htmlSize / 16 + 'px'
      })
    },
    menuSelect (key, keyPath) {
      console.log('当前路径:' + key + '=' + keyPath)
    }
  },
  computed: {
    ...mapGetters(
      ['isLogin', 'user']
    )
  },
  mounted () {
    if (!this.isLogin) {
      this.$message({
        message: '必须先登陆才能进行操作哦!',
        showClose: true
      })
      this.$router.push('/login')
      return
    }
    this.autoChangeFontSize()
    this.$router.push('/bhome')
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';
  .b-i-box {
    width: 100%;
    height: 100%;
    .el-menu-item {
      margin-top: px2rem(2px);
      span {
        font-size: px2rem(1.3px);
        margin-left: px2rem(1px);
      }
      i {
        font-weight: bold;
        font-size: px2rem(1.5px);
        margin-left: px2rem(2px);
      }
    }
  }
  .el-main {
    font-size: px2rem(2px);
    height: 100%;
    width: 100%;
  }
  .el-header {
    font-size: px2rem(2px);
    height: px2rem(7px);
    padding: 0;
  }
  .el-aside {
    font-size: px2rem(2px);
    height: 100%;
    background-color: #E6E6FA;
  }
</style>

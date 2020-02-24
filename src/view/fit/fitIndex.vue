<template>
  <div class="fit-index-box">
    <div class="title-box">
      <el-row>
        <el-col :span="24" class="fit-title-col">
          <i class="menu-icon iconfont icon-yinle animated flash infinite slower"></i>
          <span>易云音乐</span>
        </el-col>
      </el-row>
    </div>

    <div class="menu-box">
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-menu
            mode="horizontal"
            @select="menuSelect"
            router="router"
            :default-active="defaultActive"
            background-color="#F0FFFF"
            active-text-color="#409EFF">
            <el-menu-item index="/fitFindMusic">发现音乐</el-menu-item>
            <el-menu-item index="/fitMyMusic">我的音乐</el-menu-item>
            <el-menu-item index="/fitPersonal">个人信息</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <router-view></router-view>

    <div class="play-bar-box">
      <el-row type="flex" justify="center">
        <el-col :span="3" :offset="2">
          <div class="bar-col-div">
            <img :src="songImageUrl" />
          </div>
        </el-col>
        <el-col :span="10">
          <audio ref="audio" :src="songFileUrl" class="audio" controls="controls" type="audio/mpeg"></audio>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  data () {
    return {
      userName: '',
      songFileUrl: '',
      songImageUrl: '',
      defaultActive: '/fitFindMusic'
    }
  },
  components: {},
  computed: {
    ...mapGetters(
      ['isLogin', 'user']
    )
  },
  methods: {
    ...mapMutations(
      ['saveLoginInfo', 'changeLoginState']
    ),
    autoChangeFontSize () {
      let htmlSize = document.documentElement.clientWidth || document.body.clientWidth
      let dom = document.getElementsByTagName('html')[0]
      dom.style.fontSize = htmlSize / 16 + 'px'
      window.addEventListener('resize', (e) => {
        let htmlSize = document.documentElement.clientWidth || document.body.clientWidth
        dom.style.fontSize = htmlSize / 16 + 'px'
      })
    },
    readyPlay () {
      const songObject = JSON.parse(window.localStorage.getItem('currentPlaySong'))
      this.songFileUrl = songObject.song_url
      this.songImageUrl = songObject.song_image
      this.$refs.audio.play()
    },
    menuSelect (index, indexPath) {
      // location.reload()
      window.localStorage.setItem('currentPath', index)
    }
  },
  mounted () {
    this.autoChangeFontSize()
    if (!this.isLogin) {
      this.$message({
        message: '必须先登陆才能进行操作哦!',
        showClose: true
      })
      this.$router.push('/login')
    }
    this.readyPlay()
    if (window.localStorage.getItem('currentPath') != null) {
      this.defaultActive = window.localStorage.getItem('currentPath')
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/style/font_music/iconfont.css';
  @import '../../assets/style/common.scss';
  .fit-index-box {
    width: 100%;
    height: px2rem(7.3px);
  }
  .title-box {
    width: 100%;
    height: px2rem(20px);
    background-color: #F0FFFF;
    border-bottom: solid px2rem(0.2px) #e6e6e6;
    .el-row {
      .el-col {
        height: px2rem(20px);
        line-height: px2rem(20px);
        vertical-align: middle;
        .menu-icon {
          margin-left: px2rem(7px);
          font-size: px2rem(12px);
          vertical-align: middle;
          color: #DC143C;
          text-shadow: px2rem(0.1px) px2rem(0.1px) px2rem(0.5px) #eb8d6b;
          font-weight: bold;
        }
        span {
          vertical-align: middle;
          margin-left: px2rem(4px);
          font-size: px2rem(7px);
          color: #409EFF;
          text-shadow: px2rem(0.1px) px2rem(0.1px) px2rem(0.3px) #409EFF;
          font-family: "黑体";
        }
      }
    }
  }

  .menu-box {
    width: 100%;
    height: px2rem(10px);
    background-color: #F0FFFF;
    border-bottom: solid px2rem(0.1px) #e6e6e6;
    .el-menu {
      width: 100%;
      height: px2rem(10px);
      text-align: center;
      .el-menu-item {
        width: px2rem(30px);
        line-height: px2rem(10px);
        height: px2rem(10px);
        font-size: px2rem(3.5px);
        font-family: "黑体";
      }
    }
  }

  .play-bar-box {
    z-index: 999;
    box-shadow: 0 px2rem(-0.1px) px2rem(0.5px) grey;
    transition: bottom 500ms;
    user-select: none;
    width: 100%;
    height: px2rem(15px);
    position: fixed;
    background-color: #e0FFFF;
    bottom: px2rem(0px);
    line-height: 0;
    .bar-col-div {
      margin-top: px2rem(3px);
      height: 100%;
      width: 100%;
      .play-button {
        margin-top: px2rem(0.6px);
      }
      // background-color: yellow;
      .image-slot {
        user-select: none;
        width: 100%;
        font-size: px2rem(6px);
      }
      img {
        margin-left: px2rem(-20px);
        margin-top: px2rem(-1.5px);
        border: px2rem(0.01px) dashed red;
        width: px2rem(12px);
        height: px2rem(12px);
      }
    }
    .audio {
      margin-left: px2rem(-3px);
      margin-top: px2rem(5px);
      width: px2rem(60px);
      height: px2rem(5px);
    }
  }
  .play-bar-box:hover {
    bottom: px2rem(0px);
  }
</style>

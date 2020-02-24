<template>
  <div class="front-box">
    <div class="menu-box">
      <el-row>
        <el-col :span="6">
          <i class="menu-icon iconfont icon-yinle animated flash infinite slower"></i>
          <span>易云音乐</span>
        </el-col>
        <el-col :span="18">
          <el-menu
            mode="horizontal"
            @select="menuSelect"
            router="router"
            :default-active="defaultActive"
            background-color="#F0FFFF"
            active-text-color="#409EFF">
            <el-menu-item index="/frontFindMusic">发现音乐</el-menu-item>
            <el-menu-item index="/frontMyMusic">我的音乐</el-menu-item>
            <el-menu-item index="/frontPersonal">个人信息</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <router-view></router-view>

    <div class="play-bar-box">
      <el-row type="flex" justify="center">
        <!-- <el-col :span="1">
          <div class="bar-col-div">
            <el-button class="play-button" v-if="isPlay" icon="el-icon-video-pause" circle @click="pauseMusic"></el-button>
            <el-button class="play-button" v-else icon="el-icon-video-play" circle @click="playMusic"></el-button>
          </div>
        </el-col> -->
        <el-col :span="3" :offset="2">
          <div class="bar-col-div">
            <img
            :src="songImageUrl"
            style="width: 100px; height: 100px"
             />
          </div>
        </el-col>
        <el-col :span="10">
          <audio loop="loop" ref="audio" :src="songFileUrl" class="audio" controls="controls" type="audio/mpeg"></audio>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'frontIndex',
  data () {
    return {
      userName: '',
      songFileUrl: '',
      songImageUrl: '',
      defaultActive: '/frontFindMusic'
    }
  },
  components: {
  },
  computed: {
    ...mapGetters(
      ['isLogin', 'user']
    )
  },
  methods: {
    ...mapMutations(
      ['saveLoginInfo', 'changeLoginState']
    ),
    readyPlay () {
      const songObject = JSON.parse(window.localStorage.getItem('currentPlaySong'))
      this.songFileUrl = songObject.song_url
      this.songImageUrl = songObject.song_image
      // this.$refs.audio.play()
    },
    menuSelect (index, indexPath) {
      window.localStorage.setItem('currentPath', index)
    },
    dropDownCommand (command) {
      if (command === 'logout') {
        this.$message({
          showClose: true,
          message: '已注销,2s后跳转到登陆页面'
        })
        setTimeout(() => {
          this.saveLoginInfo('')
          this.changeLoginState(false)
          this.$router.push('/login')
        }, 2000)
      }
    }
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
    if (window.localStorage.getItem('currentPath') != null) {
      this.defaultActive = window.localStorage.getItem('currentPath')
    }
    this.readyPlay()
    if (window.localStorage.getItem('currentPath') != null || window.localStorage.getItem('currentPath') !== '') {
      this.$router.push(window.localStorage.getItem('currentPath'))
    } else {
      this.$router.push('/frontFindMusic')
    }
    console.log(this.songImageUrl)
  }
}
</script>

<style lang="scss">
  @import '../../assets/style/font_music/iconfont.css';
  @import '../../assets/style/common.scss';
  .front-box {
    width: 100%;
    .el-menu {
      width: 100%;
      height: 100px;
      text-align: center;
      .el-menu-item {
        margin-left: 120px;
        width: 150px;
        line-height: 100px;
        height: 100%;
        font-size: 25px;
        font-family: "黑体";
      }
    }
  }
  .menu-box {
    width: 100%;
    height: 100px;
    background-color: #F0FFFF;
    border-bottom: solid 1px #e6e6e6;
    .el-row {
      .el-col {
        height: 100px;
        line-height: 100px;
        vertical-align: middle;
        .menu-icon {
          margin-left: 50px;
          font-size: 60px;
          vertical-align: middle;
          color: #DC143C;
          text-shadow: 1px 1px 5px #eb8d6b;
          font-weight: bold;
        }
        span {
          margin-left: 10px;
          font-size: 40px;
          color: #409EFF;
          text-shadow: 1px 1px 3px #409EFF;
          font-family: "黑体";
        }
      }
    }
  }
  .play-bar-box {
    z-index: 999;
    box-shadow: 0 -1px 10px #7FFF00;
    transition: bottom 500ms;
    user-select: none;
    width: 100%;
    height: 120px;
    position: fixed;
    background-color: red;
    bottom: -105px;
    line-height: 0;
    .bar-col-div {
      margin-top: 15px;
      height: 100%;
      width: 100%;
      .play-button {
        margin-top: 6px;
      }
      // background-color: yellow;
      .image-slot {
        user-select: none;
        width: 100%;
        font-size: 60px;
      }
    }
    .audio {
      margin-top: 40px;
    }
  }
  .play-bar-box:hover {
    bottom: 0px;
  }
</style>

<template>
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
          <el-image
            :src="songImageUrl"
            fit="fill"
            style="width: 50%; height: 85%">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </el-col>
      <el-col :span="10">
        <audio autoplay="autoplay" ref="audio" :src="songFileUrl" class="audio" controls="controls" type="audio/mpeg"></audio>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'playBarH',
  data () {
    return {
      isPlay: false,
      songFileUrl: '',
      songImageUrl: ''
    }
  },
  components: {},
  methods: {
    pauseMusic () {
      this.isPlay = false
    },
    playMusic () {
      this.isPlay = true
    }
  },
  mounted () {
    let songObject = JSON.parse(window.localStorage.getItem('currentPlaySong'))
    this.songFileUrl = songObject.song_url
    this.songImageUrl = songObject.song_image
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';
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

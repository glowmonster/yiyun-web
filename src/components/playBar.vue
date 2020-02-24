<template>
  <div class="play-bar-box">
    <el-row class="bar-row" type="flex" justify="center">
      <el-col :span="1">
        <div class="bar-col-div">
          <el-button icon="el-icon-caret-left" circle></el-button>
        </div>
      </el-col>

      <el-col :span="1">
        <div class="bar-col-div">
          <el-button v-if="isPlay" icon="el-icon-video-pause" circle @click="pauseMusic"></el-button>
          <el-button v-else icon="el-icon-video-play" circle @click="playMusic"></el-button>
        </div>
      </el-col>

      <el-col :span="1">
        <div class="bar-col-div">
          <el-button icon="el-icon-caret-right" circle></el-button>
        </div>
      </el-col>

      <el-col :span="1">
        <div class="bar-col-div">
          <!-- <el-image
            style="width: 100%; height: 100%"
            :src="url"
            :fit="fit">
          </el-image> -->
        </div>
      </el-col>

      <el-col :span="10">
        <div class="bar-col-div">
          <el-progress class="bar-progress" :percentage="100"></el-progress>
        </div>
      </el-col>

      <el-col :span="1">
        <div class="bar-col-div">
          <el-popover
            placement="top-start"
            title="音量"
            width="150"
            trigger="hover">
            <el-progress :percentage="voice">
            </el-progress>
            <div class="drag-voice-box">
              <i ref="dragVoice" :style="{left: dragVoiceLeft}" @click.once="dragVoiceClick" @mouseleave="dragVoiceLeave" @mouseup="dragVoiceUp" @mousemove.self="dragVoiceMove" @mousedown="dragVoiceDown" class="el-icon-pear drag-voice"></i>
            </div>
            <el-button slot="reference" icon="iconfont icon-voice" circle></el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      voice: 0,
      isPlay: false,
      dragVoiceDownX: 0,
      dragVoiceMoveX: 0,
      dragVoiceTempX: 0,
      dragVoiceLeft: '6px',
      isDown: false,
      dragVoiceLeftSize: 0
    }
  },
  components: {},
  methods: {
    pauseMusic () {
      this.isPlay = false
    },
    playMusic () {
      this.isPlay = true
    },
    dragVoiceClick (event) {
      // console.log(this.dragVoiceDownX)
      console.log(this.dragVoiceLeftSize)
    },
    dragVoiceDown (event) {
      this.dragVoiceDownX = event.clientX
      // console.log(event.offsetX)
      this.isDown = true
    },
    dragVoiceMove (event) {
      this.dragVoiceMoveX = event.clientX
      this.dragVoiceTempX = this.dragVoiceDownX
      if (this.dragVoiceDownX < this.dragVoiceMoveX && this.isDown && this.dragVoiceLeftSize < 99) {
        this.dragVoiceLeftSize = this.dragVoiceMoveX - this.dragVoiceDownX
        this.dragVoiceLeft = (this.dragVoiceMoveX - this.dragVoiceDownX + 10) + 'px'
        console.log(this.dragVoiceLeft)
        this.voice = this.dragVoiceLeftSize
      }
    },
    dragVoiceUp (event) {
      // this.dragVoiceMove()
      this.isDown = false
    },
    dragVoiceLeave () {
      this.isDown = false
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';
  .play-bar-box {
    width: 100%;
    height: px2rem(5px);
    position: fixed;
    background-color: red;
    /* 完成后将值改为0,测试用放在中间显而易见 */
    bottom: px2rem(10px);
    line-height: px2rem(0);
    .bar-row {
      margin-top: px2rem(0.2px);
      .bar-col-div:nth-child(odd) {
      }
      .bar-col-div {
        height: 75%;
        line-height: px2rem(0px);
        .bar-progress {
          height: 10%;
          margin-top: px2rem(-1px);
        }
      }
    }
  }
  .drag-voice {
    display: inline-block;
    height: 14px;
    width: 14px;
    position: absolute;
    /* left: 6px; */
  }
  .drag-voice-box {
    width: 100px;
    height: 10px;
    background-color: yellow;
  }
</style>

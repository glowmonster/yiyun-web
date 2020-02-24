<template>
  <div class="test-bar-box">
    <!-- <playBar></playBar> -->
    <playBarH></playBarH>
  </div>
</template>

<script>
import playBar from '@/components/playBar'
import playBarH from '@/components/playBarH'
export default {
  name: 'testbar',
  data () {
    return {}
  },
  components: {
    playBar,
    playBarH
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
    }
  },
  mounted () {
    this.autoChangeFontSize()
  }
}
</script>

<style lang="scss">
  @import '../assets/style/font_music/iconfont.css';
  @import '../assets/style/common.scss';
  .test-bar-box {
    width: 100%;
    height: 100%;
    // background: grey;
  }
</style>

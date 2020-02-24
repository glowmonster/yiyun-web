<template>
  <div class="b-box animated fadeInLeft faster">
    <i class="iconfont icon-yinle animated fadeInRight"></i>
    <span class="b-title animated fadeInRight">欢迎回来</span>
  </div>
</template>

<script>
export default {
  name: 'loginTitle',
  data () {
    return {
    }
  },
  components: {},
  methods: {}
}
</script>

<style lang="scss">
  @import '../assets/style/font_music/iconfont.css';
  @import '../assets/style/common.scss';
  .b-box {
    width: 100%;
    height: px2rem(7px);
    background-color: #FF6347;
    box-shadow: 0 px2rem(0.2px) px2rem(1px) #2F4F4F;
    user-select: none;
    i {
      display: inline-block;
      height: 100%;
      line-height: 100%;
      vertical-align: middle;
      font-size: px2rem(5px);
      color: #FFFFFF;
      padding-left: px2rem(3px);
      font-weight: bold;
      text-shadow: px2rem(0.1px) px2rem(0.1px) px2rem(0.7px) #FFFFFF;
    }

    .b-user {
      display: inline-block;
      color: white;
      font-size: px2rem(1.5px);
      line-height: 100%;
      height: 50%;
      vertical-align: middle;
      padding-top: px2rem(0px);
      /* sliver: #C0C0C0 */
      text-shadow: px2rem(0.1px) px2rem(0.1px) px2rem(0.7px) #FFFFFF;
      span {
        cursor: pointer;
      }
    }
    .b-title {
      width: 75%;
      display: inline-block;
      color: white;
      font-size: px2rem(2.5px);
      line-height: 100%;
      height: 100%;
      vertical-align: middle;
      padding-top: px2rem(1px);
      text-shadow: px2rem(0.1px) px2rem(0.1px) px2rem(0.7px) #FFFFFF;

    }
  }
</style>

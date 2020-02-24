<template>
  <div class="b-h-box">
    <span>欢迎来到易云音乐平台后台管理</span>
    <el-button class="b-h-button" @click="toFront" type="primary">转到前台首页</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {},
  methods: {
    toFront () {
      this.$router.push('/frontIndex')
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';
  .b-h-box {
    width: 100%;
    height: 100%;
    text-align: center;
    span {
      display: inline-block;
      width: 100%;
      height: 50%;
      line-height: px2rem(30px);
      vertical-align: middle;
    }
    .b-h-button {
      font-family: "黑体";
      height: px2rem(3.5px);
      line-height: 10px;
      span {
        line-height: px2rem(1px);
      }
    }
  }
</style>

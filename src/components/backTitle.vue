<template>
  <div class="b-box animated fadeInLeft faster">
    <i class="iconfont icon-yinle animated fadeInRight"></i>
    <span class="b-title animated fadeInRight">易云音乐平台后台管理</span>
    <span class="b-user animated fadeInDown">欢迎回来,</span>
    <el-dropdown @command="dropDownCommand" class="b-user animated fadeInDown">
      <span>
        {{user.user_name}}
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'backTitle',
  data () {
    return {
      userName: 'admin'
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
  }
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
      padding-top: px2rem(2px);
      /* sliver: #C0C0C0 */
      text-shadow: px2rem(0.1px) px2rem(0.1px) px2rem(0.7px) #FFFFFF;
    }
  }
</style>

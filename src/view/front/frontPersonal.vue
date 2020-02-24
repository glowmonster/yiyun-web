<template>
  <div class="f-personal-box">
    <el-card shadow="always" class="f-personal-card">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-image
            style="width: 300px; height: 300px"
            :src="user.user_avatar_url"
            lazy
            fit="fill">
          </el-image>
        </el-col>
        <el-col :span="12" class="list-name-col">
          <span class="user-infor-span">用户名: <b>{{user.user_account}}</b></span>
          <el-row>
            <el-col :span="24">
              <span class="user-infor-span">用户昵称: <b>{{user.user_name}}</b></span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span class="user-infor-span">个人介绍: <b>{{user.user_describes}}</b></span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-button type="primary" @click="updateUser">编辑</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="danger" @click="logout">注销</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// import axios from 'axios'
import {mapGetters, mapMutations} from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(
      ['isLogin', 'user']
    )
  },
  components: {},
  methods: {
    ...mapMutations(
      ['saveLoginInfo', 'changeLoginState']
    ),
    updateUser () {},
    logout () {
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
  },
  mounted () {
    console.log(this.user)
  }
}
</script>

<style lang="scss">
  @import '../../assets/style/common.scss';
  .f-personal-box {
   font-family: "黑体";
   width: 100%;
   height: 100%;
   .f-personal-card {
     width: 60%;
     margin: 0 auto;
     margin-top: 100px;
   }
   .el-row {
     margin-top: 30px;
   }
   .list-name-col {
     margin-top: 15px;
   }
   .user-infor-span {
     font-size: 24px;
   }
  }
</style>

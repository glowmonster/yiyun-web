<template>
  <div class="b-l-box">
    <loginTitle></loginTitle>
    <div class="login-box">
      <el-form class="animated bounceIn" :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item label="用户名" prop="user_account">
          <el-input v-model="loginForm.user_account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="user_password">
          <el-input show-password v-model="loginForm.user_password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLogin('loginForm')" round>登陆</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="resetLogin('loginForm')" round>重置输入框</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
import loginTitle from '@/components/loginTitle'
export default {
  data () {
    var checkAccount = (rule, value, callback) => {
      if (value.length < 5 || value.length > 15) {
        return callback(new Error('账号名长度在5~15位'))
      } else {
        callback()
      }
    }
    return {
      action: {
        login: 'yiyun/user/login'
      },
      loginForm: {
        user_account: '',
        user_password: ''
      },
      loginRules: {
        user_account: [
          {
            required: true, message: '请输入登录名', trigger: 'blur'
          },
          {
            validator: checkAccount, trigger: 'change'
          }
        ],
        user_password: [
          {
            required: true, message: '请输入密码', trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {
    loginTitle
  },
  mounted () {
    this.autoChangeFontSize()
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
    submitLogin (loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: this.action.login,
            params: {
              user_account: this.loginForm.user_account,
              user_password: this.loginForm.user_password
            }
          }).then((res) => {
            console.log(res)
            let tempType
            if (res.data.resultCode === 0) {
              tempType = 'success'
            } else {
              tempType = 'warning'
            }
            let user = res.data.data
            if (user != null) {
              console.log(user)
              this.$message({
                message: '登陆成功,2s后跳转到首页',
                type: tempType,
                showClose: true
              })
              this.saveLoginInfo(user)
              this.changeLoginState(1)
              setTimeout(() => {
                this.$router.push('/')
              }, 2000)
            } else {
              console.log(user)
              this.$message({
                message: res.data.message,
                type: tempType,
                showClose: true
              })
            }
          }).catch((res) => {
            this.$message({
              message: '服务器连接失败,服务器可能未启动',
              type: 'error',
              showClose: true
            })
          })
        } else {
          this.$message({
            message: '请输入正确的用户名和密码!',
            type: 'warning',
            showClose: true
          })
        }
      })
    },
    resetLogin (loginForm) {
      this.$refs[loginForm].resetFields()
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';
  .b-l-box {
    height: 100%;
    width: 100%;
    user-select: none;
  }
  .login-box {
    width: 30%;
    height: 60%;
    margin: 0 auto;
    margin-top: px2rem(8px);
    .el-form-item {
      margin-top: px2rem(2px);
      width: 100%;
      text-align: center;
      label {
        font-size: px2rem(1.5px);
        font-weight: bold;
      }
      .el-button {
        font-weight: 500;
        width: 95%;
        height: px2rem(3.5px);
        font-size: px2rem(1.3px);
        box-shadow: px2rem(0.1px) px2rem(0.1px) px2rem(0.9px) #20B2AA;
      }
    }
  }
</style>

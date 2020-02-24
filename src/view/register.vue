<template>
  <div class="b-r-box">
    <registerTitle></registerTitle>
    <div class="register-box">
      <el-form class="register-form animated bounceIn" :model="registerForm" :rules="registerRules" ref="registerForm">
        <el-form-item label="头像" prop="user_avatar_url">
          <el-upload
            class="avatar-upload-box"
            :action="action.uploadAvatarFile"
            :show-file-list="false"
            :on-success="avatarUploadSuccess"
            :before-upload="beforeAvatarUpload"
            accept="image/jpeg"
          >
            <img v-if="registerForm.user_avatar_url" :src="registerForm.user_avatar_url" class="avatar-image">
            <i v-else class="el-icon-plus avatar-upload-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="登陆名" prop="user_account">
          <el-input maxlength="15" v-model="registerForm.user_account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="user_password">
          <el-input maxlength="15" v-model="registerForm.user_password" show-password></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="user_name">
          <el-input maxlength="10" v-model="registerForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍" prop="user_describes">
          <el-input v-model="registerForm.user_describes" show-word-limit maxlength="25" placeholder="简单介绍一下你自己"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitRegister('registerForm')" round>注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="resetRegister('registerForm')" round>重置输入框</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import registerTitle from '@/components/registerTitle'
export default {
  data () {
    var checkAccount = (rule, value, callback) => {
      if (value.length < 5 || value.length > 15) {
        return callback(new Error('账号名长度在5~15位'))
      } else {
        callback()
      }
    }
    var checkName = (rule, value, callback) => {
      if (value.length < 5 || value.length > 10) {
        return callback(new Error('昵称长度在5~10位'))
      } else {
        callback()
      }
    }
    return {
      action: {
        uploadAvatarFile: 'yiyun/user/uploadUserAvatarFile',
        register: 'yiyun/user/register'
      },
      registerForm: {
        user_avatar_url: '',
        user_account: '',
        user_password: '',
        user_name: '',
        user_describes: ''
      },
      registerRules: {
        user_avatar_url: [
          {
            required: true, message: '请上传头像', trigger: 'blur'
          }
        ],
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
        ],
        user_name: [
          {
            required: true, message: '请输入昵称', trigger: 'blur'
          },
          {
            validator: checkName, trigger: 'change'
          }
        ]
      }
    }
  },
  components: {
    registerTitle
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
    },
    avatarUploadSuccess (res, file) {
      this.registerForm.user_avatar_url = URL.createObjectURL(file.raw)
      // console.log(this.registerForm.user_avatar_url)
      // console.log(file.raw)
    },
    // 对上传的文件进行限制
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLessThan2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.warning('上传的头像只能是JPG格式')
      }
      if (!isLessThan2M) {
        this.$message.warning('上传的文件不能大于2M')
      }
    },
    resetRegister (registerForm) {
      console.log(this.registerForm.user_avatar_url)
      this.$refs[registerForm].resetFields()
      console.log(this.registerForm.user_avatar_url)
    },
    submitRegister (registerForm) {
      this.$refs[registerForm].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: this.action.register,
            params: {
              user_account: this.registerForm.user_account,
              user_name: this.registerForm.user_name,
              user_password: this.registerForm.user_password,
              user_describes: this.registerForm.user_describes
            }
          }).then((res) => {
            let tempType
            if (res.data.resultCode === 0) {
              tempType = 'success'
            } else {
              tempType = 'error'
            }
            this.$message({
              message: res.data.message,
              type: tempType,
              showClose: true
            })
            if (res.data.resultCode === 0) {
              setTimeout(() => {
                this.$router.push('/login')
              }, 1000)
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
            message: '请输入正确的注册信息!',
            type: 'warning',
            showClose: true
          })
        }
      })
    }
  },
  mounted () {
    this.autoChangeFontSize()
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';
  .b-r-box {
    height: 100%;
    width: 100%;
    user-select: none;
    .register-box {
      width: 30%;
      height: 60%;
      margin: 0 auto;
      margin-top: px2rem(4px);
      .avatar-upload-box {
        .el-upload {
          border: px2rem(0.2px) dashed #d9d9d9;
          border-radius: px2rem(2px);
          width: px2rem(10px);
          height: px2rem(10px);
        }
      }
      .avatar-image {
        width: px2rem(10px);
        height: px2rem(10px);
        border-radius: px2rem(2px);
      }
      .avatar-upload-icon {
        width: px2rem(10px);
        height: px2rem(10px);
        line-height: px2rem(10px);
        font-size: px2rem(3px);
        color: #d9d9d9;
      }
      .register-form {
        .el-button {
          font-weight: 500;
          width: 95%;
          height: px2rem(3.5px);
          font-size: px2rem(1.3px);
          box-shadow: px2rem(0.1px) px2rem(0.1px) px2rem(0.9px) #20B2AA;
        }
        .el-form-item {
          margin-top: px2rem(2px);
          width: 100%;
          text-align: center;
          label {
            font-size: px2rem(1.2px);
            font-weight: bold;
          }
        }
      }
    }
  }
</style>

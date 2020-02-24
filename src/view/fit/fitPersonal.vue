<template>
  <div class="f-personal-box">
    <el-card shadow="always" class="f-personal-card">
      <el-row type="flex" justify="center">
        <el-col :span="21">
          <el-image
            :src="user.user_avatar_url"
            lazy
            fit="fill">
          </el-image>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="20" class="list-name-col">
          <span class="user-infor-span">用户名: <br /><b>{{user.user_account}}</b></span>
          <el-row>
            <el-col :span="24">
              <span class="user-infor-span">用户昵称: <br /><b>{{user.user_name}}</b></span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span class="user-infor-span">个人介绍: <br /><b>{{user.user_describes}}</b></span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-popover
                placement="top"
                trigger="click">
                <el-form :model="userUpdateForm" :rules="userUpdateFormRules" ref="userUpdateForm">
                  <el-form-item label="用户昵称" prop="user_name">
                    <el-input v-model="userUpdateForm.user_name"></el-input>
                  </el-form-item>
                  <el-form-item label="用户描述" prop="user_describes">
                    <el-input v-model="userUpdateForm.user_describes"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitUpdateForm('userUpdateForm')">提交</el-button>
                  </el-form-item>
                </el-form>
                <el-button slot="reference" type="primary">编辑</el-button>
              </el-popover>
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
import axios from 'axios'
import {mapGetters, mapMutations} from 'vuex'
export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (value.length < 5 || value.length > 10) {
        return callback(new Error('昵称长度在5~10位'))
      } else {
        callback()
      }
    }
    return {
      action: {
        updateUser: 'yiyun/user/updateUser'
      },
      userUpdateForm: {
        user_name: '',
        user_describes: ''
      },
      userUpdateFormRules: {
        user_name: [
          {
            validator: checkName, trigger: 'change'
          }
        ]
      }
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
    submitUpdateForm (updateForm) {
      this.$refs[updateForm].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: this.action.updateUser,
            params: {
              user_id: this.user.user_id,
              user_name: this.userUpdateForm.user_name,
              user_describes: this.userUpdateForm.user_describes
            }
          }).then((res) => {
            this.saveLoginInfo(this.userUpdateForm)
            console.log(this.userUpdateForm)
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
    },
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
    this.userUpdateForm = this.user
    console.log(this.userUpdateForm)
  }
}
</script>

<style lang="scss">
  @import '../../assets/style/common.scss';
  .f-personal-box {
    font-family: "黑体";
    width: 100%;
    height: px2rem(150px);
    .f-personal-card {
      width: 60%;
      margin: 0 auto;
      margin-top: px2rem(15px);
    }
    .el-row {
      margin-top: px2rem(5px);
      .el-col {
        .el-image {
          width: px2rem(50px);
          height: px2rem(50px);
        }
      }
    }
    .list-name-col {
      margin-top: px2rem(5px);
    }
    .user-infor-span {
      font-size: px2rem(5px);
    }

    .el-card {
      margin-bottom: px2rem(40px);
    }
    .updateLittleBox {
      // width: px2rem(20px);
      // height: px2rem(2px);
    }
  }
  .el-popover {
    width: px2rem(50px);
    .el-form {
      width: 100%;
    }
  }
</style>

<template>
  <div class="b-l-l-box">
    <el-row type="flex" justify="center">
      <el-col :span="8" :offset="1">
        <el-input v-model="userAccountSearch" placeholder="请输入用户名"></el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" icon="el-icon-search" round @click="searchLoginLog">搜索</el-button>
      </el-col>
    </el-row>
    <el-table
      stripe
      border
      :data="loginLogs"
      class="b-table">
      <el-table-column
        label="日志编号" show-overflow-tooltip
        width="120">
        <template slot-scope="scope">{{ scope.row.login_log_id }}</template>
      </el-table-column>
      <el-table-column
        label="登陆账户名" show-overflow-tooltip
        width="400">
        <template slot-scope="scope">{{ scope.row.user_account }}</template>
      </el-table-column>
      <el-table-column
        label="登陆时间" show-overflow-tooltip
        width="250">
        <template slot-scope="scope">{{ scope.row.login_time | dateFormat }}</template>
      </el-table-column>
      <el-table-column
        label="登陆状态" show-overflow-tooltip
        width="200">
        <template slot-scope="scope">{{ scope.row.state | loginLogState }}</template>
      </el-table-column>
      <el-table-column
        label="登陆ip" show-overflow-tooltip
        width="210">
        <template slot-scope="scope">{{ scope.row.request_ip }}</template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-pagination
          @size-change="songsTableSizeChange"
          @current-change="songsTableCurrentChange"
          :current-page="curr_page"
          :page-sizes="[10, 50, 100, 500]"
          :page-size="page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loginLogs: [],
      action: {
        selectAllLoginLogByUserAccount: 'yiyun/loginLog/selectAllLoginLogByUserAccount'
      },
      userAccountSearch: '',
      curr_page: 1,
      page_size: 10,
      total: 0
    }
  },
  components: {},
  methods: {
    songsTableSizeChange (pageSize) {
      this.selectAllLoginLogByUserAccount(this.curr_page, pageSize, this.userAccountSearch)
    },
    songsTableCurrentChange (currPage) {
      this.selectAllLoginLogByUserAccount(currPage, this.page_size, this.userAccountSearch)
    },
    searchLoginLog () {
      this.selectAllLoginLogByUserAccount(this.curr_page, this.page_size, this.userAccountSearch)
    },
    selectAllLoginLogByUserAccount (curr_page = 1, page_size = 10, userAccount = '') {
      axios({
        method: 'get',
        url: this.action.selectAllLoginLogByUserAccount,
        params: {
          curr_page: curr_page,
          page_size: page_size,
          user_account: userAccount
        }
      }).then((res) => {
        this.loginLogs = res.data.data.list
        this.total = res.data.data.total
        this.curr_page = res.data.data.pageNum
        this.page_size = res.data.data.pageSize
        console.log(res)
      }).catch((res) => {
        this.$message({
          message: '服务器连接失败,服务器可能未启动',
          type: 'error',
          showClose: true
        })
      })
    }
  },
  mounted () {
    this.selectAllLoginLogByUserAccount()
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';
  .b-l-l-box {
    width: 100%;
    height: 100%;
    .b-table {
      width: 100%;
      margin-top: px2rem(1px);
    }
  }
</style>

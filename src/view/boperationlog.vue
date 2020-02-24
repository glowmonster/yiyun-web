<template>
  <div class="b-o-l-box">
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
      :data="operationLogs"
      class="b-table">
      <el-table-column
        label="日志编号" show-overflow-tooltip
        width="80">
        <template slot-scope="scope">{{ scope.row.operation_log_id }}</template>
      </el-table-column>
      <el-table-column
        label="操作账户名" show-overflow-tooltip
        width="120">
        <template slot-scope="scope">{{ scope.row.user_account }}</template>
      </el-table-column>
      <el-table-column
        label="操作用户名" show-overflow-tooltip
        width="120">
        <template slot-scope="scope">{{ scope.row.user_account }}</template>
      </el-table-column>
      <el-table-column
        label="操作时间" show-overflow-tooltip
        width="200">
        <template slot-scope="scope">{{ scope.row.operation_time | dateFormat }}</template>
      </el-table-column>
      <el-table-column
        label="操作ip" show-overflow-tooltip
        width="150">
        <template slot-scope="scope">{{ scope.row.request_ip }}</template>
      </el-table-column>
      <el-table-column
        label="操作调用的方法" show-overflow-tooltip
        width="210">
        <template slot-scope="scope">{{ scope.row.request_method }}</template>
      </el-table-column>
      <el-table-column
        label="操作描述" show-overflow-tooltip
        width="170">
        <template slot-scope="scope">{{ scope.row.operation_describe }}</template>
      </el-table-column>
      <el-table-column
        label="操作类型" show-overflow-tooltip
        width="120">
        <template slot-scope="scope">{{ scope.row.operation_type }}</template>
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
      action: {
        selectAllOperationLogByUserAccount: 'yiyun/operationLog/selectAllOperationLogByUserAccount'
      },
      curr_page: 1,
      page_size: 10,
      total: 0,
      userAccountSearch: '',
      operationLogs: []
    }
  },
  components: {},
  methods: {
    selectAllOperationLogByUserAccount (curr_page = 1, page_size = 10, userAccount = '') {
      axios({
        method: 'get',
        url: this.action.selectAllOperationLogByUserAccount,
        params: {
          curr_page: curr_page,
          page_size: page_size,
          user_account: userAccount
        }
      }).then((res) => {
        this.operationLogs = res.data.data.list
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
    },
    songsTableSizeChange (pageSize) {
      this.selectAllOperationLogByUserAccount(this.curr_page, pageSize, this.userAccountSearch)
    },
    songsTableCurrentChange (currPage) {
      this.selectAllOperationLogByUserAccount(currPage, this.page_size, this.userAccountSearch)
    },
    searchLoginLog () {
      this.selectAllOperationLogByUserAccount(this.curr_page, this.page_size, this.userAccountSearch)
    }
  },
  mounted () {
    this.selectAllOperationLogByUserAccount()
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';
  .b-o-l-box {
    width: 100%;
    height: 100%;
    .b-table {
      width: 100%;
      margin-top: px2rem(1px);
    }
  }
</style>

<template>
  <div class="b-s-s-box">
    <el-row type="flex" justify="left" :gutter="5">
      <el-col :span="2">
        <el-button type="primary" @click="openAddDrawer">新增风格</el-button>
      </el-col>
      <el-col :span="5" :offset="6">
        <el-input v-model="songStyleSearch" placeholder="请输入风格名"></el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" icon="el-icon-search" round @click="searchStyle">搜索</el-button>
      </el-col>
      <el-col :span="2" :offset="5">
        <el-button type="danger" @click="batchDelete" :disabled="canBatchDelete">批量删除</el-button>
      </el-col>
    </el-row>
    <el-table
      stripe
      border
      :data="styles"
      @selection-change="selectionChange"
      class="b-table">
      <el-table-column
        type="selection"
        width="60">
      </el-table-column>
      <el-table-column
        label="歌曲风格id"
        width="150">
        <template slot-scope="scope">{{ scope.row.style_id }}</template>
      </el-table-column>
      <el-table-column
        label="歌曲风格名称"
        width="250">
        <template slot-scope="scope">{{ scope.row.style_name }}</template>
      </el-table-column>
      <el-table-column
        label="风格创建日期"
        width="250">
        <template slot-scope="scope">{{ scope.row.style_create_time | dateFormat }}</template>
      </el-table-column>
      <el-table-column
        label="风格修改日期"
        width="250">
        <template slot-scope="scope">{{ scope.row.style_update_time | dateFormat }}</template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <!-- editStyle(scope.$index, scope.row) -->
          <el-button type="primary" @click="openUpdateDrawer(scope.$index, scope.row, scope)">修改</el-button>
          <el-button type="warning" @click="singleDeleteStyle(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-pagination
          @size-change="styleTableSizeChange"
          @current-change="styleTableCurrentChange"
          :current-page="styleTableCurrentPage"
          :page-sizes="[10, 50, 100, 500]"
          :page-size="styleTablePageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>

    <!-- 添加歌曲风格 -->
    <el-drawer
      title="添加风格"
      :visible.sync="addDrawerIsVisible"
      direction="ltr"
      size="40%"
      >
      <div class="add-drawer-box">
        <el-form :model="styleForm" :rules="styleRules" ref="styleForm">
          <el-form-item label="风格名称" prop="style_name">
            <el-input v-model="styleForm.style_name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="add-drawer-button" type="primary" @click="submitStyleForm('styleForm')" round>确 定</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" class="add-drawer-button" @click="cancelAddDrawer('styleForm')" round>取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <!-- 修改歌曲风格 -->
    <el-drawer
      title="修改风格"
      :visible.sync="updateDrawerIsVisible"
      direction="ltr"
      size="40%"
      >
      <div class="add-drawer-box">
        <el-form :model="styleForm" :rules="styleRules" ref="styleForm">
          <el-form-item label="风格名称" prop="style_name">
            <el-input v-model="styleForm.style_name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="add-drawer-button" type="primary" @click="submitUpdateStyleForm('styleForm')" round>确 定</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" class="add-drawer-button" @click="cancelAddDrawer('styleForm')" round>取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      canBatchDelete: true,
      tableSelected: [],
      status: '',
      action: {
        insertStyle: 'yiyun/style/insertStyle',
        selectAllStyle: 'yiyun/style/selectAllStyle',
        deleteStyle: 'yiyun/style/deleteStyle',
        updateStyle: 'yiyun/style/updateStyle'
      },
      songStyleSearch: '',
      addDrawerIsVisible: false,
      updateDrawerIsVisible: false,
      style_ids: '',
      styles: [],
      styleTableCurrentPage: 1,
      styleTablePageSize: 10,
      total: 0,
      styleForm: {
        style_id: '',
        style_name: '',
        style_version: ''
      },
      styleRules: {
        style_name: [
          {
            required: true, message: '请输入风格名称', trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {},
  methods: {
    batchDelete () {
    },
    searchStyle () {
      this.selectAllStyle(this.songStyleSearch, this.styleTableCurrentPage, this.styleTablePageSize)
    },
    openUpdateDrawer (index, row, scope) {
      this.updateDrawerIsVisible = true
      // console.log(scope)
      console.log(row)
      this.styleForm.style_name = row.style_name
      this.styleForm.style_id = row.style_id
      this.styleForm.style_version = row.style_version
    },
    singleDeleteStyle (index, row) {
      this.$confirm('您正在删除一条歌曲风格id为' + row.style_id + '的数据,是否继续?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '我再想想'
      }).then(() => {
        axios({
          method: 'post',
          url: this.action.deleteStyle,
          params: {
            style_ids: row.style_id
          }
        }).then((res) => {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          this.selectAllStyle()
        }).catch((res) => {
          this.$message({
            message: '服务器连接失败,服务器可能未启动',
            type: 'error',
            showClose: true
          })
        })
      })
    },
    submitUpdateStyleForm (styleForm) {
      console.log('ss')
      this.$refs[styleForm].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: this.action.updateStyle,
            params: {
              style_id: this.styleForm.style_id,
              style_name: this.styleForm.style_name,
              style_version: this.styleForm.style_version
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
            this.selectAllStyle(this.songStyleSearch, this.styleTableCurrentPage, this.styleTablePageSize)
          }).catch((res) => {
            this.$message({
              message: '服务器连接失败,服务器可能未启动',
              type: 'error',
              showClose: true
            })
          })
          this.$refs[styleForm].resetFields()
          this.updateDrawerIsVisible = false
        } else {
          this.$message({
            message: '请完成需要的数据!',
            type: 'warning',
            showClose: true
          })
        }
      })
    },
    selectAllStyle (style_name = '', curr_page = 1, page_size = 10) {
      axios({
        method: 'get',
        url: this.action.selectAllStyle,
        params: {
          curr_page: curr_page,
          page_size: page_size,
          style_name: style_name
        }
      }).then((res) => {
        console.log(res)
        this.styles = res.data.data.list
        this.total = res.data.data.total
        this.styleTableCurrentPage = res.data.data.pageNum
        // this.styleTablePageSize = res.data.data.pageSize
      }).catch((res) => {
        this.$message({
          message: '服务器连接失败,服务器可能未启动',
          type: 'error',
          showClose: true
        })
      })
    },
    openAddDrawer () {
      this.addDrawerIsVisible = true
    },
    styleTableSizeChange (pageSize) {
      this.selectAllStyle(this.songStyleSearch, this.styleTableCurrentPage, pageSize)
    },
    styleTableCurrentChange (currPage) {
      this.selectAllStyle(this.songStyleSearch, currPage, this.styleTablePageSize)
    },
    selectionChange (value) {
      this.tableSelected = value
      if (this.tableSelected.length === 0) {
        this.canBatchDelete = true
      } else {
        this.canBatchDelete = false
      }
    },
    submitStyleForm (styleForm) {
      this.$refs[styleForm].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: this.action.insertStyle,
            params: {
              style_name: this.styleForm.style_name
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
            this.selectAllStyle(this.songStyleSearch, this.styleTableCurrentPage, this.styleTablePageSize)
          }).catch((res) => {
            this.$message({
              message: '服务器连接失败,服务器可能未启动',
              type: 'error',
              showClose: true
            })
          })
          this.$refs[styleForm].resetFields()
          this.addDrawerIsVisible = false
        } else {
          this.$message({
            message: '请完成需要的数据!',
            type: 'warning',
            showClose: true
          })
        }
      })
    },
    cancelAddDrawer (styleForm) {
      this.$refs[styleForm].resetFields()
      this.addDrawerIsVisible = false
      this.updateDrawerIsVisible = false
    }
  },
  mounted () {
    this.selectAllStyle()
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';
  .b-s-s-box {
    .b-table {
      width: 100%;
      margin-top: px2rem(1px);
    }
    .add-drawer-box {
      width: 70%;
      margin: 0 auto;
      .el-form-item {
        margin-top: px2rem(5px);
        width: 100%;
        text-align: center;
      }
      .add-drawer-button {
        width: 100%;
      }
    }
  }
</style>

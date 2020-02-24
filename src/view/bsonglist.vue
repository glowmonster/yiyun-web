<template>
  <div class="b-s-l-box">
    <el-row type="flex" justify="left" :gutter="5">
      <el-col :span="2">
        <el-button type="primary" @click="openAddDrawer">新增歌单</el-button>
      </el-col>
      <el-col :span="5" :offset="12">
        <el-input v-model="songListNameSearch" placeholder="请输入歌单名"></el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" icon="el-icon-search" round @click="searchSongList">搜索</el-button>
      </el-col>
    </el-row>
    <el-table
      stripe
      border
      :data="songList"
      @selection-change="selectionChange"
      class="b-table">
      <el-table-column
        type="selection"
        width="60">
      </el-table-column>
      <el-table-column
        label="歌单编号" show-overflow-tooltip
        width="200">
        <template slot-scope="scope">{{ scope.row.list_id }}</template>
      </el-table-column>
      <el-table-column
        label="歌单名称" show-overflow-tooltip
        width="250">
        <template slot-scope="scope">{{ scope.row.list_name }}</template>
      </el-table-column>
      <el-table-column
        label="歌单图片地址" show-overflow-tooltip
        width="200">
        <template slot-scope="scope">{{ scope.row.list_image }}</template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="450">
        <template slot-scope="scope">
          <el-button type="info" plain @click="showSongListInformation(scope.row)">查看歌单信息</el-button>
          <el-popover
            placement="top"
            width="120"
            trigger="click">
            <el-select v-model="otherSelectValue" placeholder="请选择">
              <el-option
                v-for="item in otherSongOption"
                :key="item.song_id"
                :label="item.song_name"
                :value="item.song_id">
              </el-option>
            </el-select>
            <el-button type="primary" size="mini" @click="addSongIdToSongList(scope.row)">确定</el-button>
            <el-button type="primary" plain slot="reference" @click="selectAllOtherSong(scope.row)">添加歌曲</el-button>
          </el-popover>
          <el-button type="primary" @click="showUpdateDrawer(scope.row)">修改</el-button>
          <el-button type="warning" @click="deleteSongList(scope.row)">删除</el-button>
        </template>
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

    <!-- 添加歌单 -->
    <el-drawer
      title="添加歌单"
      :visible.sync="addDrawerIsVisible"
      direction="ltr"
      size="40%"
      ref="addDrawer"
      >
      <div class="add-drawer-box">
        <el-form :model="songListForm" :rules="songListRules" ref="songListForm">
          <el-form-item label="歌单图像" prop="list_image">
            <el-upload
              class="song-upload-box"
              :action="action.songListImageUpload"
              :show-file-list="false"
              :on-success="songImageUploadSuccess"
              :before-upload="beforeSongImageUpload"
              :on-error="songImageUploadFailed"
              accept="image/jpeg">
              <img v-if="songListForm.list_image" :src="songListForm.list_image" class="song-image">
              <i v-else class="el-icon-plus song-upload-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="歌单名称" prop="list_name">
            <el-input v-model="songListForm.list_name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="add-drawer-button" type="primary" @click="submitSongListForm('songListForm')" round>确 定</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" class="add-drawer-button" @click="cancelAddDrawer('songListForm')" round>取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <!-- 修改歌单 -->
    <el-drawer
      title="修改歌单"
      :visible.sync="updateDrawerIsVisible"
      direction="ltr"
      size="40%"
      ref="addDrawer"
      >
      <div class="add-drawer-box">
        <el-form :model="updateSongListForm" :rules="songListRules" ref="updateSongListForm">
          <el-form-item label="歌单名称" prop="list_name">
            <el-input v-model="updateSongListForm.list_name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="add-drawer-button" type="primary" @click="submitUpdateSongListForm('updateSongListForm')" round>确 定</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" class="add-drawer-button" @click="cancelAddDrawer('updateSongListForm')" round>取 消</el-button>
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
      action: {
        addSongList: 'yiyun/songList/addSongList',
        selectSongList: 'yiyun/songList/selectSongList',
        updateSongList: 'yiyun/songList/updateSongList',
        selectAllSong: 'yiyun/song/selectAllSong',
        selectAllOtherSong: 'yiyun/song/selectOtherAllSong',
        updateSongIds: 'yiyun/songList/updateSongIds',
        deleteSongList: 'yiyun/songList/deleteSongList',
        songListImageUpload: 'yiyun/songList/songListImageUpload'
      },
      songListNameSearch: '',
      songList: [],
      curr_page: 1,
      page_size: 10,
      total: 0,
      addDrawerIsVisible: false,
      songListForm: {
        list_name: '',
        list_image: ''
      },
      songListRules: {
        list_name: [
          {
            required: true, message: '请输入歌单名称', trigger: 'blur'
          }
        ],
        list_image: [
          {
            required: true, message: '请上传歌单图片', trigger: 'blur'
          }
        ]
      },
      updateDrawerIsVisible: false,
      updateSongListForm: {
        list_id: '',
        list_version: '',
        list_name: ''
      },
      otherSongOption: [],
      otherSelectValue: '',
      updateSongIds: ''
    }
  },
  components: {},
  methods: {
    songImageUploadSuccess (res, file) {
      this.songListForm.list_image = URL.createObjectURL(file.raw)
    },
    beforeSongImageUpload () {},
    songImageUploadFailed () {},
    deleteSongList (row) {
      axios({
        method: 'post',
        url: this.action.deleteSongList,
        params: {
          list_id: row.list_id
        }
      }).then((res) => {
        this.otherSongOption = res.data.data
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
        this.selectSongList(this.songListNameSearch, this.curr_page, this.page_size)
      }).catch((res) => {
        this.$message({
          message: '服务器连接失败,服务器可能未启动',
          type: 'error',
          showClose: true
        })
      })
    },
    addSongIdToSongList (row) {
      this.updateSongIds = row.song_ids
      console.log(this.updateSongIds)
      if (this.updateSongIds != null || this.updateSongIds !== '') {
        console.log('song_id不为空')
        this.updateSongIds += ',' + this.otherSelectValue
      } else {
        console.log('this.updateSongIds为空')
        this.updateSongIds = this.otherSelectValue
      }
      if (this.otherSelectValue == null || this.otherSelectValue === '') {
        this.$message({
          message: '请选择歌曲!',
          type: 'warning',
          showClose: true
        })
      } else {
        axios({
          method: 'post',
          url: this.action.updateSongIds,
          params: {
            list_id: row.list_id,
            song_ids: this.updateSongIds
          }
        }).then((res) => {
          this.selectSongList(this.songListNameSearch, this.curr_page, this.page_size)
          this.otherSongOption = res.data.data
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
      }
      console.log(this.otherSelectValue)
      this.otherSelectValue = ''
    },
    selectAllOtherSong (row) {
      axios({
        method: 'get',
        url: this.action.selectAllOtherSong,
        params: {
          song_ids: row.song_ids + ''
        }
      }).then((res) => {
        console.log(res)
        this.otherSongOption = res.data.data
      }).catch((res) => {
        this.$message({
          message: '服务器连接失败,服务器可能未启动',
          type: 'error',
          showClose: true
        })
      })
    },
    showSongListInformation (row) {
      let songListHasSong = '歌单中的歌曲有:<br/>'
      let songListName = '歌单名称:<br/><b>' + row.list_name + '</b><br/>'
      axios({
        method: 'get',
        url: this.action.selectAllSong,
        params: {
          song_ids: row.song_ids + ''
        }
      }).then((res) => {
        console.log(row.song_ids)
        if (row.song_ids == null || row.song_ids === '') {
          songListHasSong = songListHasSong + '<b>歌单未添加任何歌曲</b>'
        } else {
          res.data.data.forEach((item) => {
            songListHasSong += '<b>' + item.song_name + '</b><br/>'
          })
        }
        this.$alert(songListName + songListHasSong, '歌单信息', {
          confirmButtonText: '关闭',
          dangerouslyUseHTMLString: true,
          callback: action => {
          }
        })
      }).catch((res) => {
        this.$message({
          message: '服务器连接失败,服务器可能未启动',
          type: 'error',
          showClose: true
        })
      })
      // 输出的信息
    },
    submitUpdateSongListForm (updateSongListForm) {
      this.$refs[updateSongListForm].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: this.action.updateSongList,
            params: {
              list_version: this.updateSongListForm.list_version,
              list_id: this.updateSongListForm.list_id,
              list_name: this.updateSongListForm.list_name
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
            this.selectSongList(this.songListNameSearch, this.curr_page, this.page_size)
            this.$refs[updateSongListForm].resetFields()
            this.updateDrawerIsVisible = false
          }).catch((res) => {
            this.$message({
              message: '服务器连接失败,服务器可能未启动',
              type: 'error',
              showClose: true
            })
          })
        } else {
          this.$message({
            message: '请完成需要的数据!',
            type: 'warning',
            showClose: true
          })
        }
      })
    },
    showUpdateDrawer (row) {
      this.updateSongListForm.list_name = row.list_name
      this.updateSongListForm.list_id = row.list_id
      this.updateSongListForm.list_version = row.list_version
      this.updateDrawerIsVisible = true
    },
    selectSongList (list_name = '', curr_page = 1, page_size = 10) {
      axios({
        method: 'get',
        url: this.action.selectSongList,
        params: {
          list_name: list_name,
          curr_page: curr_page,
          page_size: page_size
        }
      }).then((res) => {
        console.log(res)
        this.total = res.data.data.total
        this.curr_page = res.data.data.pageNum
        this.page_size = res.data.data.pageSize
        this.songList = res.data.data.list
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
    searchSongList () {
      this.selectSongList(this.songListNameSearch, this.curr_page, this.page_size)
    },
    selectionChange () {},
    songsTableSizeChange (pageSize) {
      this.selectSongList(this.songListNameSearch, this.curr_page, pageSize)
    },
    songsTableCurrentChange (currentPage) {
      this.selectSongList(this.songListNameSearch, currentPage, this.page_size)
    },
    cancelAddDrawer (songListForm) {
      this.addDrawerIsVisible = false
      this.updateDrawerIsVisible = false
    },
    submitSongListForm (songListForm) {
      this.$refs[songListForm].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: this.action.addSongList,
            params: {
              list_name: this.songListForm.list_name
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
          }).catch((res) => {
            this.$message({
              message: '服务器连接失败,服务器可能未启动',
              type: 'error',
              showClose: true
            })
          })
          this.selectSongList()
          this.$refs[songListForm].resetFields()
          this.addDrawerIsVisible = false
        } else {
          this.$message({
            message: '请完成需要的数据!',
            type: 'warning',
            showClose: true
          })
        }
      })
    }
  },
  mounted () {
    this.selectSongList()
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';
  .b-s-l-box {
    width: 100%;
    height: 100%;
    .b-table {
      width: 100%;
      margin-top: px2rem(1px);
      .play-button {
        i {
          font-size: px2rem(1.25px);
        }
      }
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
    .song-image {
      width: px2rem(10px);
      height: px2rem(10px);
      border-radius: px2rem(2px);
    }
    .song-upload-box {
      .el-upload {
        border: px2rem(0.2px) dashed #d9d9d9;
        border-radius: px2rem(2px);
        width: px2rem(10px);
        height: px2rem(10px);
      }
    }
    .song-upload-icon {
      width: px2rem(10px);
      height: px2rem(10px);
      line-height: px2rem(10px);
      font-size: px2rem(3px);
      color: #d9d9d9;
    }
  }
</style>

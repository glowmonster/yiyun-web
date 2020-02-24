<template>
  <div class="b-s-box">
    <el-row type="flex" justify="left" :gutter="5">
      <el-col :span="2">
        <el-button type="primary" @click="openAddDrawer">新增歌曲</el-button>
      </el-col>
      <el-col :span="5" :offset="2">
        <el-input v-model="songNameSearch" placeholder="请输入歌名"></el-input>
      </el-col>
      <el-col :span="5">
        <el-input v-model="songAuthorSearch" placeholder="请输入歌手名"></el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" icon="el-icon-search" round @click="searchSong">搜索</el-button>
      </el-col>
      <el-col :span="2" :offset="5">
        <el-button type="danger" disabled>批量删除</el-button>
      </el-col>
    </el-row>
    <el-table
      stripe
      border
      :data="songs"
      @selection-change="selectionChange"
      class="b-table">
      <el-table-column
        type="selection"
        width="60">
      </el-table-column>
      <el-table-column
        label="歌曲编号" show-overflow-tooltip
        width="80">
        <template slot-scope="scope">{{ scope.row.song_id }}</template>
      </el-table-column>
      <el-table-column
        label="歌曲名称" show-overflow-tooltip
        width="150">
        <template slot-scope="scope">{{ scope.row.song_name }}</template>
      </el-table-column>
      <el-table-column show-overflow-tooltip
        label="歌曲作者"
        width="150">
        <template slot-scope="scope">{{ scope.row.song_author }}</template>
      </el-table-column>
      <el-table-column show-overflow-tooltip
        label="歌曲图片路径"
        width="150">
        <template slot-scope="scope">{{ scope.row.song_image }}</template>
      </el-table-column>
      <el-table-column show-overflow-tooltip
        label="歌曲路径"
        width="150">
        <template slot-scope="scope">{{ scope.row.song_url }}</template>
      </el-table-column>
      <el-table-column show-overflow-tooltip
        label="歌曲风格"
        width="130">
        <template slot-scope="scope">{{ scope.row.style_id }}</template>
      </el-table-column>
      <el-table-column show-overflow-tooltip
        label="点赞数"
        width="70">
        <template slot-scope="scope">{{ scope.row.song_great }}</template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-button @click="playMusic(scope.row)" circle type="info" icon="el-icon-video-play" class="play-button"></el-button>
          <el-button type="primary" @click="showUpdateDrawer(scope.row)">修改</el-button>
          <el-button type="warning" @click="deleteSong(scope.row)">删除</el-button>
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

    <!-- 添加歌曲 -->
    <el-drawer
      title="添加歌曲"
      :visible.sync="addDrawerIsVisible"
      direction="ltr"
      size="40%"
      ref="drawer"
      >
      <div class="add-drawer-box">
        <el-form :model="songForm" :rules="songUploadRules" ref="songForm">
          <el-form-item label="歌曲图片" prop="song_image">
            <el-upload
              class="song-upload-box"
              :action="action.avatarUpload"
              :show-file-list="false"
              :on-success="songImageUploadSuccess"
              :before-upload="beforeSongImageUpload"
              :on-error="songImageUploadFailed"
              accept="image/jpeg"
            >
              <img v-if="songForm.song_image" :src="songForm.song_image" class="song-image">
              <i v-else class="el-icon-plus song-upload-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="歌曲文件" prop="song_url">
            <el-upload
              :action="action.songFileUpload"
              :on-preview="songFileUploadPreview"
              :on-remove="songFileUploadRemove"
              :on-success="songFileUploadSuccess"
              :limit="1"
              :on-exceed="songFileUploadExceed"
              :before-upload="songFileBeforeUpload"
              accept="audio/mpeg">
              <el-button size="small" type="primary">点击上传歌曲文件</el-button>
              <div slot="tip">只能上传mp3文件,且不超过10M</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="歌曲名称" prop="song_name">
            <el-input v-model="songForm.song_name"></el-input>
          </el-form-item>
          <el-form-item label="歌曲作者" prop="song_author">
            <el-input v-model="songForm.song_author"></el-input>
          </el-form-item>
          <el-form-item label="歌曲风格" prop="song_style">
            <el-select v-model="selectedValue" placeholder="请选择">
              <el-option
                v-for="item in selectOptions"
                :key="item.style_id"
                :label="item.style_name"
                :value="item.style_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button v-loading.fullscreen.lock="fullScreenLoading" class="add-drawer-button" type="primary" @click="submitSongForm('songForm')" round>确 定</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" class="add-drawer-button" @click="cancelAddDrawer('songForm')" round>取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <el-drawer
      title="修改歌曲信息"
      :visible.sync="isShowUpdateDrawer"
      direction="ltr"
      size="40%"
      >
      <div class="add-drawer-box">
        <el-form :model="songUpdateForm" :rules="songUploadRules" ref="songUpdateForm">
          <el-form-item label="歌曲名称" prop="song_name">
            <el-input v-model="songUpdateForm.song_name"></el-input>
          </el-form-item>

          <el-form-item label="作者名称" prop="song_author">
            <el-input v-model="songUpdateForm.song_author"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="add-drawer-button" type="primary" @click="submitUpdateDrawer('songUpdateForm')" round>提 交</el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="add-drawer-button" type="warning" @click="cancelUpdateSongForm('songUpdateForm')" round>取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <playBarH ref="playBar"></playBarH>
  </div>
</template>

<script>
import playBarH from '@/components/playBarH'
import axios from 'axios'
export default {
  data () {
    return {
      fullScreenLoading: false,
      selectOptions: [],
      action: {
        selectAllStyleNo: 'yiyun/style/selectAllStyleNo',
        avatarUpload: 'yiyun/song/avatarUpload',
        songFileUpload: 'yiyun/song/songFileUpload',
        insertSong: 'yiyun/song/insertSong',
        selectAllSongByNameOrAuthor: 'yiyun/song/selectAllSongByNameOrAuthor',
        deleteSong: 'yiyun/song/deleteSong',
        updateSong: 'yiyun/song/updateSong'
      },
      styleIdToStyleName: [],

      curr_page: 1,
      page_size: 10,
      total: 0,
      songNameSearch: '',
      songAuthorSearch: '',

      songUpdateForm: {
        style_id: '',
        song_name: '',
        song_author: '',
        song_image: '',
        song_url: ''
      },

      songForm: {
        style_id: '',
        song_name: '',
        song_author: '',
        song_image: '',
        song_url: ''
      },
      songUploadRules: {
        song_name: [
          {
            required: true, message: '请输入歌曲名称', trigger: 'blur'
          }
        ],
        song_author: [
          {
            required: true, message: '请输入作者名称', trigger: 'blur'
          }
        ],
        song_image: [
          {
            required: true, message: '请上传图片', trigger: 'change'
          }
        ],
        song_url: [
          {
            required: true, message: '请上传音乐文件', trigger: 'change'
          }
        ]
      },
      // 用于显示数据
      songs: [],
      addDrawerIsVisible: false,
      addDrawerFormItemWidth: '70px',
      selectedValue: '',
      styleArray: [],
      songImageUrl: '',
      songFileUrl: '',
      isShowUpdateDrawer: false
    }
  },
  components: {
    playBarH
  },
  methods: {
    cancelUpdateSongForm () {
      this.isShowUpdateDrawer = false
    },
    showUpdateDrawer (row) {
      this.isShowUpdateDrawer = true
      this.songUpdateForm.song_name = row.song_name
      this.songUpdateForm.song_author = row.song_author
      // this.songUpdateForm.style_id = row.style_id
      this.songUpdateForm.song_id = row.song_id
    },
    playMusic (row) {
      console.log(row)
      this.songImageUrl = row.song_image
      this.songFileUrl = row.song_url
      this.$refs.playBar.songFileUrl = this.songFileUrl
      this.$refs.playBar.songImageUrl = this.songImageUrl
    },
    submitUpdateDrawer (songUpdateForm) {
      this.$refs[songUpdateForm].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: this.action.updateSong,
            params: {
              song_name: this.songUpdateForm.song_name,
              song_author: this.songUpdateForm.song_author,
              song_id: this.songUpdateForm.song_id
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
            this.selectAllSong(this.songNameSearch, this.songAuthorSearch, this.curr_page, this.page_size)
            // this.selectAllStyle(this.songStyleSearch, this.styleTableCurrentPage, this.styleTablePageSize)
          }).catch((res) => {
            this.$message({
              message: '服务器连接失败,服务器可能未启动',
              type: 'error',
              showClose: true
            })
          })
          this.$refs[songUpdateForm].resetFields()
          this.isShowUpdateDrawer = false
        } else {
          this.$message({
            message: '请完成需要的数据!',
            type: 'warning',
            showClose: true
          })
        }
      })
    },

    selectAllStyleNo () {
      axios({
        method: 'get',
        url: this.action.selectAllStyleNo
      }).then((res) => {
        // console.log(res)
        this.selectOptions = res.data.data
        // console.log(this.selectOptions)
      }).catch((res) => {
        this.$message({
          message: '服务器连接失败,服务器可能未启动',
          type: 'error',
          showClose: true
        })
      })
      this.styleArray = this.selectOptions
      console.log(this.styleArray)
    },

    selectAllSong (song_name = '', song_author = '', curr_page = 1, page_size = 10) {
      axios({
        method: 'get',
        url: this.action.selectAllSongByNameOrAuthor,
        params: {
          song_name: song_name,
          song_author: song_author,
          curr_page: curr_page,
          page_size: page_size
        }
      }).then((res) => {
        // this.selectAllStyleNo()
        // console.log(res)
        this.songs = res.data.data.list

        // console.log(this.songs)
        this.curr_page = res.data.data.pageNum
        this.page_size = res.data.data.pageSize
        this.total = res.data.data.total
        this.selectOptions.forEach((styleItem) => {
          // console.log(styleItem)
          this.songs.forEach((songItem) => {
            if (songItem.style_id === styleItem.style_id) {
              this.styleIdToStyleName.push(styleItem.style_name)
            }
          })
        })
        this.songs.forEach((songsItem, index) => {
          console.log(songsItem)
          console.log(this.styleIdToStyleName[index])
          songsItem.style_id = this.styleIdToStyleName[index]
        })
      }).catch((res) => {
        this.$message({
          message: '服务器连接失败,服务器可能未启动',
          type: 'error',
          showClose: true
        })
      })
    },

    searchSong () {
      this.selectAllSong(this.songNameSearch, this.songAuthorSearch, this.curr_page, this.page_size)
    },

    songImageUploadFailed (err, file) {
      console.log('err为:' + err)
      console.log(err)
      console.log('file为' + file)
      console.log(file)
    },
    // 歌曲文件上传函数
    songFileUploadExceed () {},
    songFileUploadPreview () {},
    songFileUploadRemove () {},
    songFileUploadSuccess () {
      this.songForm.song_url = 'exists'
    },
    // 歌曲表的函数
    songsTableSizeChange (pageSize) {
      this.selectAllSong(this.songNameSearch, this.songAuthorSearch, this.curr_page, pageSize)
    },
    songsTableCurrentChange (currPage) {
      this.selectAllSong(this.songNameSearch, this.songAuthorSearch, currPage, this.page_size)
    },
    selectionChange () {
    },
    // 抽屉操作函数
    openAddDrawer () {
      this.addDrawerIsVisible = true
    },
    cancelAddDrawer (songForm) {
      this.$refs[songForm].resetFields()
      this.addDrawerIsVisible = false
    },
    submitSongForm (songForm) {
      this.$refs[songForm].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: this.action.insertSong,
            params: {
              style_id: this.selectedValue,
              song_name: this.songForm.song_name,
              song_author: this.songForm.song_author
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
          this.selectAllSong()
          this.$refs[songForm].resetFields()
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
    songImageUploadSuccess (res, file) {
      this.songForm.song_image = URL.createObjectURL(file.raw)
      // console.log(this.registerForm.user_avatar_url)
      // console.log(file.raw)
    },
    // 对上传的文件进行限制
    beforeSongImageUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLessThan2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.warning('上传的头像只能是JPG或者JPEG格式')
      }
      if (!isLessThan2M) {
        this.$message.warning('上传的文件不能大于2M')
      }
    },
    songFileBeforeUpload (file) {
      const isMP3 = file.type === 'audio/mpeg'
      const isLessThan30M = file.size / 1024 / 1024 < 30
      if (!isMP3) {
        this.$message.warning('上传的歌曲文件只能是MP3格式')
        return false
      }
      if (!isLessThan30M) {
        this.$message.warning('上传的文件不能大于30M')
        return false
      }
    },
    deleteSong (row) {
      axios({
        method: 'post',
        url: this.action.deleteSong,
        params: {
          song_id: row.song_id
        }
      }).then((res) => {
        let tempType
        if (res.data.resultCode === 0) {
          tempType = 'success'
        } else {
          tempType = 'error'
        }
        this.selectAllSong(this.songNameSearch, this.songAuthorSearch, this.curr_page, this.page_size)
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
      this.selectAllSong(this.songNameSearch, this.songAuthorSearch, this.curr_page, this.page_size)
    }
  },
  mounted () {
    this.selectAllStyleNo()
    this.selectAllSong()
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';
  .b-s-box {
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
        margin-top: px2rem(1px);
        width: 100%;
        text-align: center;
      }
      .add-drawer-button {
        width: 100%;
      }
      .song-upload-box {
        .el-upload {
          border: px2rem(0.2px) dashed #d9d9d9;
          border-radius: px2rem(2px);
          width: px2rem(10px);
          height: px2rem(10px);
        }
      }
      .song-image {
        width: px2rem(10px);
        height: px2rem(10px);
        border-radius: px2rem(2px);
      }
      .song-upload-icon {
        width: px2rem(10px);
        height: px2rem(10px);
        line-height: px2rem(10px);
        font-size: px2rem(3px);
        color: #d9d9d9;
      }
    }
  }
</style>

<template>
  <div class="f-my-music-box">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-table
          border
          :data="songs"
          style="width: 100%">
          <el-table-column
            prop="song_id" show-overflow-tooltip
            label="歌曲id"
            width="120">
          </el-table-column>
          <el-table-column
            prop="song_name" show-overflow-tooltip
            label="歌曲名"
            width="500">
          </el-table-column>
          <el-table-column
            prop="song_author" show-overflow-tooltip
            label="歌曲作者"
            width="450">
          </el-table-column>
          <el-table-column
            prop="song_author" show-overflow-tooltip
            label="操作"
            fixed="right">
            <template slot-scope="scope">
              <el-button
                @click="playMusic(scope.row)" round type="primary" plain>播放</el-button>
              <el-button
                @click="seeMusic(scope.row)" round plain>查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="2">
        <el-pagination
          small
          background
          @size-change="songListSizeChange"
          @current-change="songListCurrentChange"
          layout="prev, pager, next"
          :page-size="page_size"
          :current-page="curr_page"
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
        selectAllSong: 'yiyun/song/selectAllSongByNameOrAuthor'
      },
      songs: [],
      curr_page: 1,
      page_size: 5,
      total: 0
    }
  },
  components: {},
  methods: {
    songListSizeChange (pageSize) {
      this.selectAllSong(this.curr_page, pageSize)
    },
    songListCurrentChange (currPage) {
      this.selectAllSong(currPage, this.page_size)
    },
    playMusic (row) {
      console.log(row.song_url)
      console.log(row.song_image)
      window.localStorage.setItem('currentPlaySong', JSON.stringify(row))
      location.reload()
    },
    seeMusic (row) {
      window.localStorage.setItem('currentSong', JSON.stringify(row))
      this.$router.push('/frontSongInfor')
    },
    selectAllSong (curr_page = 1, page_size = 5) {
      axios({
        method: 'get',
        url: this.action.selectAllSong,
        params: {
          song_name: '',
          song_author: '',
          curr_page: curr_page,
          page_size: page_size
        }
      }).then((res) => {
        console.log(res)
        this.songs = res.data.data.list
        this.curr_page = res.data.data.pageNum
        this.page_size = res.data.data.pageSize
        this.total = res.data.data.total
        // this.otherSongOption = res.data.data
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
    this.selectAllSong()
  }
}
</script>

<style lang="scss">
  @import '../../assets/style/common.scss';
  .f-my-music-box {
    font-family: "黑体";
    font-weight: bold;
    width: 100%;
    height: 100%;
    .el-row {
      margin-top: 30px;
    }
  }
</style>

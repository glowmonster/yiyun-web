<template>
  <div class="f-my-music-box">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-table
          border
          :data="songs"
          style="width: 100%">
          <!-- <el-table-column
            prop="song_id" show-overflow-tooltip
            label="id"
            width="40">
          </el-table-column> -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline>
                <el-form-item label="歌曲ID">
                  <span>{{ props.row.song_id }}</span>
                </el-form-item>
                <el-form-item label="歌曲名">
                  <span>{{ props.row.song_name }}</span>
                </el-form-item>
                <el-form-item label="歌曲作者">
                  <span>{{ props.row.song_author }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="song_name" show-overflow-tooltip
            label="歌曲名"
            width="170">
          </el-table-column>
          <el-table-column
            prop="song_author" show-overflow-tooltip
            label="操作"
            width="120"
            fixed="right">
            <template slot-scope="scope">
              <el-button
                @click="playMusic(scope.row)"  icon="el-icon-caret-right" circle type="primary" plain></el-button>
              <el-button
                @click="seeMusic(scope.row)" icon="el-icon-info" circle plain></el-button>
            </template>
          </el-table-column>
        </el-table>
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
      page_size: 999,
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
      this.$router.push('/fitSongInfor')
    },
    selectAllSong (curr_page = 1, page_size = 999) {
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
    height: px2rem(150px);
    .el-row {
      margin-top: px2rem(20px);
    }
  }
</style>

<template>
  <div class="f-song-list-box">
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-image
          style="width: 300px; height: 300px"
          :src="songListImage"
          lazy
          fit="fill">
        </el-image>
      </el-col>
      <el-col :span="7" class="list-name-col">
        <span class="list-name-span">歌单名: <b>{{songList.list_name}}</b></span>
        <el-row>
          <el-col :span="24">
            <span class="list-time-span">创建时间: <b>{{songList.list_create_time | dateFormat}}</b></span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
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
            prop="song_author"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button
                @click="playMusic(scope.row)" round type="primary" plain>播放</el-button>
              <el-button
                type="danger"
                @click="removeMusic(scope.row)" round plain>移除</el-button>
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
      songListImage: '',
      songList: {},
      songs: [],
      action: {
        selectAllSong: 'yiyun/song/selectAllSong'
      }
    }
  },
  components: {},
  methods: {
    playMusic (row) {
      console.log(row.song_url)
      console.log(row.song_image)
      window.localStorage.setItem('currentPlaySong', JSON.stringify(row))
      location.reload()
    },
    removeMusic () {},
    selectInSongListSong () {
      axios({
        method: 'get',
        url: this.action.selectAllSong,
        params: {
          song_ids: this.songList.song_ids + ''
        }
      }).then((res) => {
        console.log(res)
        this.songs = res.data.data
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
    let songListObject = JSON.parse(window.localStorage.getItem('currentSongList'))
    // console.log(songListObject.list_image)
    this.songListImage = songListObject.list_image
    this.songList = songListObject
    console.log(this.songList)
    this.selectInSongListSong()
  }
}
</script>

<style lang="scss">
  @import '../../assets/style/common.scss';
  .f-song-list-box {
    font-family: "黑体";
    width: 100%;
    height: 100%;
    .el-row {
      margin-top: 30px;
    }
    .list-name-col {
      margin-top: 15px;
    }
    .list-name-span {
      font-size: 35px;
    }
    .list-time-span {
      font-size: 20px;
    }
  }
</style>

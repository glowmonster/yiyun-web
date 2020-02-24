<template>
  <div class="f-song-list-box">
    <el-row type="flex" justify="center">
      <el-col :span="13">
        <el-image
          :src="songListImage"
          lazy
          fit="fill">
        </el-image>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12" class="list-name-col">
        <span class="list-name-span">歌单名: <br/><b>{{songList.list_name}}</b></span>
        <el-row>
          <el-col :span="24">
            <span class="list-time-span">创建时间: <br/><b>{{songList.list_create_time | dateFormat}}</b></span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="song-list-table" type="flex" justify="center">
      <el-col :span="20">
        <el-table
          border
          :data="songs"
          style="width: 100%">
          <el-table-column
            prop="song_id" show-overflow-tooltip
            label="id"
            width="40">
          </el-table-column>
          <el-table-column
            prop="song_name" show-overflow-tooltip
            label="歌曲名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="song_author" show-overflow-tooltip
            label="歌曲作者"
            width="110">
          </el-table-column>
          <el-table-column
            prop="song_author"
            width="60"
            label="操作"
            fixed="right">
            <template slot-scope="scope">
              <el-button class="list-button"
                @click="playMusic(scope.row)" icon="el-icon-caret-right" circle type="primary" plain></el-button>
              <!-- <el-button class="list-button"
                type="danger"
                @click="removeMusic(scope.row)" icon="el-icon-close" circle plain></el-button> -->
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
    height: px2rem(150px);
    .el-image {
      width: px2rem(60px);
      height: px2rem(60px);
    }
    .song-list-table {
      margin-bottom: px2rem(20px);
      .list-button {
        // width: px2rem(5px);
      }
    }
    .el-row {
      margin-top: px2rem(10px);
    }
    .list-name-col {
      margin-top: px2rem(5px);
    }
    .list-name-span {
      font-size: px2rem(5px);
    }
    .list-time-span {
      font-size: px2rem(5px);
    }
  }
</style>

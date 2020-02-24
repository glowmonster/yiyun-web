<template>
  <div class="f-song-infor-box">
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-image
          style="width: 300px; height: 300px"
          :src="song.song_image"
          lazy
          fit="fill">
        </el-image>
      </el-col>
      <el-col :span="7" class="song-name-col">
        <span class="song-name-span">歌曲名: <b>{{song.song_name}}</b></span>
        <el-row>
          <el-col :span="24">
            <span class="song-author-span">歌曲作者: <b>{{song.song_author}}</b></span>
          </el-col>
        </el-row>
        <el-row class="song-infor-like">
          <el-col :span="8">
            <el-button @click="greatSong" round type="danger" icon="el-icon-thumb" plain><b>{{song.song_great}}</b>点赞</el-button>
          </el-col>
          <el-col class="download-col" :span="8">
            <a download :href="song.song_url">下载</a>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-input
          type="textarea"
          :rows="3"
          maxlength="120"
          placeholder="留下你的听后感受,最多120个字"
          v-model="inputCommentText">
        </el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="7">
        <el-button @click="submitComment" round type="primary">提交</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>评论区</span>
          </div>
          <el-table
            :data="commentList"
            border
            style="width: 100%">
            <el-table-column
              prop="comment_id" show-overflow-tooltip
              label="评论编号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="comment_text" show-overflow-tooltip
              label="评论内容"
              width="510">
            </el-table-column>
            <el-table-column
              label="评论时间" show-overflow-tooltip
              width="260">
              <template slot-scope="scope">{{scope.row.comment_create_time | dateFormat}}</template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="front-comment-page">
      <el-col :span="2">
        <el-pagination
          small
          background
          @size-change="commentListSizeChange"
          @current-change="commentListCurrentChange"
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
        songGreat: 'yiyun/song/greatSong',
        selectAllSongComment: 'yiyun/songComment/selectAllSongComment',
        insertSongComment: 'yiyun/songComment/insertSongComment'
      },
      songImage: '',
      song: {},
      inputCommentText: '',
      curr_page: 1,
      page_size: 5,
      total: 0,
      commentList: []
    }
  },
  components: {},
  methods: {
    commentListSizeChange (pageSize) {
      this.selectAllSongComment(this.curr_page, pageSize)
    },
    commentListCurrentChange (currPage) {
      this.selectAllSongComment(currPage, this.page_size)
    },
    submitComment () {
      if (this.inputCommentText.trim() !== '' && this.inputCommentText != null) {
        axios({
          method: 'post',
          url: this.action.insertSongComment,
          params: {
            song_id: this.song.song_id,
            comment_text: this.inputCommentText + ''
          }
        }).then((res) => {
          console.log(res)
          this.$message({
            message: res.data.message,
            type: 'success',
            showClose: true
          })
          this.inputCommentText = ''
          this.selectAllSongComment()
        }).catch((res) => {
          this.$message({
            message: '服务器连接失败,服务器可能未启动',
            type: 'error',
            showClose: true
          })
        })
      } else {
        this.$message({
          message: '请输入内容!!!',
          type: 'warning',
          showClose: true
        })
      }
    },
    selectAllSongComment (curr_page = 1, page_size = 5) {
      axios({
        method: 'get',
        url: this.action.selectAllSongComment,
        params: {
          curr_page: curr_page,
          page_size: page_size,
          song_id: this.song.song_id
        }
      }).then((res) => {
        console.log(res)
        this.commentList = res.data.data.list
        this.curr_page = res.data.data.pageNum
        this.page_size = res.data.data.pageSize
        this.total = res.data.data.total
      }).catch((res) => {
        this.$message({
          message: '服务器连接失败,服务器可能未启动',
          type: 'error',
          showClose: true
        })
      })
    },
    downloadSong () {
      window.open.href = '' + this.song.song_url
      // window.open = '' + this.song.song_url
      console.log(this.song.song_url)
    },
    greatSong () {
      this.song.song_great = this.song.song_great + 1
      axios({
        method: 'post',
        url: this.action.songGreat,
        params: {
          song_id: this.song.song_id
        }
      }).then((res) => {
        console.log(res)
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
    const songObject = JSON.parse(window.localStorage.getItem('currentSong'))
    this.song = songObject
    this.selectAllSongComment()
  }
}
</script>

<style lang="scss">
  @import '../../assets/style/common.scss';
  .f-song-infor-box {
    width: 100%;
    height: 100%;
    .el-row {
      margin-top: 30px;
    }
    .song-name-col {
      margin-top: 15px;
    }
    .song-name-span {
      font-size: 30px;
    }
    .song-author-span {
      font-size: 20px;
    }
    .song-infor-like {
      margin-top: 100px;
    }
    .download-col {
      line-height: 250%;
    }
    .box-card {
      margin-bottom: 30px;
    }
    .front-comment-page {
      margin-bottom: 30px;
    }
  }
</style>

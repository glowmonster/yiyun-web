<template>
  <div class="f-find-music">
    <div class="title-box">
      <span>歌单推荐</span>
    </div>
    <el-row type="flex" justify="center">
      <el-col :span="6" v-for="(item, index) in songList" :key="index" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <img :src="item.list_image" class="image">
          <div style="padding: 14px;">
            <span>歌单名: {{item.list_name}}</span>
            <p>创建时间: {{item.list_create_time | dateFormat}}</p>
            <div>
              <el-button type="text" @click="openThisSongList(item)" class="f-button">查看</el-button>
            </div>
          </div>
        </el-card>
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
        selectSongList: 'yiyun/songList/selectSongList'
      },
      curr_page: 1,
      page_size: 3,
      total: 0,
      songList: []
    }
  },
  components: {},
  methods: {
    openThisSongList (item) {
      window.localStorage.setItem('currentSongList', JSON.stringify(item))
      this.$router.push('/frontSongList')
      // let songListObject = window.localStorage.getItem('currentSongList')
      // console.log(JSON.parse(songListObject))
      console.log(item.list_image)
    },
    songListSizeChange (pageSize) {
      this.selectSongList('', this.curr_page, pageSize)
    },
    songListCurrentChange (currPage) {
      this.selectSongList('', currPage, this.page_size)
    },
    selectSongList (list_name = '', curr_page = 1, page_size = 3) {
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
    }
  },
  mounted () {
    this.selectSongList()
  }
}
</script>

<style lang="scss">
  @import '../../assets/style/common.scss';
  .f-find-music {
    width: 100%;
    height: 100%;
    font-family: "黑体";
    .f-button {
      font-size: 16px;
    }
    .el-row {
      margin-bottom: 20px;
    }
    .title-box {
      width: 300px;
      height: 80px;
      margin: 0 auto;
      margin-top: 40px;
      span {
        user-select: none;
        letter-spacing: 30px;
        font-size: 40px;
        font-weight: bold;
        font-family: "黑体";
      }
    }
    .image {
      width: 380px;
      height: 380px;
    }
  }
</style>

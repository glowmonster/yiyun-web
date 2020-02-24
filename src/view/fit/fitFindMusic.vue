<template>
  <div class="f-find-music">
    <div class="title-box">
      <span>歌单推荐</span>
    </div>
    <ul class="infinite-list" v-infinite-scroll="infinite" style="overflow:auto">
      <li v-for="(item, index) in songList" class="infinite-list-item" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <img :src="item.list_image" class="image">
          <div style="padding: 10px;">
            <span>歌单名: <br/>{{item.list_name}}</span><br/>
            <span>创建时间: <br/>{{item.list_create_time | dateFormat}}</span>
            <div>
              <el-button type="text" @click="openThisSongList(item)" class="f-button">查看</el-button>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
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
      page_size: 1,
      total: 0,
      songList: []
    }
  },
  components: {},
  methods: {
    infinite () {
      this.page_size += 1
      console.log(this.songList)
      this.selectSongList('', this.curr_page, this.page_size)
    },
    openThisSongList (item) {
      window.localStorage.setItem('currentSongList', JSON.stringify(item))
      this.$router.push('/fitSongList')
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
    selectSongList (list_name = '', curr_page = 1, page_size = 1) {
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
    height: px2rem(150px);
    font-family: "黑体";
    .f-button {
      font-size: px2rem(5px);
    }
    .infinite-list {
      padding: 0;
      height: 100%;
      width: 100%;
      .infinite-list-item {
        height: 100%;
        width: 100%;
        .el-card {
          margin: px2rem(5px) auto;
          width: 90%;
          span {
            font-size: px2rem(4.5px);
          }
        }
      }
      margin-bottom: px2rem(20px);
    }
    .title-box {
      text-align: center;
      width: 100%;
      height: px2rem(10px);
      // margin: 0 auto;
      background: none;
      border: none;
      margin-top: px2rem(5px);
      span {
        user-select: none;
        letter-spacing: px2rem(10px);
        font-size: px2rem(5px);
        font-weight: bold;
        font-family: "黑体";
      }
    }
    .image {
      width: px2rem(100px);
      height: px2rem(100px);
    }
  }
</style>

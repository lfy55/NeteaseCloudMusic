<template>
  <div class="app">
    <div class="content">
      <el-input placeholder="请输入要搜索的内容" v-model="forSearch">
        <el-select v-model="select" slot="prepend" clearable placeholder="全部类型">
          <el-option label="单曲" value="1"></el-option>
          <el-option label="专辑" value="10"></el-option>
          <el-option label="歌手" value="100"></el-option>
          <el-option label="歌单" value="1000"></el-option>
          <el-option label="用户" value="1002"></el-option>
          <el-option label="MV" value="1004"></el-option>
          <el-option label="歌词" value="1006"></el-option>
          <el-option label="电台" value="1009"></el-option>
        </el-select>
        <el-button slot="append" icon="search" @click="search"></el-button>
      </el-input>
      <div class="result scroll" v-loading.body="loading">
        <music-item class="music-item" @playing="playing(song)" v-for="song in songs" :music="song" :key="song.id"></music-item>
      </div>
      <div class="pages" v-show="songCount!==0">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="30" layout="total, prev, pager, next" :total="songCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'
import { interceptors } from '../lib/myUtils'
import musicItem from './musicItem'
import { mapActions } from 'vuex'

export default {
  components: {
    "music-item": musicItem,
  },
  data() {
    return {
      forSearch: '',
      select: '',
      songCount: 0,
      currentPage1: 1,
      songs: [],
      loading: false,
    }
  },
  methods: {
    ...mapActions(['addMusic']),
    search() {
      this.loading = true
      this.$http.get(config.baseUrl + `search?keywords=${this.forSearch}&type=${this.select}&offset=${(this.currentPage1 - 1) * 30}`)
        .then(interceptors)
        .then(data => {
          console.log('搜索结果', data.data)
          this.songCount = data.data.result.songCount
          this.songs = data.data.result.songs.map(item => {
            return {
              ...item,
              aName: item.artists.map(art => art.name).join('-'),
              dt: parseInt(parseInt(item.duration / 1000) / 60) + '分' + parseInt(item.duration / 1000) % 60 + '秒',
              al: { picUrl: item.album.artist.img1v1Url }
            }
          })
          this.loading = false
        })
        .catch(data => {
          this.$message({
            message: '搜索失败:' + data.msg,
            type: 'error'
          })
          this.loading = false
          console.log('搜索失败', data)
        })
    },
    handleCurrentChange() {
      this.search()
    },
    playing(song) {
      this.addMusic({ music: song })
    },
  },
}
</script>

<style scoped>
.app {
  width: 100%;
}

.content {
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
  padding: 20px 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.result {
  width: 100%;
  margin-top: 20px;
  flex-grow: 1;
  overflow: auto;
}

.music-item:nth-child(odd) {
  background: #eee;
}

.music-item:hover {
  background: #cccccc;
}

.pages {
  width: 100%;
  height: 30px;
  margin-top: 20px;
  flex-shrink: 0;
}
</style>

<style>
.el-select .el-input {
  width: 110px;
}
</style>
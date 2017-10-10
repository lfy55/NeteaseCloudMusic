<template>
  <div class="user-profile">
    <div class="msg">
      <div class="facial-margin">
        <img :src="getFacial" alt="" class="facial">
        <span class="name">{{getName}}</span>
      </div>
      <div class="music-list scroll" v-loading="loaddingList">
        <div class="music-item" v-for="item in playList" :key="item.id">
          <music-list-min :item="item" @clickMusicList="clickList"></music-list-min>
        </div>
      </div>
    </div>
    <el-dialog size="small" :visible.sync="showMusics">
      <span slot="title" class="dialog-footer">
        <span>{{showName+'(' + musicsData.length + ')'}}</span>
        <el-button type="text" @click="addPlaying">全部播放</el-button>
      </span>
      <el-table v-loading="loaddingTab" :data="musicsData" :height="400" style="width: 100%" :max-height="'100%'">
        <el-table-column prop="name" label="歌名" width="100">
        </el-table-column>
        <el-table-column prop="aName" label="歌手" width="100">
        </el-table-column>
        <el-table-column prop="from" label="专辑" width="150">
        </el-table-column>
        <el-table-column prop="dt" label="时长" width="100">
        </el-table-column>
        <el-table-column label="">
          <template scope="scope">
            <el-button @click.native.prevent="addPlaying(scope.row)" width="40" type="text" size="small">
              <i class="el-icon-plus" tooltip="点击添加到播放列表"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import config from '@/config'
import { interceptors } from '@/lib/myUtils'
import { mapState, mapGetters, mapActions } from 'vuex'

import musicListMin from './musicListMin'

export default {
  name: 'user-profile',
  data() {
    return {
      playList: [],
      loaddingList: true,
      loaddingTab: false,
      showMusics: false,
      musicsData: [],
      showName: '',
    }
  },
  components: {
    "music-list-min": musicListMin,
  },
  computed: {
    ...mapState({
      getBG: state => {
        console.log(state.user.backgroundUrl)
        return `url(${state.user.backgroundUrl})`
      },
      getName: state => state.user.nickname,
    }),
    ...mapGetters(['getFacial']),
  },
  mounted() {
    if (!this.$store.getters.isLogged) {
      this.$router.push({ name: 'login-page' })

      return;
    }
    this.$http.get(config.baseUrl + 'user/playlist?uid=' + this.$store.state.user.userId)
      .then(interceptors)
      .then(data => {
        console.log('获取用户歌单', data)
        this.playList = data.data.playlist
        this.loaddingList = false
      })
  },
  methods: {
    ...mapActions(['addMusic']),
    clickList(id) {
      this.showMusics = true
      this.loaddingTab = true
      this.$http.get(config.baseUrl + 'playlist/detail?id=' + id)
        .then(interceptors)
        .then(data => {
          console.log('获取歌单内容', data)
          this.showName = data.data.playlist.name
          this.musicsData = data.data.playlist.tracks.map(item => {
            return {
              name: item.name,
              id: item.id,
              from: item.al.name,
              al: item.al,
              ar: item.ar,
              dt: parseInt(parseInt(item.dt / 1000) / 60) + '分' + parseInt(item.dt / 1000) % 60 + '秒',
              aName: item.ar.map(a => a.name).join("-"),
            }
          })
          this.loaddingTab = false
        })
    },
    addPlaying(music) {
      if (music.id) {
        this.addMusic({ music })
      } else {
        this.musicsData.forEach(item => {
          this.addMusic({ music: item })
        })
      }
    },
  },
}
</script>

<style scoped>
.user-profile {
  width: 100%;
  background-repeat: no-repeat;
  background-size: 100% auto;
}

.msg {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.facial-margin {
  width: 160px;
  flex-shrink: 0;
  height: 200px;
  box-sizing: border-box;
  padding: 5px;
  border: solid 1px rgba(0, 0, 0, 0.3);
  align-self: flex-start;
  margin-top: 50px;
  margin-left: 80px;
  margin-right: 20px;
}

.name {
  width: 100%;
  height: 35px;
  display: inline-block;
  line-height: 35px;
  text-align: center;
  font-weight: 700;
  cursor: pointer;
}

.facial {
  width: 150px;
  height: 150px;
}

.music-list {
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
}

.music-item {
  width: 90%;
  height: 100px;
  margin: 5px 0px;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
}
</style>

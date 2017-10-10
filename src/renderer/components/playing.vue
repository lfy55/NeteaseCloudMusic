<template>
  <div class="app">
    <audio class="" :src="musicUrl" autoplay controls :loop="order === 0" @timeupdate="updateTime"></audio>
    <div class="control"></div>
    <div class="lyrics scroll" ref="lyrics">
      <p v-for="(item,index) in lyrics" :class="{played: currentTime>item[0],playing: currentIndex === index}" :key="item[0]">{{item[1]||'---'}}</p>
    </div>
    <div class="icon" @click="showList = !showList">
      <span>{{showList?'❯':'❮'}}</span>
    </div>
    <div class="list scroll" :class="{show: showList}">
      <music-item v-for="(music,index) in playingList" :key="music.id" :music="music" :isplaying="playingIndex === index" @playing="play"></music-item>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import { interceptors } from '@/lib/myUtils'
import { mapState, mapMutations } from 'vuex'
import musicItem from './musicItem'

export default {
  name: 'playing',
  components: {
    'music-item': musicItem
  },
  data() {
    return {
      order: 0,
      musicUrl: '',
      lrcContent: '',
      currentTime: 0,
      currentIndex: -1,
      showList: false,
    }
  },
  computed: {
    ...mapState(['playingList', 'playingIndex']),
    lyrics() {
      let regExp = /\[\d{2}:\d{2}.\d{2,}\]/g,
        result = []

      this.lrcContent.split('\n').forEach(item => {
        let time = item.match(regExp),
          lyric = item.replace(regExp, '')

        // 防止出现多个时间
        if (time) {
          time.forEach(function(v1) {
            //去掉时间里的中括号得到xx:xx.xx
            var t = v1.slice(1, -1).split(':');
            //将结果压入最终数组
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), lyric])
          })
        }
      })

      return result
    }
  },
  methods: {
    ...mapMutations(['setplayIndex']),
    updateTime(e) {
      this.currentTime = e.target.currentTime
      while (this.lyrics[this.currentIndex + 1] && this.lyrics[this.currentIndex + 1][0] < this.currentTime) {
        this.currentIndex++
      }
      while (this.$refs.lyrics.scrollTop < this.currentIndex * 35) {
        this.$refs.lyrics.scrollTop += 1
      }
    },
    play(id) {
      this.playingList.forEach((item, index) => {
        if (item.id === id && this.playingIndex !== index) {
          this.setplayIndex({ index })
        }
      })
    },
  },
  watch: {
    playingIndex() {
      if (this.playingIndex === -1) {
        return
      }
      let music = this.playingList[this.playingIndex]
      
    }
  }
}
</script>

<style scoped>
.app {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.control,
.lyrics {
  width: 50%;
}

.lyrics {
  padding-top: calc(25% + 25px);
  padding-bottom: calc(25% + 25px);
  text-align: center;
  background: linear-gradient(to bottom, #20a0ff, white 15%, white 85%, #20a0ff);
  overflow-x: hidden;
  overflow-y: auto;
}

.played {
  opacity: 0.2;
}

.playing {
  opacity: 1;
  color: #20a0ff;
  font-weight: 900;
}

.icon {
  width: 15px;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background: #20a0ff;
  color: #fff;
}

.list {
  width: 0px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.list.show {
  width: 300px;
  flex-shrink: 0;
}

audio {
  /* display: none; */
}
</style>

<template>
  <div id="app">
    <div class="left-margin">
      <div class="left-item" :class="{selected: selectedItem === 0}" @click="changeTab(0)">
        <img :src="getFacial" alt="" class="facial">
      </div>
      <div class="left-item" :class="{selected: selectedItem === 1}" @click="changeTab(1)">
        <i class="left-icon el-icon-search"></i>
      </div>
    </div>
    <div class="right-margin">
      <div class="content">
        <router-view></router-view>
      </div>
      <div id="playDom"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import cplayer from 'cplayer'

export default {
  name: 'my-music',
  data() {
    return {
      name: '',
      selectedItem: 0,
      cPlayer: {},
    }
  },
  mounted() {
    this.cPlayer = new cplayer({
      element: document.getElementById('playDom'),
      playlist: [
      ],
      width: '100%',
      dropDownMenuMode: 'top',
      autoplay: true,
      style: `.cp-drop-down-menu.cp-drop-down-menu-top.cp-drop-down-menu-playlist{max-height: 300px;overflow-y:auto;}
      .cp-drop-down-menu.cp-drop-down-menu-top.cp-drop-down-menu-playlist::-webkit-scrollbar {width: 4px;background-color: transparent;}
      .cp-drop-down-menu.cp-drop-down-menu-top.cp-drop-down-menu-playlist::-webkit-scrollbar-thumb {background-color: var(--liteColor);border-radius: 10px;}
      .cp-drop-down-menu.cp-drop-down-menu-top.cp-drop-down-menu-playlist::-webkit-scrollbar-track {background-color: transparent;}`,
    })
  },
  computed: {
    ...mapGetters(['getFacial']),
    ...mapState(['playingList', 'playingIndex']),
  },
  methods: {
    changeTab(item) {
      this.selectedItem = item
      if (item === 0) {
        this.$router.push({ name: 'user-profile' })
      } else if (item === 1) {
        this.$router.push({ name: 'home' })
      }
    }
  },
  watch: {
    playingList: {
      handler: function(nVal) {
        let i = nVal.length - 1, music = nVal[i]
        this.cPlayer.add(music)
      },
      deep: true,
    }
  },
}
</script>

<style scoped>
/* CSS */

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
}

.left-margin {
  width: 50px;
  flex-shrink: 0;
  /* margin-right: 5px; */
  box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #ccc;
}

.right-margin {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.content {
  width: 100%;
  flex-grow: 1;
  display: flex;
}

#playDom {
  width: 100%;
  min-height: 50px;
  flex-shrink: 0;
  align-self: flex-end;
}

.left-item {
  width: 100%;
  margin: 2px 0px;
  text-align: center;
  cursor: pointer;
  padding: 5px 0px;
}

.left-item:hover {
  background: #20a0ff;
}

.left-item.selected {
  background: #20a0ff;
}

.facial {
  width: 40px;
  height: 40px;
  border-radius: 30px;
}

.left-icon {
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
}

.playing:hover {
  animation: rotate 1s linear infinite;
}

.selected .playing {
  animation: rotate 1s linear infinite;
}

@-webkit-keyframes rotate {
  from {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
</style>

<template>
  <div id="app">
    <div class="left-margin">
      <div class="left-item" :class="{selected: selectedItem === 0}" @click="changeTab(0)">
        <img :src="getFacial" alt="" class="facial">
      </div>
      <div class="left-item" :class="{selected: selectedItem === 1}" @click="changeTab(1)">
        <i class="left-icon el-icon-search"></i>
      </div>
      <div class="left-item" :class="{selected: selectedItem === 2}" @click="changeTab(2)">
        <img src="./assets/playing.jpg" alt="" class="facial playing">
      </div>
    </div>
    <div class="right-margin">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from './config'
import { interceptors } from './lib/myUtils'
import { mapGetters } from 'vuex'

export default {
  name: 'my-music',
  data() {
    return {
      name: '',
      selectedItem: 0,
    }
  },
  mounted() {
    // 测试登陆
    // this.$http.get(config.baseUrl + 'login/cellphone?phone=18951656987&password=asd123456')
    //   .then(interceptors)
    //   .then(data => {
    //     this.name = data.profile.nickname
    //     console.log('个人信息', data.profile)
    //   })
  },
  computed: {
    ...mapGetters(['getFacial']),
  },
  methods: {
    changeTab(item) {
      this.selectedItem = item
      if (item === 0) {
        this.$router.push({ name: 'user-profile' })
      } else if (item === 1) {
        this.$router.push({ name: 'home' })
      } else if (item === 2) {
        this.$router.push({ name: 'playing' })
      }
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
  flex-grow: 1;
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

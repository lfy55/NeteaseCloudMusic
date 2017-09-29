<template>
  <div id="app">
    <div class="left-margin"></div>
    <div class="right-margin">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from './config'
import { interceptors } from './lib/myUtils'

export default {
  name: 'my-music',
  data() {
    return {
      name: '',
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
  width: 25%;
  flex-shrink: 0;
}

.right-margin {
  width: 75%;
}
</style>

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import defaultFacialPhoto from '@/assets/facial.png'

export default new Vuex.Store({
  state: {
    user: {
      accountStatus: 0,
      authStatus: 0,
      authority: 0,
      avatarImgId: 18665309395108830,
      avatarImgIdStr: "18665309395108831",
      avatarImgId_str: "18665309395108831",
      avatarUrl: "http://p1.music.126.net/A2KIb3BWfbYOwoooiZoj3w==/18665309395108831.jpg",
      backgroundImgId: 109951162868126480,
      backgroundImgIdStr: "109951162868126486",
      backgroundUrl: "http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg",
      birthday: 602438400000,
      blacklist: false,
      city: 320100,
      defaultAvatar: false,
      description: "",
      detailDescription: "",
      djStatus: 0,
      eventCount: 0,
      expertTags: null,
      experts: {},
      followed: false,
      followeds: 0,
      follows: 3,
      gender: 0,
      mutual: false,
      nickname: "客户端测试",
      playlistBeSubscribedCount: 0,
      playlistCount: 1,
      province: 320000,
      remarkName: null,
      signature: "客户端测试账号",
      userId: 604243382,
      userType: 0,
      vipType: 0,
    },
    playingList: [],
    playIndex: -1,
  },
  mutations: {
    changeUser(state, { user }) {
      state.user = user
    },
  },
  getters: {
    getFacial(state) {
      return state.user.avatarUrl || defaultFacialPhoto
    },
    isLogged(state) {
      return !!state.user.avatarUrl
    }
  },
})

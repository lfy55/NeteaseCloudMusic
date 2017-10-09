import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import defaultFacialPhoto from '@/assets/facial.png'

export default new Vuex.Store({
  state: {
    user:
    {
      accountStatus: 0,
      authStatus: 0,
      authority: 0,
      avatarImgId: 3404088001899508,
      avatarImgIdStr: "3404088001899508",
      avatarUrl: "http://p1.music.126.net/ArbWAwAk6RXMFVat5ZSKgA==/3404088001899508.jpg",
      backgroundImgId: 1383185640497915,
      backgroundImgIdStr: "1383185640497915",
      backgroundUrl: "http://p1.music.126.net/hxZDEMCFyKdEbkKRP7PUdQ==/1383185640497915.jpg",
      birthday: 775670400000,
      city: 621200,
      defaultAvatar: false,
      description: "",
      detailDescription: "",
      djStatus: 0,
      expertTags: null,
      experts: {},
      followed: false,
      gender: 1,
      mutual: false,
      nickname: "真厶简单",
      province: 620000,
      remarkName: null,
      signature: "ACG控desu！",
      userId: 90423320,
      userType: 0,
      vipType: 0,
    },
    playingList: [],
    playingIndex: -1,
  },
  mutations: {
    changeUser(state, { user }) {
      state.user = user
    },
    addMusicToPlaying(state, { music }) {
      let canAdd = state.playingList.every(item => item.id !== music.id)
      if (canAdd) {
        state.playingList.unshift(music)
      }
      state.playingIndex = 0
    },
    setplayIndex(state, { index }) {
      state.playingIndex = index
    }
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

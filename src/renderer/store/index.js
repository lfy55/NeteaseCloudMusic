import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

import defaultFacialPhoto from '@/assets/facial.png'
import config from '@/config'
import { interceptors } from '@/lib/myUtils'

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
      state.playingList.push(music)
      state.playingIndex = state.playingIndex + 1
    },
  },
  actions: {
    addMusic({ state, commit }, { music }) {
      let canAdd = state.playingList.length === 0 || state.playingList.every(item => item.id !== music.id)
      if (canAdd) {
        let musicObj = {
          id: music.id,
          name: music.name,
          artist: music.aName,
          poster: music.al.picUrl,
          myMusic: music,
        }
        axios.get(config.baseUrl + 'music/url?id=' + music.id)
          .then(interceptors)
          .then(data => {
            // console.log('获取音乐url', data)
            musicObj.src = data.data.data[0].url

            return axios.get(config.baseUrl + 'lyric?id=' + music.id)
          })
          .then(interceptors)
          .then(data => {
            // console.log('获取歌词', data)
            musicObj.lyric = ''
            if (!data.data.nolyric) {
              musicObj.lyric = data.data.lrc.lyric
            }
            if (data.data.tlyric && data.data.tlyric.lyric) {
              musicObj.sublyric = data.data.tlyric.lyric
            }
            // console.log(musicObj)
            commit('addMusicToPlaying', { music: musicObj })
          })
      }
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

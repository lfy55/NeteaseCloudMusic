<template>
  <div class="music" @click="playing" :class="{isPlay: isplaying}">
    <div class="img-margin">
      <img :src="music.al.picUrl" alt="">
    </div>
    <div class="msg-margin">
      <span class="name">{{music.name}}</span>
      <span class="aName">歌手:{{music.aName||'群星'}}&nbsp;时长:{{music.dt}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['music', 'isplaying'],
  methods: {
    playing() {
      this.$emit('playing', this.music )
    },
  }
}
</script>

<style scoped>
.music {
  width: 100%;
  height: 75px;
  display: flex;
  margin: 5px 0px;
  cursor: pointer;
}

.music.isPlay {
  border: 1px solid #20a0ff;
}

.img-margin {
  width: 75px;
  height: 75px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
}

.img-margin img {
  max-width: 75px;
  max-height: 75px;
}

.msg-margin {
  flex-grow: 1;
  height: 100%;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.name {
  color: #20a0ff;
  font-size: 20px;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
  white-space: nowrap;
}

.aName {
  color: #10d0cc;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 400px;
  white-space: nowrap;
}
</style>

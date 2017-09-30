<template>
  <div class="item" @click.stop="clickItem">
    <div class="img-margin">
      <img :src="item.coverImgUrl" alt="">
    </div>
    <div class="item-content">
      <p>
        <span class="msg-title">歌单名称:</span>
        <span class="msg-content">{{item.name}}</span>
      </p>
      <p>
        <span class="msg-title">创建者:</span>
        <span class="msg-content">{{item.creator.nickname}}</span>
      </p>
      <p>
        <span class="msg-title">创建时间:</span>
        <span class="msg-content">{{item.createTime|dateToString}}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['item'],
  methods: {
    clickItem() {
      this.$emit('clickMusicList', this.item.id)
    }
  },
}
</script>
<style scoped>
.item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
}

.item:hover {
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
}

.img-margin {
  width: 100px;
  height: 100px;
  text-align: center;
  flex-shrink: 0;
  margin: 0px 5px;
}

.img-margin>img {
  max-width: 100%;
  max-height: 100%;
}

.item-content {
  flex-grow: 1;
  height: 100%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-content>p {
  margin: 5px 0px;
  display: block;
  text-align: left;
  line-height: 1;
}

.msg-title {
  width: 80px;
  display: inline-block;
  font-size: 14px;
}

.msg-content {
  color: var(--liteColor);
}
</style>

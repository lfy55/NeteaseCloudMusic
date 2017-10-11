<template>
  <canvas @click="reInit" ref="myCanvas">
  </canvas>
</template>

<script>
export default {
  name: 'ribbon',
  data() {
    return {
      initMethed: null,
    }
  },
  mounted() {
    let canvasDom = this.$refs.myCanvas,
      ctx = canvasDom.getContext('2d'),
      w = canvasDom.offsetWidth,
      h = canvasDom.offsetHeight,
      RIBBON_WIDTH = 60,
      random = Math.random, //  生成随机数
      path = [], //  用来存放路径绘制的两个点
      cos = Math.cos,
      r = 0,
      PI_2 = Math.PI * 2

    // 修改 canvas 的宽度和高度
    canvasDom.width = w
    canvasDom.height = h
    // 设置整个 canvas 的图形透明度
    ctx.globalAlpha = 0.6

    this.initMethed = function() {
      ctx.clearRect(0, 0, w, h)
      let startY = h * random()
      path = [
        {
          x: 0,
          y: startY,
        },
        {
          x: 0,
          y: startY - RIBBON_WIDTH,
        },
      ]
      while (path[1].x < w) {
        draw(path[0], path[1])
      }
    }

    function draw(start, end) {
      ctx.beginPath() // 创建路径
      ctx.moveTo(start.x, start.y)
      ctx.lineTo(end.x, end.y)
      let nextX = end.x + random() * 2 * RIBBON_WIDTH,
        nextY = end.y + (random() * 2 - 1) * RIBBON_WIDTH
      // next 超出上下边界时进行约束
      nextY = nextY < 0 ? 0 : nextY > h ? h : nextY
      ctx.lineTo(nextX, nextY)
      ctx.closePath()

      // 生成颜色
      r -= PI_2 / -50
      ctx.fillStyle = '#' + (cos(r) * 127 + 128 << 16 | cos(r + PI_2 / 3) * 127 + 128 << 8 | cos(r + PI_2 / 3 * 2) * 127 + 128).toString(16)
      ctx.fill()  // 填充

      path[0] = path[1]
      path[1] = { x: nextX, y: nextY }
    }

    this.initMethed()
  },
  methods: {
    reInit() {
      if (typeof this.initMethed === 'function') {
        this.initMethed()
      }
    }
  },
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>

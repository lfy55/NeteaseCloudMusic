<template>
  <div id="wrapper">
  </div>
</template>

<script>
export default {
  name: 'landing-page',
  mounted() {
    this.$router.push({ name: 'login-page', query: { userId: 123 } })
  },
  methods: {
  }
}
</script>

<style>

</style>

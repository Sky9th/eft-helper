<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
    export default {
        created () {
            this.$store.dispatch('getFingerprint')
            this.$store.dispatch('getUserInfo')
            this.$store.dispatch('isPhone')
            this.$store.dispatch('getConfig')
        }
    }
</script>

<style>
</style>

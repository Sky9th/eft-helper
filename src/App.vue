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
        }
    }
</script>

<style>
</style>

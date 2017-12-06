<template lang="pug">
  main
    mtn-header

    .main-container
      nuxt.app

    mtn-footer
</template>

<script>
import MtnFooter from '~/components/Footer.vue'
import MtnHeader from '~/components/Header.vue'

export default {
  components: { MtnFooter, MtnHeader }
}
</script>

<style lang="scss">
  .main-container {
    height: 86vh;
    overflow: auto;
    background: #fff;
  }

  .container-fluid {
    padding: 0 80px;
  }

  .app {
    padding-bottom: 100px;
    background: #fff !important;

    td {
      padding: 2px;
      font-size: 10px;
    }
  }
</style>

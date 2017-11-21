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
    height: 90vh;
    overflow: auto;
    background: #fff;
  }

  .app {
    padding-top: 150px;
    padding-bottom: 100px;
    background: #fff !important;

    td {
      padding: 5px;
      font-size: 10px;
    }
  }
</style>

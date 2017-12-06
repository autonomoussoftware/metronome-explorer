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

    .title-container {
      margin-bottom: 15px;
      h4 {
        margin-top: 10px;
      }
    }

    thead {
      th {
        border-top: 2px solid #7e61f8;
        border-bottom: 2px solid #7e61f8;
      }
    }

    td {
      padding: 15px 25px 15px 5px;
      font-size: 0.7em;
    }
  }
</style>

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

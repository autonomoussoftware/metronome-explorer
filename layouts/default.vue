<template lang="pug">
  main
    mtn-header

    //- mtn-status

    .main-container
      nuxt.app

    mtn-footer
</template>

<script>
import MtnFooter from '~/components/Footer.vue'
import MtnHeader from '~/components/Header.vue'
import MtnStatus from '~/components/Status.vue'

export default {
  components: { MtnFooter, MtnHeader, MtnStatus }
}
</script>

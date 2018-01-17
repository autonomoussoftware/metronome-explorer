<template lang="pug">
  main
    mtn-header

    h1.title
      | {{ error.statusCode }}
    h2.info
      | {{ error.message }}
    nuxt-link.button(to="/", v-if="error.statusCode === 404")
      | Homepage

    mtn-footer

</template>

<script>
import MtnFooter from '~/components/Footer.vue'
import MtnHeader from '~/components/Header.vue'

export default {
  components: { MtnFooter, MtnHeader },

  props: {
    error: { type: Object }
  }
}
</script>
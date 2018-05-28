<template lang="pug">
  main
    met-header

    .main-container
      nuxt.app

    met-footer
</template>

<script>
import MetFooter from '~/components/Footer.vue'
import MetHeader from '~/components/Header.vue'

export default {
  components: { MetFooter, MetHeader }
}
</script>

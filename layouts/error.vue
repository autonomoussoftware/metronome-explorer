<template lang="pug">
  section.container
    img.logo(src="../assets/img/logo.png", alt="Metronome")
    h1.title
      | {{ error.statusCode }}
    h2.info
      | {{ error.message }}
    nuxt-link.button(to="/", v-if="error.statusCode === 404")
      | Homepage
</template>

<script>
export default {
  props: {
    error: { type: Object }
  }
}
</script>
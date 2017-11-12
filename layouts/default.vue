<template lang="pug">
  main
    mtn-header

    //- #top.site-section.come-in
    //-   .container
    //-     h1.text-center
    //-       img.img-fluid(src="../assets/img/logo.png", alt="Metronome")
    //-       br
    //-       | Token Explorer
    .container
      nuxt
    mtn-footer
</template>

<script>
import MtnFooter from '~/components/Footer.vue'
import MtnHeader from '~/components/Header.vue'

export default {
  components: { MtnFooter, MtnHeader }
}
</script>

<template lang="pug">
  footer.container
    .row
      .col-sm-12
        mtn-status

    p Copyright &copy; {{ new Date().getFullYear() }} Bloq, Inc. All Rights Reseverd
      br
      | Metronome was build by &nbsp;
      a(href="https://bloq.com") BloqLabs.
</template>

<script>
import MtnStatus from '~/components/Status.vue'

export default {
  components: { MtnStatus }
}
</script>


<style lang="scss" scoped>
  @media (max-width: 768px) {
    .container {
      width: 90%;
    }
  }

  footer {
    height: 140px;
    padding: 22px 0;
    text-align: center;
    color: #4D4D4D;

    p {
      font-size: 0.9em;
      margin-bottom: 5px;
      margin-top: 0;
    }
  }
</style>

<template lang="pug">
  footer.container
    .row
      .col-sm-12
        met-status

    p Copyright &copy; {{ new Date().getFullYear() }} Bloq, Inc. All Rights Reserved
</template>

<script>
import MetStatus from '~/components/Status.vue'

export default {
  components: { MetStatus }
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
    color: #4d4d4d;

    p {
      font-size: 0.9em;
      margin-bottom: 5px;
      margin-top: 0;
    }
  }
</style>

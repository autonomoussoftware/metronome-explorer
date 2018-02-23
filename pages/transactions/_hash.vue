<template lang="pug">
  .container-fluid
    .row
      .col-sm-12
        h4 Transaction {{ transaction.hash }}
        pre
          code {{ transaction }}

      .col-sm-12
        h4 Raw Trace
        pre
          code {{ trace.result }}
</template>

<script>
import web3 from '~/services/web3'
import tracer from '~/services/tracer'

export default {
  name: 'TransactionDetail',

  async asyncData ({ params }) {
    const transaction = await web3.eth.getTransaction(params.hash)
    const trace = await tracer.transaction(params.hash)
    return { transaction, trace }
  },

  created () {},

  head () {
    return {
      title: `Transaction: ${this.transaction.hash} | Metronome Explorer`
    }
  }
}
</script>

<style lang="scss" scoped>
pre {
  max-width: 100%;
  overflow: auto;
}
</style>
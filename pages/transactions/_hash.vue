<template lang="pug">
  .container-fluid
    .row
      .col-sm-12
        h4 Transaction {{ transaction.hash }}
        pre
          code {{ transaction }}

      .col-sm-12(v-if="traces && traces.length")
        h4 Raw Trace
        pre
          code(v-for="t in traces") {{ t }}
</template>

<script>
import web3 from '~/services/web3'
import tracer from '~/services/tracer'

export default {
  name: 'TransactionDetail',

  data () {
    return {
      traces: null
    }
  },

  async asyncData ({ params, error }) {
    const transaction = await web3.eth.getTransaction(params.hash)
    if (!transaction) {
      return error({ statusCode: 404, message: `The transaction ${params.hash} was not found` })
    }

    try {
      const traces = await tracer.transaction(params.hash)
      return { transaction, traces }
    } catch (err) {
      return { transaction }
    }
  },

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

  code {
    display: block;
    margin-bottom: 10px;
  }
}
</style>
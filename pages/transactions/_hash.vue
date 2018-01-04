<template lang="pug">
  .container-fluid.transaction-container
    .row
      .col-sm-12
        h4 Transaction {{ transaction.hash }}
        pre
          code {{ transaction }}
</template>

<script>
import web3 from '~/services/web3'

export default {
  name: 'TransactionDetail',

  async asyncData ({ params }) {
    const transaction = await web3.eth.getTransaction(params.hash)
    return { transaction }
  },

  head () {
    return {
      title: `Transaction: ${this.transaction.hash} | Metronome Explorer`
    }
  }
}
</script>

<style lang="scss" scoped>
  .transaction-container {
    margin-top: 50px;
  }

  pre {
    max-width: 100%;
    overflow: auto;
  }
</style>
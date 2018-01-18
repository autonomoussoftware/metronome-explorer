<template lang="pug">
.container-fluid
  .row
    .col.text-center
      mtn-loader(:width="44")
  .row
    .col-sm-12.col-md-4.ellipsis
      span.title Current Price
      span.violet {{ auctionStatus.currentPrice | eth }}

    .col-sm-12.col-md-2.ellipsis
      span.title Block Height
      span.violet {{ block.number }}

    .col-sm-12.col-md-6.ellipsis
      span.title Token Circulation
      span.violet {{ auctionStatus.tokenCirculation | mtn }}

  .row
    .col-sm-12.col-md-8.ellipsis
      span.title Contract Address
      span.violet {{ tokenAddress }}

    .col-sm-12.col-md-2.ellipsis
      span.title Connection
      b(:class="wsStatus === 'ON' ? 'green' : 'red'") {{ wsStatus }}
</template>

<script>
import MtnLoader from '~/components/Loader'

import web3 from '~/services/web3'
import socketService from '~/services/socket.io.js'
import statusService from '~/services/status'
import configService from '~/services/config'

export default {

  components: { MtnLoader },

  data () {
    return {
      block: {},
      tokenAddress: '',
      auctionStatus: {},
      apiStatus: 'ERROR',
      wsStatus: 'OFF'
    }
  },

  async created () {
    socketService.on('connect', () => (this.wsStatus = 'ON'))
    socketService.on('disconnect', () => (this.wsStatus = 'OFF'))
    socketService.on('AUCTION_STATUS_TASK', auctionStatus => (this.auctionStatus = auctionStatus))
    socketService.on('LATEST_BLOCK', block => (this.block = block))

    this.wsStatus = socketService.connected ? 'ON' : 'OFF'

    const config = await configService.get()
    this.tokenAddress = config.tokenAddress

    const apiStatus = await statusService.get()
    this.apiStatus = apiStatus

    const block = await web3.eth.getBlock('latest')
    this.block = block
  }
}
</script>


<style lang="scss" scoped>
  @media (max-width: 768px) {
    .container-fluid {
      text-align: left;
    }
  }

  .container-fluid {
    font-size: 0.9em;
    margin-bottom: 20px;
    padding: 0 5px;
  }

  .title {
    margin-right: 5px;
  }
</style>


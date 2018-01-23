<template lang="pug">
.container-fluid
  .row(v-show="isLoading")
    .col.text-center
      mtn-loader(:width="44")

  .row(v-show="!isLoading")
    .col-sm-12.col-md-4.ellipsis
      span.title Current Price
      span.violet {{ auctionStatus.currentPrice | eth }}

    .col-sm-12.col-md-2.ellipsis
      span.title Block Height
      span.violet {{ block.number }}

    .col-sm-12.col-md-6.ellipsis
      span.title Token Circulation
      span.violet {{ auctionStatus.tokenCirculation | mtn }}

  .row(v-show="!isLoading")
    .col-sm-12.col-md-8.ellipsis
      span.title Contract Address
      span.violet {{ tokenAddress }}

    .col-sm-12.col-md-2.ellipsis
      span.title Connection
      b(:class="apiStatus === 'ON' ? 'green' : 'red'") {{ apiStatus }}
</template>

<script>
import MtnLoader from '~/components/Loader'

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
      apiStatus: 'OFF',
      isLoading: true
    }
  },

  async created () {
    socketService.on('connect', () => (this.wsStatus = 'ON'))
    socketService.on('disconnect', () => (this.wsStatus = 'OFF'))
    socketService.on('AUCTION_STATUS_TASK', auctionStatus => (this.auctionStatus = auctionStatus))
    socketService.on('LATEST_BLOCK', block => (this.block = block))

    const results = await this.getStatus()
    this.tokenAddress = results[0].tokenAddress
    this.apiStatus = socketService.connected && results[1] === 204 ? 'ON' : 'OFF'
    this.isLoading = false
  },

  methods: {
    async getStatus () {
      return Promise.all([configService.get(), statusService.get()])
    }
  }
}
</script>


<style lang="scss" scoped>
.green { color: green }
.red { color: tomato }
.violet { color: #7e61f8 }

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


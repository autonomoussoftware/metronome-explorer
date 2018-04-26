<template lang="pug">
.container-fluid
  .row(v-show="isLoading")
    .col.text-center
      mtn-loader(:width="44")

  .row(v-show="!isLoading")
    .col-sm-12.col-md-4.ellipsis
      span.title Current Price
      span.violet(v-if="auctionStatus.currentPrice") {{ auctionStatus.currentPrice | eth }}
      span.violet(v-else) ...

    .col-sm-12.col-md-2.ellipsis
      span.title Block Height
      span.violet(v-if="block.number") {{ block.number }}
      span.violet(v-else) ...

    .col-sm-12.col-md-6.ellipsis
      span.title Token Circulation
      span.violet(v-if="auctionStatus.tokenCirculation") {{ auctionStatus.tokenCirculation | mtn }}
      span.violet(v-else) ...

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

import Metronome from '~/services/metronome'
import statusService from '~/services/status'
import socketService from '~/services/socket.io.js'

export default {

  components: { MtnLoader },

  data () {
    return {
      block: {},
      tokenAddress: Metronome.MET_TOKEN_ADDRESS,
      auctionStatus: {},
      apiStatus: 'OFF',
      isLoading: true
    }
  },

  async mounted () {
    socketService.on('connect', () => (this.wsStatus = 'ON'))
    socketService.on('disconnect', () => (this.wsStatus = 'OFF'))
    socketService.on('AUCTION_STATUS_TASK', auctionStatus => (this.auctionStatus = auctionStatus))
    socketService.on('LATEST_BLOCK', block => (this.block = block))

    const status = await this.getStatus()
    this.apiStatus = socketService.connected && status === 204 ? 'ON' : 'OFF'
    this.isLoading = false
  },

  destroyed () {
    socketService.removeAllListeners()
  },

  methods: {
    async getStatus () {
      return statusService.get()
    }
  }
}
</script>


<style lang="scss" scoped>
  .green {
    color: green
  }

  .red {
    color: tomato
  }

  .violet {
    color: #7e61f8
  }

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


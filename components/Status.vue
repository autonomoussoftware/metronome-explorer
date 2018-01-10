<template lang="pug">
  .container-fluid
    .row
      .col-sm-7.offset-sm-5
        table.table
          tbody
            tr
              td
                b.violet Current Price
              td {{ auctionStatus.currentPrice | eth }}
              td
                b.violet Last Block
              td {{ block.number }}
            tr
              td
                b.violet Token Circulation
              td {{ auctionStatus.tokenCirculation | mtn }}
              td
                b.violet Connection
              td
                b(:class="wsStatus === 'ON' ? 'green' : 'red'") {{ wsStatus }}

            tr
              td
                b.violet Contract Address
              td {{ tokenAddress }}
</template>

<script>
import web3 from '~/services/web3'
import socketService from '~/services/socket.io.js'
import statusService from '~/services/status'
import configService from '~/services/config'

export default {

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
  .container-fluid {
    background: #EDEDED;
    padding: 25px 80px 0 80px;

    .green {
      color: green
    }

    .red {
      color: tomato
    }

    table {
      line-height: 0;
      font-size: 0.7em;

      td {
        border-bottom: 1px solid #fff;
      }
    }

    .violet {
      color: #7e61f8;
    }

    h6 {
      text-transform: uppercase;
      font-weight: 500;
      span {
      color: #000
      }
    }

    p {
      margin-bottom: 0;
    }
  }
</style>


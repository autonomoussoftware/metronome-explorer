<template lang="pug">
.container-fluid.account-container
  .row
    .col-sm-12
      h4.title Account {{ $route.params.address }}
    .col-sm-12
      p Balance: {{ balance | mtn }}
  .row
    .col
      mtn-event-table(:events="events", :count="events.length", :show-pagination="false")
</template>

<script>
import eventService from '~/plugins/event'
import accountService from '~/plugins/account'

import MtnEventTable from '~/components/EventTable'

export default {
  name: 'AccountDetail',

  components: { MtnEventTable },

  data () {
    return {
      events: [],
      balance: 0
    }
  },

  async asyncData ({ params }) {
    let { events } = await eventService.getByAccount(params.address, { $sort: '-metaData.timestamp' })
    let { balance } = await accountService.getByAddress(params.address)
    return { events, balance }
  },

  head () {
    return {
      title: `Account: ${this.$route.params.address}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .account-container {
    margin-top: 50px;
  }

  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
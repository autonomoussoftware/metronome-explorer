<template lang="pug">
.container-fluid
  .row
    .col
      h2.title Account {{ $route.params.address }}
      p Balance: {{ balance }}
  .row
    .col
      mtn-event-table(:events="events")
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
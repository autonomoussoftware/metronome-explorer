<template lang="pug">
.container-fluid.account-container
  .row.title-container
    .col-sm-8
      h4.title Account {{ $route.params.address }}
      p
        b Balance: {{ balance | mtn }}
    .col-sm-4
      mtn-account-filter(:filter.sync="filter")
  .row
    .col
      mtn-event-table(
        v-show="filteredEvents.length", :events="filteredEvents",
        :count="events.length", :show-pagination="false"
      )
      p(v-show="!filteredEvents.length") No events were found.
</template>

<script>
import eventService from '~/services/event'
import accountService from '~/services/account'

import MtnEventTable from '~/components/EventTable'
import MtnAccountFilter from '~/components/AccountFilter'

export default {
  name: 'AccountDetail',

  components: { MtnEventTable, MtnAccountFilter },

  data () {
    return {
      filter: '',
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
  },

  computed: {
    filteredEvents () {
      if (!this.filter) { return this.events }

      return this.events.filter(e => {
        if (!e.metaData.returnValues._to || !e.metaData.returnValues._from) { return false }

        return (e.metaData.returnValues._to.includes(this.filter)) ||
          (e.metaData.returnValues._from.includes(this.filter))
      })
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
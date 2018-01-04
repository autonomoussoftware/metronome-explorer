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
        v-show="filteredEvents.length", :events="filteredEvents", :count="count",
        :skip="skip", :has-ended="hasEnded", :show-pagination="showPagination",
        @next-page="getNextPage", @previous-page="getPreviousPage"
      )
      p(v-show="!filteredEvents.length") No events were found.
</template>

<script>
import eventService from '~/services/event'
import accountService from '~/services/account'

import MtnEventTable from '~/components/EventTable'
import MtnAccountFilter from '~/components/AccountFilter'

const LIMIT = 5

export default {
  name: 'AccountDetail',

  components: { MtnEventTable, MtnAccountFilter },

  data () {
    return {
      filter: '',
      skip: 0,
      hasEnded: false,
      count: 0,
      events: [],
      balance: 0
    }
  },

  async asyncData ({ params }) {
    const { events, count } = await eventService.getByAccount(params.address, {
      $sort: '-metaData.timestamp',
      $limit: LIMIT
    })

    const hasEnded = count <= LIMIT

    let { balance } = await accountService.getByAddress(params.address)

    return { events, count, hasEnded, balance }
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
    },

    showPagination () {
      return !this.filter
    }
  },

  methods: {
    async getEvents () {
      this.hasEnded = false

      let { events } = await eventService.getByAccount(this.$route.params.address, {
        $sort: '-metaData.timestamp',
        $limit: LIMIT,
        $skip: this.skip
      })

      if (!events || !events.length) {
        this.hasEnded = true
        return
      }

      if (events.length < LIMIT) {
        this.hasEnded = true
      }

      this.events = events
    },

    getNextPage () {
      if (!this.skip) { return }
      this.skip -= LIMIT
      this.getEvents()
    },

    getPreviousPage () {
      if (this.skip >= this.count) { return }
      this.skip += LIMIT
      this.getEvents()
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
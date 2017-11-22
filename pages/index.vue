<template lang="pug">
.container-fluid
  .row
    .col
      h2.title Recent Transactions
    .col
      input.form-control(type="search", v-model="filter", placeholder="Filter...")
  .row
    .col
      mtn-event-table(
        :events="filteredEvents", :count="count", :skip="skip", :has-ended="hasEnded"
        @next-page="getNextPage", @previous-page="getPreviousPage"
      )
</template>

<script>
import socketMixin from '~/mixins/socket'
import eventService from '~/plugins/event'

import MtnEventTable from '~/components/EventTable'

const limit = 20

export default {
  name: 'EventList',

  mixins: [socketMixin],
  components: { MtnEventTable },

  data () {
    return {
      skip: 0,
      limit,
      filter: '',

      hasEnded: false
    }
  },

  computed: {
    filteredEvents () {
      if (!this.filter) { return this.events }

      return this.events.filter(e => {
        return (e.metaData.returnValues._to.includes(this.filter)) ||
          (e.metaData.returnValues._from.includes(this.filter))
      })
    }
  },

  async asyncData () {
    let { events, count } = await eventService.get({
      $sort: '-metaData.timestamp',
      $limit: limit
    })
    return { events, count }
  },

  head () {
    return {
      title: 'Events'
    }
  },

  methods: {
    async getEvents () {
      this.hasEnded = false

      let { events } = await eventService.get({
        $sort: '-metaData.timestamp',
        $limit: this.limit,
        $skip: this.skip
      })

      if (!events || !events.length) {
        this.hasEnded = true
        return
      }

      if (events.length < this.limit) {
        this.hasEnded = true
      }

      this.events = events
    },

    getNextPage () {
      if (!this.skip) { return }
      this.skip -= this.limit
      this.getEvents()
    },

    getPreviousPage () {
      if (this.skip >= this.count) { return }
      this.skip += this.limit
      this.getEvents()
    }
  }
}
</script>

<style>
</style>

<template lang="pug">
div
  .container-fluid.about-container
    .row
      .col
        h6 About Metronome Explorer
        p Sunt qui voluptate excepteur est ullamco amet non et. Occaecat nostrud nulla velit dolore elit. In non ut et ut sunt ex nostrud excepteur minim sunt do occaecat deserunt exercitation. Mollit irure amet proident ea laboris labore ex aute dolore sunt. Amet pariatur in voluptate deserunt nostrud velit consequat. Ipsum elit nostrud reprehenderit non commodo officia. Eiusmod non duis qui duis occaecat.

  .container-fluid
    .row
      .col
        h2.title Recent Transactions
      .col
        .input-group
          span.input-group-btn
            button.btn.btn-secondary(@click="clearFilter")
              img(src="~/assets/svg/x.svg")
          input.form-control(type="search", v-model="filter", placeholder="Filter by account...")
    .row
      .col
        mtn-event-table(
          :events="filteredEvents", :count="count", :skip="skip", :has-ended="hasEnded",
          :show-pagination="showPagination",
          @next-page="getNextPage", @previous-page="getPreviousPage"
        )
</template>

<script>
import socketMixin from '~/mixins/socket'
import eventService from '~/plugins/event'

import MtnEventTable from '~/components/EventTable'
import MtnIcon from '~/components/Icon'

const limit = 20

export default {
  name: 'EventList',

  mixins: [socketMixin],
  components: { MtnEventTable, MtnIcon },

  data () {
    return {
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
    },

    showPagination () {
      return !this.filter
    }
  },

  async asyncData () {
    const { events, count } = await eventService.get({
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
    clearFilter () {
      this.filter = ''
    },

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

<style lang="scss" scoped>
  .about-container {
    h6 {
      text-transform: uppercase;
      font-weight: 500;
    }

    p {
      margin-bottom: 0;
    }

    background: #EDEDED;
    margin-bottom: 30px;
    padding: 40px 80px;
  }
</style>

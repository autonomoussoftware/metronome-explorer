<template lang="pug">
div
  .container-fluid.about-container
    .row
      .col
        h6 About Metronome Explorer
        p Sunt qui voluptate excepteur est ullamco amet non et. Occaecat nostrud nulla velit dolore elit. In non ut et ut sunt ex nostrud excepteur minim sunt do occaecat deserunt exercitation. Mollit irure amet proident ea laboris labore ex aute dolore sunt. Amet pariatur in voluptate deserunt nostrud velit consequat. Ipsum elit nostrud reprehenderit non commodo officia. Eiusmod non duis qui duis occaecat.

  .container-fluid
    .row.title-container
      .col-sm-8
        h4 Recent Transactions
      .col-sm-4
        .input-group
          //- span.input-group-btn
          input.form-control(type="text", v-model="filter", placeholder="Filter by account...")
          //- button.btn.btn-secondary(@click="clearFilter") &times;
          span.clear(@click="clearFilter") &times;
            //- img(src="~/assets/svg/x.svg")
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

    const hasEnded = count <= limit

    return { events, count, hasEnded }
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
    background: #EDEDED;
    margin-bottom: 30px;
    padding: 40px 80px;

    h6 {
      text-transform: uppercase;
      font-weight: 500;
    }

    p {
      margin-bottom: 0;
    }
  }

  .clear {
    margin-left: -10px;
    cursor: pointer;
    font-size: 1.3em;
  }

  input.form-control, input.form-control:focus {
    border: none;
    border-bottom: 2px solid #7e61f8;
    color: #000;
    box-shadow: none;
  }
</style>

<template lang="pug">
.container-fluid
  .row
    .col
      h2.title Recent Transactions
  .row
    .col
      mtn-event-table(:events="events")
</template>

<script>
import socketMixin from '~/mixins/socket'
import eventService from '~/plugins/event'

import MtnEventTable from '~/components/EventTable'

export default {
  name: 'EventList',

  mixins: [socketMixin],
  components: { MtnEventTable },

  async asyncData () {
    let { events } = await eventService.get({
      $sort: '-metaData.timestamp'
    })
    return { events }
  },

  head () {
    return {
      title: 'Events'
    }
  }
}
</script>

<style>
</style>

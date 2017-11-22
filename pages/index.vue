<template lang="pug">
.container-fluid
  .row
    .col
      h1.title Recent Transactions
  .row
    .col
      mtn-event-table(:events="events")
</template>

<script>
import eventService from '~/plugins/event'
import socket from '~/plugins/socket.io.js'

import MtnEventTable from '~/components/EventTable'

export default {
  components: { MtnEventTable },

  data () {
    return {
      events: []
    }
  },

  async asyncData () {
    let { events } = await eventService.get()
    return { events }
  },

  created () {
    socket.on('event', (event) => {
      console.log(event)
    })
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

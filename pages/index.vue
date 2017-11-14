<template lang="pug">
  section
    h1.title Recent Transactions
    mtn-event-table(:events="events")
</template>

<script>
import MtnEventTable from '~/components/EventTable'
import axios from '~/plugins/axios'

export default {
  components: { MtnEventTable },

  async asyncData () {
    let { data } = await axios.get('/api/event')
    return { events: data }
  },

  head () {
    return {
      title: 'Events'
    }
  }
}
</script>

<style>
  td {
    padding: 5px;
  }
</style>

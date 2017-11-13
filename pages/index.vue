<template lang="pug">
  section
    h1.title Recent Transactions
    table.table
      thead
        tr
          th ID
          th Type
          th From
          th To
          th Amount
          th Date
      tbody
        tr(v-for='e in events', :key='e._id')
          td
            nuxt-link(:to="{ name: 'event-id', params: { id: e._id }}") {{ e._id }}
          td {{ e.event }}
          td
            nuxt-link(:to="{ name: 'account-id', params: { id: e.args._from }}") {{ e.args._from }}
          td {{ e.args._to }}
          td {{ e.args._value }}
          td {{ new Date(e.timestamp) }}
</template>

<script>
import axios from '~/plugins/axios'

export default {
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

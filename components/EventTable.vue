<template lang="pug">
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
          td
            nuxt-link(:to="{ name: 'account-id', params: { id: e.args._to }}") {{ e.args._to }}
          td {{ e.args._value }}
          td {{ new Date(e.timestamp * 1000) | moment('from') }}
</template>

<script>
export default {

  props: {
    events: {
      type: Array,
      default: () => []
    }
  }
}
</script>


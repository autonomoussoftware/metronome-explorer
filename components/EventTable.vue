<template lang="pug">
div.justify-content-center
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
          td {{ e.metaData.event }}
          td
            nuxt-link(v-if="e.metaData.returnValues", :to="{ name: 'account-id', params: { id: e.metaData.returnValues._from }}") {{ e.metaData.returnValues._from }}
            span(v-else) N/A
          td
            nuxt-link(v-if="e.metaData.returnValues", :to="{ name: 'account-id', params: { id: e.metaData.returnValues._to }}") {{ e.metaData.returnValues._to }}
            span(v-else) N/A
          td
            span(v-if="e.metaData.returnValues") {{ e.metaData.returnValues._value }}
            span(v-else) N/A
          td {{ new Date(e.metaData.timestamp * 1000) | moment('from') }}

  nav
    ul.pagination
      li.page-item
        a.page-link(href="#") Previous
      li.page-item
        a.page-link(href="#") Next
</nav>
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


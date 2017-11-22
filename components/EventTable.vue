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
            nuxt-link(v-if="e.metaData.returnValues", :to="{ name: 'account-address', params: { address: e.metaData.returnValues._from }}") {{ e.metaData.returnValues._from }}
            span(v-else) N/A
          td
            nuxt-link(v-if="e.metaData.returnValues", :to="{ name: 'account-address', params: { address: e.metaData.returnValues._to }}") {{ e.metaData.returnValues._to }}
            span(v-else) N/A
          td
            span(v-if="e.metaData.returnValues") {{ e.metaData.returnValues._value }}
            span(v-else) N/A
          td {{ new Date(e.metaData.timestamp * 1000) | moment('from') }}

  nav(v-if="count")
    ul.pagination
      li.page-item
        a.page-link(v-show="!hasEnded", @click="previousPage") Previous
      li.page-item
        a.page-link(v-show="skip", @click="nextPage") Next
</nav>
</template>

<script>
export default {

  props: {
    events: {
      type: Array,
      default: () => []
    },

    count: {
      type: Number,
      default: 0
    },

    skip: {
      type: Number,
      default: 0
    },

    hasEnded: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    previousPage () {
      this.$emit('previous-page')
    },

    nextPage () {
      this.$emit('next-page')
    }
  }
}
</script>


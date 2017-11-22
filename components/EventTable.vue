<template lang="pug">
div
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
            span(v-if="e.metaData.returnValues")
              nuxt-link(:to="{ name: 'account-address', params: { address: e.metaData.returnValues._from }}") {{ e.metaData.returnValues._from }}
              img.clippy(v-clipboard="e.metaData.returnValues._from", src="~/assets/svg/clippy.svg")
            span(v-else) N/A
          td
            span(v-if="e.metaData.returnValues")
              nuxt-link(:to="{ name: 'account-address', params: { address: e.metaData.returnValues._to }}") {{ e.metaData.returnValues._to }}
              img.clippy(v-clipboard="e.metaData.returnValues._to", src="~/assets/svg/clippy.svg")
            span(v-else) N/A
          td
            span(v-if="e.metaData.returnValues") {{ e.metaData.returnValues._value }}
            span(v-else) N/A
          td {{ new Date(e.metaData.timestamp * 1000) | moment('from') }}
  .row.d-flex
    .col.d-flex
      small {{ count }} transactions found
    .col.d-flex.justify-content-end
      nav(v-if="count && showPagination")
        ul.pagination
          li.page-item(:class="{ disabled: hasEnded }")
            a.page-link(@click="previousPage")
              span(aria-hidden="true") Previous
          li.page-item(:class="{ disabled: skip === 0 }")
            a.page-link( @click="nextPage")
              span(aria-hidden="true") Next
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
    },

    showPagination: {
      type: Boolean,
      default: true
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

<style lang="scss" scoped>
  .pagination {
    li {
      cursor: pointer;
    }

    li.disabled {
      cursor: not-allowed;
    }
  }

  .clippy {
    margin-left: 10px;
    cursor: copy;
  }
</style>

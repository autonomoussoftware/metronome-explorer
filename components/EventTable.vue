<template lang="pug">
div
  table.table.table-responsive
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
              nuxt-link(:to="{ name: 'account-address', params: { address: e.metaData.returnValues._from }}") {{ e.metaData.returnValues._from | minter }}
              //- img.clippy(v-clipboard="e.metaData.returnValues._from", src="~/assets/svg/clippy.svg")
            span(v-else) N/A
          td
            span(v-if="e.metaData.returnValues")
              nuxt-link(:to="{ name: 'account-address', params: { address: e.metaData.returnValues._to }}") {{ e.metaData.returnValues._to | minter }}
              //- img.clippy(v-clipboard="e.metaData.returnValues._to", src="~/assets/svg/clippy.svg")
            span(v-else) N/A
          td
            span(v-if="e.metaData.returnValues") {{ e.metaData.returnValues._value | mtn }}
            span(v-else) N/A
          td {{ new Date(e.metaData.timestamp * 1000) | moment('from') }}

  .row.d-flex
    .col-sm-10.d-flex.justify-content-start
      nav(v-if="count && showPagination")
        ul.pagination
          li.page-item
            a.btn(@click="previousPage", :class="{ disabled: hasEnded }")
              span(aria-hidden="true") Previous
          li.page-item
            a.btn( @click="nextPage", :class="{ disabled: skip === 0 }")
              span(aria-hidden="true") Next
    .col-sm-2.text-right
      small
        b {{ count }} transactions found.
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
    .btn {
      background: #EDEDED;
      margin-left: 5px;
      border: none;
      padding: 5px 15px;
      color: #7e61f8;
      text-transform: none;
      font-weight: 700;
    }
  }

  .clippy {
    margin-left: 10px;
    cursor: copy;
  }

  @media (min-width: 992px) {
    .table-responsive {
      display: table;
    }
  }
</style>

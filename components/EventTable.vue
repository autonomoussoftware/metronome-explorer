<template lang="pug">
div
  table.table.table-responsive
      thead.hidden-md-down
        tr
          th ID
          th Type
          th Date
          th From
          th To
          th.amount Amount
      tbody
        tr(v-for="e in events", :key="e._id")
          td.inline
            span.title ID
            nuxt-link(:to="{ name: 'events-id', params: { id: e._id }}") {{ e._id }}
          td.inline
            span.title Type
            span {{ e.metaData.event }}
          td.inline
            span.title Date
            mtn-text-tooltip(:text="new Date(e.metaData.timestamp * 1000) | moment('from')", :tooltip="new Date(e.metaData.timestamp * 1000) | moment('LLLL')")
          td
            span.title From
            span(v-if="e.metaData.returnValues && e.metaData.returnValues._from")
              b(v-if="e.metaData.returnValues._from === '0x0000000000000000000000000000000000000000'") MINTER
              nuxt-link(v-else, :to="{ name: 'accounts-address', params: { address: e.metaData.returnValues._from }}") {{ e.metaData.returnValues._from }}
            span(v-else-if="e.metaData.returnValues && e.metaData.returnValues._owner")
              b(v-if="e.metaData.returnValues._owner === '0x0000000000000000000000000000000000000000'") MINTER
              nuxt-link(v-else, :to="{ name: 'accounts-address', params: { address: e.metaData.returnValues._owner }}") {{ e.metaData.returnValues._owner }}
              //- img.clippy(v-clipboard="e.metaData.returnValues._from || e.metaData.returnValues._owner", src="~/assets/svg/clippy.svg")
            span(v-else) N/A
          td
            span.title To
            span(v-if="e.metaData.returnValues && e.metaData.returnValues._to")
              b(v-if="e.metaData.returnValues._to === '0x0000000000000000000000000000000000000000'") MINTER
              nuxt-link(:to="{ name: 'accounts-address', params: { address: e.metaData.returnValues._to }}") {{ e.metaData.returnValues._to }}
            span(v-else-if="e.metaData.returnValues && e.metaData.returnValues._spender")
              b(v-if="e.metaData.returnValues._spender === '0x0000000000000000000000000000000000000000'") MINTER
              nuxt-link(:to="{ name: 'accounts-address', params: { address: e.metaData.returnValues._spender }}") {{ e.metaData.returnValues._spender }}
              //- img.clippy(v-clipboard="e.metaData.returnValues._to", src="~/assets/svg/clippy.svg")
            span(v-else) N/A
          td.text-right
            span.title Amount
            span(v-if="e.metaData.returnValues") {{ e.metaData.returnValues._value | mtn }}
            span(v-else) N/A

  mtn-pagination(
    v-show="showPagination", :limit="limit", :page-count="events.length"
    :total-count="count", :skip="skip", :has-ended="hasEnded",
    @next-page="nextPage", @previous-page="previousPage"
  )
</nav>
</template>

<script>
import MtnPagination from '~/components/Pagination'
import MtnTextTooltip from '~/components/TextTooltip'

export default {

  components: { MtnPagination, MtnTextTooltip },

  props: {
    events: { type: Array, default: () => [] },
    count: { type: Number, default: 0 },
    limit: { type: Number, default: 0 },
    skip: { type: Number, default: 0 },
    hasEnded: { type: Boolean, default: false },
    showPagination: { type: Boolean, default: true }
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
  @media (min-width: 768px) {
    .table-responsive {
      display: table;
    }

    td {
      .title {
        display: none;
      }
    }
  }

  .amount {
    text-align: right;
    padding-right: 25px;
  }

  @media (max-width: 768px) {

    td {
      display: block;
      border-top: none;
      text-align: left !important;
      padding: 0;
      padding-top: 5px;

      .title {
        margin-right: 5px;
        color: #e9ecef;
      }

      &.inline {
        display: inline-block;
        padding-top: 15px;
        margin-right: 15px;
      }

      &:last-child {
        padding-bottom: 15px;
      }
    }

    tr {
      border-top: 1px solid #e9ecef;

      &:first-child {
        border: none;
      }
    }
  }
</style>

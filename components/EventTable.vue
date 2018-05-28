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
            met-text-tooltip(
              :text="new Date(e.metaData.timestamp * 1000) | moment('from')",
              :tooltip="new Date(e.metaData.timestamp * 1000) | moment('LLLL')"
            )
          td
            span.title From
            span(v-if="hasAddresses(e)")
              i.fa.fa-copy(v-clipboard="e.metaData.returnValues._from || e.metaData.returnValues._owner")
              b(v-if="isMinter(e)") MINTER
              a(v-else, @click="goToAddress(e)")
                b(v-if="isConverter(e)") CONVERTER
                span(v-else) {{ e.metaData.returnValues._from || e.metaData.returnValues._owner }}
            span(v-else) N/A
          td
            span.title To
            span(v-if="hasAddresses(e)")
              i.fa.fa-copy(v-clipboard="e.metaData.returnValues._to || e.metaData.returnValues._spender")
              a( @click="goToAddress(e, 'to')")
                b(v-if="isConverter(e, 'to')") CONVERTER
                span(v-else) {{ e.metaData.returnValues._to || e.metaData.returnValues._spender }}
            span(v-else) N/A
          td.text-right
            span.title Amount
            span(v-if="e.metaData.returnValues") {{ e.metaData.returnValues._value || 0 | met }}

  met-pagination(
    v-show="showPagination", :limit="limit", :page-count="events.length"
    :total-count="count", :skip="skip", :has-ended="hasEnded",
    @next-page="nextPage", @previous-page="previousPage"
  )
</nav>
</template>

<script>
import MetPagination from '~/components/Pagination'
import MetTextTooltip from '~/components/TextTooltip'

import eventService from '~/services/event'

export default {

  components: { MetPagination, MetTextTooltip },

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

    isMinter (event) {
      return eventService.isMinterEvent(event)
    },

    isConverter (event, type) {
      return eventService.isConverterEvent(event, type)
    },

    goToAddress (event, type) {
      const address = eventService.getEventAddress(event, type)

      this.$router.push({ name: 'accounts-address', params: { address } })
    },

    hasAddresses (event) {
      return eventService.hasEventAddress(event)
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

  .fa-copy {
    margin-right: 5px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .fa-copy {
      display: none;
    }

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

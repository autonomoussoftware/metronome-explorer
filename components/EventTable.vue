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
            nuxt-link(:to="{ name: 'events-id', params: { id: e._id }}") {{ e._id }}
          td {{ e.metaData.event }}
          td
            span(v-if="e.metaData.returnValues && e.metaData.returnValues._from")
              b(v-if="e.metaData.returnValues._from === '0x0000000000000000000000000000000000000000'") MINTER
              nuxt-link(v-else, :to="{ name: 'accounts-address', params: { address: e.metaData.returnValues._from }}") {{ e.metaData.returnValues._from }}
              //- img.clippy(v-clipboard="e.metaData.returnValues._from", src="~/assets/svg/clippy.svg")
            span(v-else) N/A
          td
            span(v-if="e.metaData.returnValues && e.metaData.returnValues._to")
              b(v-if="e.metaData.returnValues._to === '0x0000000000000000000000000000000000000000'") MINTER
              nuxt-link(:to="{ name: 'accounts-address', params: { address: e.metaData.returnValues._to }}") {{ e.metaData.returnValues._to }}
              //- img.clippy(v-clipboard="e.metaData.returnValues._to", src="~/assets/svg/clippy.svg")
            span(v-else) N/A
          td.text-right
            span(v-if="e.metaData.returnValues") {{ e.metaData.returnValues._value | mtn }}
            span(v-else) N/A
          td
            mtn-text-tooltip(:text="new Date(e.metaData.timestamp * 1000) | moment('from')", :tooltip="new Date(e.metaData.timestamp * 1000) | moment('LLLL')")

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

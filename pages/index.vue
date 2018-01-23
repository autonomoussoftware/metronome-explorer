<template lang="pug">
div
  .container-fluid
    .row.title-container
      .col-sm-8
        h4 Recent Events
      .col-sm-4
        mtn-account-filter.hidden-md-down(:filter.sync="filter")

    .row(v-show="isLoading")
      .col.text-center
        mtn-loader
    .row(v-show="!isLoading")
      .col
        mtn-event-table(
          v-show="filteredEvents.length", :events="filteredEvents", :count="count",
          :skip="skip", :has-ended="hasEnded", :show-pagination="showPagination",
          :limit="limit", @next-page="getNextPage", @previous-page="getPreviousPage"
        )
        p(v-show="!filteredEvents.length") No events were found.
</template>

<script>
import eventMixin from '~/mixins/event'

import MtnLoader from '~/components/Loader'
import MtnEventTable from '~/components/EventTable'
import MtnAccountFilter from '~/components/AccountFilter'

export default {
  name: 'EventList',

  mixins: [eventMixin],
  components: { MtnLoader, MtnEventTable, MtnAccountFilter },

  head () {
    return {
      title: 'Events | Metronome Explorer'
    }
  }
}
</script>

<template lang="pug">
  .container-fluid
    .row.title-container
      .col-sm-8
        h4 Recent Events
      .col-sm-4
        mtn-account-filter(:filter.sync="filter")

    .row
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

import MtnEventTable from '~/components/EventTable'
import MtnAccountFilter from '~/components/AccountFilter'

export default {
  name: 'EventList',

  mixins: [eventMixin],
  components: { MtnEventTable, MtnAccountFilter },

  head () {
    return {
      title: 'Events | Metronome Explorer'
    }
  }
}
</script>

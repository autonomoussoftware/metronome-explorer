<template lang="pug">
div
  .container-fluid.about-container
    .row
      .col
        h6 About Metronome Explorer
        p Sunt qui voluptate excepteur est ullamco amet non et. Occaecat nostrud nulla velit dolore elit. In non ut et ut sunt ex nostrud excepteur minim sunt do occaecat deserunt exercitation. Mollit irure amet proident ea laboris labore ex aute dolore sunt. Amet pariatur in voluptate deserunt nostrud velit consequat. Ipsum elit nostrud reprehenderit non commodo officia. Eiusmod non duis qui duis occaecat.

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
          @next-page="getNextPage", @previous-page="getPreviousPage"
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

<style lang="scss" scoped>
  .about-container {
    background: #EDEDED;
    margin-bottom: 30px;
    padding: 40px 80px;

    h6 {
      text-transform: uppercase;
      font-weight: 500;
    }

    p {
      margin-bottom: 0;
    }
  }
</style>

<template lang="pug">
.container-fluid
  .row.title-container
    .col-sm-8
      h4.ellipsis Account {{ address }}
      p
        b Balance: {{ balance | mtn }}
    .col-sm-4(v-show="events.length")
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

import eventService from '~/services/event'
import accountService from '~/services/account'
import socketService from '~/services/socket.io'

import MtnLoader from '~/components/Loader'
import MtnEventTable from '~/components/EventTable'
import MtnAccountFilter from '~/components/AccountFilter'

export default {
  name: 'AccountDetail',

  mixins: [eventMixin],
  components: { MtnLoader, MtnEventTable, MtnAccountFilter },

  data () {
    return {
      balance: 0,
      address: ''
    }
  },

  head () {
    return {
      title: `Account: ${this.address} | Metronome Explorer`
    }
  },

  async created () {
    this.address = this.$route.params.address
    this.isLoading = true
    const { balance } = await accountService.getByAddress(this.address)

    if (!balance) {
      return this.$error({
        statusCode: 404,
        message: `The address ${this.address} was not found`
      })
    }

    this.isLoading = false
    this.balance = balance
  },

  mounted () {
    socketService.on('BALANCE_UPDATED', account => {
      if (eventService.compareAddress(account.address, this.address)) {
        this.balance = account.balance
      }
    })
  }
}
</script>
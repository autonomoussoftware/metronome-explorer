<template lang="pug">
.container-fluid
  .row.title-container
    .col-sm-8
      h4.ellipsis Account {{ $route.params.address }}
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

import utilsService from '~/services/utils'
import socketService from '~/services/socket.io'
import accountService from '~/services/account'

import MtnLoader from '~/components/Loader'
import MtnEventTable from '~/components/EventTable'
import MtnAccountFilter from '~/components/AccountFilter'

export default {
  name: 'AccountDetail',

  mixins: [eventMixin],
  components: { MtnLoader, MtnEventTable, MtnAccountFilter },

  data () {
    return {
      balance: 0
    }
  },

  head () {
    return {
      title: `Account: ${this.$route.params.address} | Metronome Explorer`
    }
  },

  async created () {
    this.isLoading = true
    const address = this.$route.params.address

    try {
      const { balance } = await accountService.getByAddress(address)

      this.balance = balance
      this.isLoading = false
    } catch (err) {
      return this.$nuxt.error({
        statusCode: 404,
        message: `The address ${address} was not found`
      })
    }
  },

  mounted () {
    socketService.on('BALANCE_UPDATED', function (account) {
      if (utilsService.compareAddress(account.address, this.$route.params.address)) {
        this.balance = account.balance
      }
    })
  }
}
</script>
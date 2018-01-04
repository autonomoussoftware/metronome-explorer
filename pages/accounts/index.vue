<template lang="pug">
.container-fluid.account-container
  .row.title-container
    .col-sm-8
      h4 Accounts
    .col-sm-4
      mtn-account-filter(:filter.sync="filter")

  .row
    .col-sm-12
      table.table.table-responsive(v-show="filteredAccounts.length")
        thead
          tr
            th Address
            th Balance
            th Updated
        tbody
          tr(v-for='a in filteredAccounts', :key='a._id')
            td
              nuxt-link(:to="{ name: 'accounts-address', params: { address: a._id }}") {{ a._id }}
            td {{ a.balance | mtn }}
            td {{ a.updatedAt | moment('from') }}
      p(v-show="!filteredAccounts.length") No accounts were found.

  mtn-pagination(
    v-show="filteredAccounts.length && showPagination",
    :count="count", :skip="skip", :has-ended="hasEnded",
    @next-page="getNextPage", @previous-page="getPreviousPage"
  )

</template>

<script>
import accountService from '~/services/account'
import MtnPagination from '~/components/Pagination'
import MtnAccountFilter from '~/components/AccountFilter'

const LIMIT = 5

export default {
  name: 'AccountList',

  components: { MtnAccountFilter, MtnPagination },

  data () {
    return {
      filter: '',
      accounts: [],

      count: 0,
      skip: 0,
      hasEnded: false
    }
  },

  async asyncData ({ params }) {
    const { accounts, count } = await accountService.get({
      $sort: '-metaData.timestamp',
      $limit: LIMIT
    })

    const hasEnded = count <= LIMIT

    return { accounts, count, hasEnded }
  },

  computed: {
    filteredAccounts () {
      if (!this.filter) { return this.accounts }

      return this.accounts.filter(a => {
        if (!a._id) { return false }

        return a._id.includes(this.filter.toLowerCase())
      })
    },

    showPagination () {
      return !this.filter
    }
  },

  head () {
    return {
      title: 'Accounts | Metronome Explorer'
    }
  },

  methods: {
    async getAccounts () {
      this.hasEnded = false

      let { accounts } = await accountService.get({
        $sort: '-metaData.timestamp',
        $limit: LIMIT,
        $skip: this.skip
      })

      if (!accounts || !accounts.length) {
        this.hasEnded = true
        return
      }

      if (accounts.length < LIMIT) {
        this.hasEnded = true
      }

      this.accounts = accounts
    },

    getNextPage () {
      if (!this.skip) { return }
      this.skip -= LIMIT
      this.getAccounts()
    },

    getPreviousPage () {
      if (this.skip >= this.count) { return }
      this.skip += LIMIT
      this.getAccounts()
    }
  }
}
</script>

<style lang="scss" scoped>
  .account-container {
    margin-top: 50px;
  }

  @media (min-width: 992px) {
    .table-responsive {
      display: table;
    }
  }
</style>

<template lang="pug">
.container-fluid
  .row.title-container
    .col-sm-8
      h4 Accounts
    .col-sm-4
      mtn-account-filter.hidden-md-down(:filter.sync="filter")

  .row(v-show="isLoading")
      .col.text-center
        mtn-loader

  .row(v-show="!isLoading")
    .col-sm-12
      table.table.table-responsive(v-show="filteredAccounts.length")
        thead.hidden-md-down
          tr
            th Address
            th Balance
            th Updated At
        tbody
          tr(v-if="a._id !== '0x0000000000000000000000000000000000000000'", v-for='a in filteredAccounts', :key='a._id')
            td
              span.title ID
              nuxt-link(:to="{ name: 'accounts-address', params: { address: a._id }}") {{ a._id }}
            td
              span.title Balance
              span {{ a.balance | mtn }}
            td
              span.title Updated At
              span {{ a.updatedAt | moment('from') }}
      p(v-show="!filteredAccounts.length") No accounts were found.

      mtn-pagination(
        v-show="showPagination", :limit="limit", :page-count="accounts.length",
        :total-count="count", :skip="skip", :has-ended="hasEnded",
        @next-page="getNextPage", @previous-page="getPreviousPage"
      )

</template>

<script>
import MtnLoader from '~/components/Loader'
import MtnPagination from '~/components/Pagination'
import MtnAccountFilter from '~/components/AccountFilter'

import accountService from '~/services/account'

const LIMIT = 20

export default {
  name: 'AccountList',

  components: { MtnLoader, MtnAccountFilter, MtnPagination },

  data () {
    return {
      filter: '',
      accounts: [],

      count: 0,
      skip: 0,
      hasEnded: false,
      isLoading: false,
      limit: LIMIT
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
      return this.filteredAccounts.length && !this.filter
    }
  },

  head () {
    return {
      title: 'Accounts | Metronome Explorer'
    }
  },

  methods: {
    async getAccounts () {
      this.isLoading = true
      this.hasEnded = false

      let { accounts } = await accountService.get({
        $sort: '-metaData.timestamp',
        $limit: LIMIT,
        $skip: this.skip
      })

      this.setNewPage(accounts)
    },

    setNewPage (accounts) {
      this.isLoading = false

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

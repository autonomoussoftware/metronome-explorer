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
          tr(v-for='a in filteredAccounts', :key='a._id', v-if="a._id !== '0x0000000000000000000000000000000000000000'")
            td
              nuxt-link(:to="{ name: 'accounts-address', params: { address: a._id }}") {{ a._id }}
            td {{ a.balance | mtn }}
            td {{ a.updatedAt | moment('from') }}
      p(v-show="!filteredAccounts.length") No accounts were found.
</template>

<script>
import accountService from '~/services/account'
import MtnAccountFilter from '~/components/AccountFilter'

export default {
  name: 'AccountList',

  components: { MtnAccountFilter },

  data () {
    return {
      filter: '',
      accounts: []
    }
  },

  async asyncData ({ params }) {
    let { accounts } = await accountService.get()
    return { accounts }
  },

  computed: {
    filteredAccounts () {
      if (!this.filter) { return this.accounts }

      return this.accounts.filter(a => {
        if (!a._id) { return false }

        return a._id.includes(this.filter.toLowerCase())
      })
    }
  },

  head () {
    return {
      title: 'Accounts'
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

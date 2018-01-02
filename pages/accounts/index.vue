<template lang="pug">
.container-fluid.account-container
  .row.title-container
    .col-sm-12
      h4 Accounts

  .row
    .col-sm-12
      table.table.table-responsive
        thead
          tr
            th Address
            th Balance
            th Updated
        tbody
          tr(v-for='a in accounts', :key='a._id', v-if="a._id !== '0x0000000000000000000000000000000000000000'")
            td
              nuxt-link(:to="{ name: 'accounts-address', params: { address: a._id }}") {{ a._id }}
            td {{ a.balance | mtn }}
            td {{ a.updatedAt | moment('from') }}
</template>

<script>
import accountService from '~/services/account'

export default {
  name: 'AccountList',

  data () {
    return {
      accounts: []
    }
  },

  async asyncData ({ params }) {
    let { accounts } = await accountService.get()
    return { accounts }
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

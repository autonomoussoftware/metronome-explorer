<template lang="pug">
.container-fluid
  .row
    .col
      h2.title Accounts

  .row
    .col
      table.table
        thead
          tr
            th Address
            th Balance
        tbody
          tr(v-for='a in accounts', :key='a._id')
            td
              nuxt-link(:to="{ name: 'account-address', params: { address: a._id }}") {{ a._id }}
            td {{ a.balance }}
</template>

<script>
import accountService from '~/plugins/account'

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

<style>
  td {
    padding: 5px;
  }
</style>

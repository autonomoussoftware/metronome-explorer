<template lang="pug">
.container-fluid.account-container
  .row.title-container
    .col-sm-8
      h4 Accounts

  .row
    .col
      table.table.table-responsive
        thead
          tr
            th Address
            th Balance
        tbody
          tr(v-for='a in accounts', :key='a._id', v-if="a._id !== '0x0000000000000000000000000000000000000000'")
            td
              nuxt-link(:to="{ name: 'account-address', params: { address: a._id }}") {{ a._id }}
            td {{ a.balance | mtn }}
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

<style lang="scss" scoped>
  .account-container {
    margin-top: 50px;
  }
</style>

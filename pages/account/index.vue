<template lang="pug">
  section
    h1.title Accounts
    table.table
      thead
        tr
          th ID
          th Balance
      tbody
        tr(v-for='a in accounts', :key='a._id')
          td
            nuxt-link(:to="{ name: 'account-id', params: { id: a._id }}") {{ a._id }}
          td {{ a.balance }}
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/account')
    return { accounts: data.accounts }
  },

  head () {
    return {
      title: 'Events'
    }
  }
}
</script>

<style>
  td {
    padding: 5px;
  }
</style>

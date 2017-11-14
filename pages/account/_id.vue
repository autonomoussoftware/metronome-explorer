<template lang="pug">
  section
    h1.title Account {{ account.balance._id }}
    mtn-event-table(:events="account.events")
</template>

<script>
import MtnEventTable from '~/components/EventTable'
import axios from '~/plugins/axios'

export default {
  components: { MtnEventTable },

  asyncData ({ params, error }) {
    return axios.get(`/api/account/${params.id}`)
      .then((res) => {
        return { account: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: JSON.stringify(e) })
      })
  },

  head () {
    return {
      title: `Account: ${this.account.name}`
    }
  }
}
</script>
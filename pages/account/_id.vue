<template lang="pug">
  section
    h1.title Account {{ account._id }}
    pre
      code {{ account }}
</template>

<script>
import axios from '~/plugins/axios'

export default {
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
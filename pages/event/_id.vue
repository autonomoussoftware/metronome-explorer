<template lang="pug">
  section
    h1.title Event {{ event._id }}
    pre
      code {{ event }}
</template>

<script>
import axios from '~/plugins/axios'

export default {
  asyncData ({ params, error }) {
    return axios.get(`/api/event/${params.id}`)
      .then((res) => {
        return { event: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Event not found' })
      })
  },

  head () {
    return {
      title: `Event: ${this.event.name}`
    }
  }
}
</script>
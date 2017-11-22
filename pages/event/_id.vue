<template lang="pug">
  .container-fluid
    .row
      .col
        h1.title Event {{ event._id }}
        pre
          code {{ event }}
</template>

<script>
import eventService from '~/plugins/event'

export default {

  data () {
    return {
      event: {}
    }
  },

  async asyncData ({ params, error }) {
    const event = await eventService.getById(params.id)
    return { event }
  },

  head () {
    return {
      title: `Event: ${this.event.name}`
    }
  }
}
</script>
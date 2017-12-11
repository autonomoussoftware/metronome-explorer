<template lang="pug">
  .container-fluid.event-container
    .row
      .col
        h4 Event {{ event._id }}
        pre
          code {{ event }}
</template>

<script>
import eventService from '~/plugins/event'

export default {
  name: 'EventDetail',

  data () {
    return {
      event: {}
    }
  },

  async asyncData ({ params }) {
    const event = await eventService.getById(params.id)
    return { event }
  },

  head () {
    return {
      title: `Event: ${this.event._id}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .event-container {
    margin-top: 50px;
  }

  pre {
    max-width: 100%;
    overflow: auto;
  }
</style>
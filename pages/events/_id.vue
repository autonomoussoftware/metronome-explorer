<template lang="pug">
  .container-fluid.event-container
    .row
      .col-sm-10
        h4 Event {{ event._id }}
      .col-sm-2
        nuxt-link(:to="{ name: 'transaction-hash', params: { hash: event.metaData.transactionHash } }")
          | Check Transaction
    .row
      .col
        pre
          code {{ event.metaData }}

</template>

<script>
import eventService from '~/services/event'

export default {
  name: 'EventDetail',

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
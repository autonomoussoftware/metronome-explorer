<template lang="pug">
  .container-fluid
    .row
      .col-sm-10
        h4 Event {{ event._id }}
      .col-sm-2
        nuxt-link(:to="{ name: 'transactions-hash', params: { hash: event.metaData.transactionHash } }")
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

  async asyncData ({ params, error }) {
    try {
      const event = await eventService.getById(params.id)
      return { event }
    } catch (err) {
      return error({ statusCode: 404, message: `The event ${params.id} was not found` })
    }
  },

  head () {
    return {
      title: `Event: ${this.event._id} | Metronome Explorer`
    }
  }
}
</script>

<style lang="scss" scoped>
  pre {
    max-width: 100%;
    overflow: auto;
  }
</style>
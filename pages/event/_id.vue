<template lang="pug">
  .container-fluid
    .row
      .col
        h1.title Event {{ event._id }}
        pre
          code {{ event }}
</template>

<script>
// import trae from '~/plugins/trae'

export default {
  asyncData ({ params, error }) {
    // return trae.get(`/api/event/${params.id}`)
    //   .then((res) => {
    //     return { event: res.data }
    //   })
    //   .catch((e) => {
    //     error({ statusCode: 404, message: 'Event not found' })
    //   })
  },

  head () {
    return {
      title: `Event: ${this.event.name}`
    }
  }
}
</script>
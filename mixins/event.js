import eventService from '~/services/event'
import socketService from '~/services/socket.io.js'
import accountService from '~/services/account'

const LIMIT = 20

const eventMixin = {
  data () {
    return {
      balance: 0,
      events: [],
      count: 0,

      filter: '',
      hasEnded: false,

      skip: 0
    }
  },

  async asyncData ({ params }) {
    const { events, count } = await eventService.getByAccount(params.address, {
      $sort: '-metaData.timestamp',
      $limit: LIMIT
    })

    let balance = 0
    if (params.address) {
      balance = await accountService.getByAddress(params.address).balance
    }

    const hasEnded = count <= LIMIT

    return { events, count, hasEnded, balance }
  },

  computed: {
    filteredEvents () {
      if (!this.filter) { return this.events }

      return this.events.filter(e => {
        if (!e.metaData.returnValues._to || !e.metaData.returnValues._from) { return false }

        return (e.metaData.returnValues._to.includes(this.filter)) ||
          (e.metaData.returnValues._from.includes(this.filter))
      })
    },

    showPagination () {
      return !this.filter
    }
  },

  created () {
    socketService.on('NEW_EVENT', (event) => {
      this.count += 1
      if (this.skip === 0) {
        if (this.events.length === LIMIT) { this.events.pop() }
        this.events.unshift(event)
      }
    })
  },

  methods: {
    async getEvents () {
      this.hasEnded = false
      let events

      if (this.$route.params.address) {
        events = await eventService.getByAccount(this.$route.params.address, {
          $sort: '-metaData.timestamp',
          $limit: LIMIT,
          $skip: this.skip
        }).events
      } else {
        events = await eventService.get({
          $sort: '-metaData.timestamp',
          $limit: this.limit,
          $skip: this.skip
        }).events
      }

      if (!events || !events.length) {
        this.hasEnded = true
        return
      }

      if (events.length < LIMIT) {
        this.hasEnded = true
      }

      this.events = events
    },

    getNextPage () {
      if (!this.skip) { return }
      this.skip -= LIMIT
      this.getEvents()
    },

    getPreviousPage () {
      if (this.skip >= this.count) { return }
      this.skip += LIMIT
      this.getEvents()
    }
  }
}

export default eventMixin

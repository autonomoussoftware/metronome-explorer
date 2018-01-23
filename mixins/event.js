import eventService from '~/services/event'
import socketService from '~/services/socket.io.js'
import accountService from '~/services/account'

const LIMIT = 20
const SORT = '-_id'

const eventMixin = {
  data () {
    return {
      balance: 0,
      events: [],
      count: 0,

      filter: '',
      hasEnded: false,
      isLoading: false,

      skip: 0,
      limit: LIMIT
    }
  },

  async asyncData ({ params, error }) {
    if (params.address === '0x0000000000000000000000000000000000000000') {
      return error({ statusCode: 500, message: 'Minter address is not allowed ' })
    }

    const { events, count } = await eventService.getByAccount(params.address, {
      $sort: SORT,
      $limit: LIMIT
    })

    const hasEnded = count <= LIMIT

    if (!params.address) { return { events, count, hasEnded } }

    const { balance } = await accountService.getByAddress(params.address)

    if (!balance) {
      return error({ statusCode: 404, message: `The address ${params.address} was not found` })
    }

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
      const address = this.$route.params.address
      if (address && event.metaData.returnValues._from !== address &&
        event.metaData.returnValues._to !== address) { return }

      this.count += 1
      if (this.skip === 0) {
        if (this.events.length === LIMIT) { this.events.pop() }
        this.events.unshift(event)
      }
    })
  },

  methods: {
    async getEvents () {
      this.isLoading = true
      this.hasEnded = false

      const params = {
        $sort: SORT,
        $limit: LIMIT,
        $skip: this.skip
      }

      if (this.$route.params.address) {
        let { events } = await eventService.getByAccount(this.$route.params.address, params)
        this.setNewPage(events)
      } else {
        let { events } = await eventService.get(params)
        this.setNewPage(events)
      }
    },

    setNewPage (events) {
      this.isLoading = false

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

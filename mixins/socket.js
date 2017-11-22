import socket from '~/plugins/socket.io.js'

const socketMixin = {
  data () {
    return {
      events: []
    }
  },

  created () {
    socket.on('event', (event) => {
      this.events.pop()
      this.events.unshift(event)
    })
  }
}

export default socketMixin

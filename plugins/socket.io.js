import io from 'socket.io-client'
const socket = io(`http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`)

export default socket

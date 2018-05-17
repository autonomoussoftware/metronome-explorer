import io from 'socket.io-client'
export default io(process.env.socketUrl || '')

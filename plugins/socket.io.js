import io from 'socket.io-client'
import config from './config'

const socket = io(config.socket.url)

export default socket

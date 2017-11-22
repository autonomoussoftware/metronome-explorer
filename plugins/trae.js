import trae from 'trae'
import config from './config'

trae.defaults({ baseUrl: config.api.url })

const fulfillMiddleware = function (res) {
}

const rejectMiddleware = function (err) {
  return Promise.reject(err)
}

trae.after(fulfillMiddleware, rejectMiddleware)

export default trae

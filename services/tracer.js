import axios from 'axios'

const options = { baseURL: process.env.tracerUrl }

const tracerApi = axios.create(options)
const tracer = {}

tracer.transaction = function (transactionHash) {
  return tracerApi.get(`/transactions/${transactionHash}`)
    .then(res => res.data)
}

export default tracer

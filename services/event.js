import axios from './axios'
import utils from './utils'
import MetronomeContracts from './metronome-contracts'

const AUTONOMOUS_CONVERTER_ADDRESS = MetronomeContracts.addresses[process.env.chain].autonomousConverter

const eventService = {}
const endpoint = '/event'

eventService.get = function (params) {
  return axios.get(endpoint, { params })
    .then(res => res.data)
}

eventService.getById = function (id) {
  return axios.get(`${endpoint}/${id}`)
    .then(res => res.data)
}

eventService.getByAccount = function (address, params) {
  if (!address) { return eventService.get(params) }

  return axios.get(`${endpoint}/account/${address}`, { params })
    .then(res => res.data)
}

eventService.isConverterEvent = function (event, type = 'from') {
  if (type === 'from') {
    return utils.compareAddress(event.metaData.returnValues._from, AUTONOMOUS_CONVERTER_ADDRESS) ||
      utils.compareAddress(event.metaData.returnValues._owner, AUTONOMOUS_CONVERTER_ADDRESS)
  }

  return utils.compareAddress(event.metaData.returnValues._to, AUTONOMOUS_CONVERTER_ADDRESS) ||
    utils.compareAddress(event.metaData.returnValues._spender, AUTONOMOUS_CONVERTER_ADDRESS)
}

eventService.isMinterEvent = function (event) {
  return event.metaData.returnValues._from === process.env.minterAddress ||
    event.metaData.returnValues._owner === process.env.minterAddress
}

eventService.getEventAddress = function (event, type = 'from') {
  return type === 'from' ? event.metaData.returnValues._from || event.metaData.returnValues._owner
    : event.metaData.returnValues._to || event.metaData.returnValues._spender
}

eventService.hasEventAddress = function (event) {
  return (event.metaData.returnValues && event.metaData.returnValues._from) ||
    (event.metaData.returnValues && event.metaData.returnValues._owner)
}

export default eventService

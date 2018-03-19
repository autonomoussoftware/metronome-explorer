import axios from './axios'

const eventService = {}
const endpoint = '/event'

eventService.get = function (params) {
  return axios.get(endpoint, { params })
    .then(res => res.data)
}

eventService.getById = function (id) {
  return axios.get(`${endpoint}/${id}`)
    .then(res => res.data)
    .catch(() => {})
}

eventService.getByAccount = function (address, params) {
  if (!address) { return eventService.get(params) }

  return axios.get(`${endpoint}/account/${address}`, { params })
    .then(res => res.data)
}

eventService.compareAddress = function (address1, address2) {
  if (!address1 || !address2) { return false }

  address1 = address1.toLowerCase()
  address2 = address2.toLowerCase()

  return address1 === address2
}

eventService.isConverterEvent = function (event, type = 'from') {
  if (type === 'from') {
    return eventService.compareAddress(event.metaData.returnValues._from, process.env.converterAddress) ||
      eventService.compareAddress(event.metaData.returnValues._owner, process.env.converterAddress)
  }

  return eventService.compareAddress(event.metaData.returnValues._to, process.env.converterAddress) ||
    eventService.compareAddress(event.metaData.returnValues._spender, process.env.converterAddress)
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

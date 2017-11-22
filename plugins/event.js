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
}

eventService.getByAccount = function (address, params) {
  return axios.get(`${endpoint}/account/${address}`, { params })
    .then(res => res.data)
}

export default eventService

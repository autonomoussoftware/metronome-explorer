import axios from './axios'

const eventService = {}
const endpoint = '/event'

eventService.get = function () {
  return axios.get(endpoint)
    .then(res => res.data)
}

eventService.getById = function (id) {
  return axios.get(`${endpoint}/${id}`)
    .then(res => res.data)
}

export default eventService

import trae from './trae'

const eventService = {}
const endpoint = '/event'

eventService.get = function () {
  return trae.get(endpoint)
    .then(res => res.data)
}

eventService.getById = function (id) {
  return trae.get(`${endpoint}/${id}`)
    .then(res => res.data)
}

export default eventService

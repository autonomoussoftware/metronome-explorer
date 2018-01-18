import axios from './axios'

const accountService = {}
const endpoint = '/account'

accountService.get = function (params) {
  return axios.get(endpoint, { params })
    .then(res => res.data)
}

accountService.getByAddress = function (address) {
  return axios.get(`${endpoint}/${address}`)
    .then(res => res.data)
    .catch(err => err)
}

export default accountService

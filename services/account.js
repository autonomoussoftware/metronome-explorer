import axios from './axios'
import utils from './utils'

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

accountService.isConverterAddress = function (address) {
  return utils.compareAddress(address, process.env.converterAddress)
}

export default accountService

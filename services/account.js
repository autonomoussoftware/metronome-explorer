import axios from './axios'
import utils from './utils'
import Metronome from './metronome'

const accountService = {}
const endpoint = '/account'

accountService.get = function (params) {
  return axios.get(endpoint, { params })
    .then(res => res.data)
}

accountService.getByAddress = function (address) {
  return axios.get(`${endpoint}/${address}`)
    .then(res => res.data)
}

accountService.isConverter = function (address) {
  return utils.compareAddress(address, Metronome.addresses[process.env.chain].autonomousConverter)
}

accountService.isMinter = function (address) {
  return utils.compareAddress(address, process.env.minterAddress)
}

export default accountService

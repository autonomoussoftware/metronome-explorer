import axios from './axios'

const statusService = {}
const endpoint = '/status'

statusService.get = function () {
  return axios.get(endpoint)
    .then(res => res.status)
}

export default statusService

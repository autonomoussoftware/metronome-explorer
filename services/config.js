import axios from './axios'

const configService = {}
const endpoint = '/config'

configService.get = function () {
  return axios.get(endpoint)
    .then(res => res.data)
}

export default configService

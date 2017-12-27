import * as axios from 'axios'

let options = {
  baseURL: process.env.apiUrl
}

export default axios.create(options)

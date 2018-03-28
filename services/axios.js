import axios from 'axios'

const options = { baseURL: process.env.apiUrl }

export default axios.create(options)

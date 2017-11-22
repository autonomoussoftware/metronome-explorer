// import trae from 'trae'
// import config from './config'

// trae.defaults({ baseUrl: config.api.url })

// export default trae

import * as axios from 'axios'
import config from './config'

let options = {
  baseURL: config.api.url
}

export default axios.create(options)

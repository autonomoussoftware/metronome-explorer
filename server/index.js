import express from 'express'
import { Nuxt, Builder } from 'nuxt'

import db from './db'
import api from './api'
import config from './config'
import Exporter from './exporter'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('db', db)
app.set('port', port)

app.use('/api', api)

let nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(nuxtConfig)

if (nuxtConfig.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(nuxt.render)

const server = require('http').createServer(app)

new Exporter(config, db) // eslint-disable-line

server.listen(port)

console.log(`Server listening on ${host}:${port}`) // eslint-disable-line no-console

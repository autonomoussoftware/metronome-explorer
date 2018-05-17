const test = require('ava')
const { Nuxt, Builder } = require('nuxt')
const { resolve } = require('path')
const nock = require('nock')

const socketServices = require('../../services/socket.io')
socketServices.on = function () {}

const event = require('../fixtures/event')

let nuxt = null

test.before('Init Nuxt.js', async function () {
  const rootDir = resolve(__dirname, '../../')
  let config = {}

  try {
    config = require(resolve(rootDir, 'nuxt.config.js'))
  } catch (err) {
    throw err
  }

  config.rootDir = rootDir
  config.dev = false

  config.css = []
  config.env.apiUrl = 'http://localhost:3002'
  config.env.socketUrl = 'http://localhost:3003'

  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

test('Route / exits and render HTML', async function (t) {
  nock('http://localhost:3002')
    .get(`/event/${event._id}`)
    .reply(200, event)

  const context = {}
  const { html } = await nuxt.renderRoute(`/events/${event._id}`, context)

  t.true(html.includes(`Event ${event._id}`))
})

test.after('Closing server', () => nuxt.close())

const test = require('ava')
const { Nuxt, Builder } = require('nuxt')
const { resolve } = require('path')
const nock = require('nock')

const socketServices = require('../../services/socket.io')
socketServices.on = function () {}

const metEvent = require('../fixtures/event')
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

  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

test('Route / exits and render HTML', async function (t) {
  nock('http://localhost:3002')
    .get('/event?$sort=-_id&$limit=20&$skip=0')
    .reply(200, {
      events: [metEvent],
      count: 1
    })

  const context = {}
  const { html } = await nuxt.renderRoute('/', context)

  t.true(html.includes('<h4>Recent Events</h4>'))
})

test('Route / exits and render HTML with CSS applied', async function (t) {
  nock('http://localhost:3003')
    .get(() => true)
    .reply(200, {})

  nock('http://localhost:3002')
    .get('/event?$sort=-_id&$limit=20&$skip=0')
    .reply(200, {
      events: [metEvent],
      count: 1
    })

  nock('http://localhost:3002')
    .get('/config')
    .reply(200, {
      tokenAddress: '0x825a2ce3547e77397b7eac4eb464e2edcfaae514',
      auctionAddress: '0x9aeb1035b327f4f81198090f4183f21ca6fcb040'
    })

  nock('http://localhost:3002')
    .get('/status')
    .reply(204)

  const window = await nuxt.renderAndGetWindow('http://localhost:4000') // eslint-disable-line
  const elements = window.document.querySelectorAll('.table tbody tr')

  t.not(elements, null)
  t.true(elements.length === 1)
})

test.after('Closing server', () => nuxt.close())

require('dotenv').config()
const path = require('path')

if (process.env.MEM_WATCH === 'true') {
  const REPORT_PATH = process.env.MEM_DUMP_PATH
    ? process.env.MEM_DUMP_PATH
    : './analytics/'

  var heapdump = require('heapdump')
  var memwatch = require('memwatch-next')

  console.log('starting memwatch and heapdump')

  const createSnapshot = dir => {
    heapdump.writeSnapshot(dir, function (err, filename) {
      if (err) {
        console.log(err)
        return
      }
      console.log('dump written to', filename)
    })
  }

  setInterval(function () {
    createSnapshot(path.join(REPORT_PATH, Date.now() + '.heapsnapshot'))
  }, process.env.MEM_WATCH_INTERVAL)

  memwatch.on('leak', info => {
    console.error('Memory leak detected:\n', info)
    createSnapshot(
      path.join(REPORT_PATH, Date.now() + '-leaked' + '.heapsnapshot')
    )
  })
}

module.exports = {
  head: {
    title: 'Metronome Explorer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Metronome Explorer'
      },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'icon',
        type: 'image/x-icon',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'manifest', href: '/site.webmanifest' }
    ]
  },

  env: {
    apiUrl: process.env.MTN_API_URL || 'http://localhost:3000',
    socketUrl: process.env.MTN_SOCKET_URL || 'http://localhost:3000',
    ethUrl: process.env.ETH_NODE_URL || 'http://parity.bloqrock.net:8545',
    tracerUrl: process.env.TRACER_URL || 'http://tracer.bloqrock.net',
    converterAddress: process.env.CONVERTER_ADDRESS || '0x25d99454d94d9459f0abb06009840a48bd04ca44',
    minterAddress: '0x0000000000000000000000000000000000000000'
  },

  serverMiddleware: [{ path: '/health', handler: '~/middlewares/health.js' }],

  loading: { color: '#7E66F4', height: '3px' },

  css: ['bootstrap/dist/css/bootstrap.css', '~/assets/scss/main.scss'],

  modules: ['@nuxtjs/font-awesome'],

  plugins: ['~/plugins/filters', '~/plugins/directives'],

  build: {
    vendor: ['axios', 'socket.io-client'],

    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

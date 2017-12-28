module.exports = {
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Metronome Explorer' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  env: {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    socketUrl: process.env.SOCKET_URL || 'http://localhost:3000',
    ethUrl: process.env.ETH_URL || 'ws://35.153.248.198:8546'
  },

  loading: { color: '#7E66F4', height: '3px' },

  css: ['bootstrap/dist/css/bootstrap.css'],

  plugins: [
    '~/plugins/filters',
    '~/plugins/clipboard'
  ],

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

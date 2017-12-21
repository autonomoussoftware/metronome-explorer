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

  loading: { color: '#7E66F4', height: '3px' },

  css: ['bootstrap/dist/css/bootstrap.css'],

  plugins: [
    '~/plugins/moment',
    '~/plugins/token',
    '~/plugins/minter',
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

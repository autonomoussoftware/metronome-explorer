<h1 align="center">
  <img src="./assets/img/logo-black.png" alt="Metronome Explorer" width="50%">
</h1>

🔎 Metronome Token Explorer

[![Build Status](https://travis-ci.com/MetronomeToken/metronome-explorer.svg?token=zFtwnjoHbEAEPUQyswR1&branch=master)](https://travis-ci.com/MetronomeToken/metronome-desktop-wallet)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Configuration

The following environment variables are needed for the explorer to work:

- `MTN_API_URL`is the Metronome JSON-RTP API server URL. I.E. `http://api.metronome.io`.
- `MTN_SOCKET_URL` is to the Metronome WS API server URL. I.E. `ws://api.metronome.io`.
- `ETH_NODE_URL` is the websocket URL of the Ethereum node. I.E. `ws://node.metronome.io:8546`.

## Development Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev
```

## Production Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# run nuxt release build
$ MTN_API_URL=http://api.metronome.io MTN_SOCKET_URL=ws://api.metronome.io ETH_NODE_URL=ws://node.metronome.io:8546 npm run build

$ PORT=8080 HOST=0.0.0.0 npm run prod
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

---
[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

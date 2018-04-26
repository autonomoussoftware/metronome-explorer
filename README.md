<h1 align="center">
  <img src="./assets/img/logo-black.png" alt="Metronome Explorer" width="50%">
</h1>

🔎 Metronome Token Explorer

[![Build Status](https://travis-ci.com/MetronomeToken/metronome-explorer.svg?token=zFtwnjoHbEAEPUQyswR1&branch=master)](https://travis-ci.com/MetronomeToken/metronome-desktop-wallet)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Index
1. [Requirements](#requirements)
1. [Configuration](#configuration)
1. [Dev Setup](#dev-Setup)
1. [Memory Watch](#memory-watch)
1. [Prod Setup](#prod-setup)
1. [License](#license)

# Requirements
  - [Node.js v8]()
  - [Metronome API]()
  - [ETH Tracer]()
  - Ethereum node (i.e. [Geth]() or [Parity]())

## Configuration

The following environment variables are needed for the explorer to work:

- `MTN_API_URL`: The Metronome JSON-RTP API server URL.

  I.E. `http://api.metronome.io`.

- `MTN_SOCKET_URL`: The Metronome WS API server URL.

  I.E. `ws://api.metronome.io`.

- `ETH_NODE_URL` WebSocket URL of the Ethereum node.

  I.E. `ws://node.metronome.io:8546`.

- `TRACER_URL`: API URL of the Ethereum Parity tracer.

  I.E. `ws://node.metronome.io:8546`.

## Development Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3333
$ npm run dev
```



## Prod Setup

Remember setup the next ENV variables: 

- `NEW_RELIC_API_KEY`
- `MTN_API_URL`
- `MTN_SOCKET_URL`
- `ETH_NODE_URL`

``` bash
# install dependencies
$ npm install # Or yarn install

# run nuxt release build
$ NEW_RELIC_API_KEY="xxxxxxxx" MTN_API_URL=http://api.metronome.io MTN_SOCKET_URL=ws://api.metronome.io ETH_NODE_URL=ws://node.metronome.io:8546 npm run build

$ PORT=8080 HOST=0.0.0.0 npm run prod
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## LICENSE
[MIT License](https://github.com/MetronomeToken/metronome-explorer/blob/develop/LICENSE).
<h1 align="center">
  <img src="./assets/img/logo-black.png" alt="Metronome Explorer" width="50%">
</h1>

🔎 Metronome Token Explorer

[![Build Status](https://travis-ci.com/MetronomeToken/metronome-explorer.svg?token=zFtwnjoHbEAEPUQyswR1&branch=master)](https://travis-ci.com/MetronomeToken/metronome-desktop-wallet)
[![Code Style](https://img.shields.io/badge/code%20style-bloq-0063a6.svg)](https://github.com/bloq/eslint-config-bloq)

## Index
1. [Requirements](#requirements)
1. [Configuration](#configuration)
1. [Dev Setup](#dev-Setup)
1. [Prod Setup](#prod-setup)
1. [License](#license)

# Requirements
  - Node.js v8
  - Metronome API
  - ETH Tracer
  - Ethereum node (i.e. Geth or Parity)

## Configuration

The following environment variables are needed for the explorer to work:

- `MET_API_URL`: The Metronome JSON-RTP API server URL.

  I.E. `http://api.metronome.io`.

- `ETH_NODE_URL` WebSocket URL of the Ethereum node.

  I.E. `ws://node.metronome.io:8546`.

- `TRACER_URL`: API URL of the Ethereum Parity tracer.

  I.E. `http://tracer.metronome.io`.

- `ETH_CHAIN`: Name of the Ethereum chain (`mainnet` or `ropsten`).

  I.E. `mainnet`.

## Development Setup

``` bash
# Install dependencies
npm install

# Serve with hot reloading at localhost:3004
npm run dev
```

## Prod Setup

Remember setup the next ENV variables:

- `ETH_CHAIN`
- `ETH_NODE_URL`
- `MET_API_URL`
- `NEW_RELIC_API_KEY`
- `TRACER_URL`

``` bash
# Install dependencies
npm install

# Run nuxt release build
ETH_CHAIN=main \
ETH_NODE_URL=ws://node.metronome.io:8546 \
HOST=0.0.0.0 \
MET_API_URL=ws://api.metronome.io \
NEW_RELIC_API_KEY="xxxxxxxx" \
PORT=8080 \
TRACER_URL=http://tracer.metronome.io \
npm start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## LICENSE
[MIT](https://github.com/MetronomeToken/metronome-explorer/blob/develop/LICENSE).

import erc20ABI from 'human-standard-token-abi'

const config = {
  logFormat: 'combined',
  rpcUrl: 'http://localhost:8545',

  tokenShortName: 'MTN',
  tokenAddress: '0xa74476443119A942dE498590Fe1f2454d7D4aC0d',
  tokenDecimals: 18,
  tokenTotalSupply: -1,

  exportStartBlock: 0,

  erc20ABI
}

export default config

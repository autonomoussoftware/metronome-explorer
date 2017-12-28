
import Web3 from 'web3'

const provider = new Web3.providers.WebsocketProvider(process.env.ethUrl)
const web3 = new Web3(provider)

export default web3

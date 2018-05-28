
import Web3 from 'web3'

const provider = new Web3.providers.HttpProvider(process.env.ethUrl)
const web3 = new Web3(provider)

export default web3

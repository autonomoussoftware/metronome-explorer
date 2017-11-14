import async from 'async'
import Web3 from 'web3'

import db from './db'
import config from './config'

const Exporter = function (config, db) {
  this.config = config
  this.db = db

  this.web3 = new Web3()
  const provider = this.web3.providers.HttpProvider(config.rpcUrl)
  this.web3.setProvider(provider)

  console.log(`Getting Info for token: ${config.tokenAddress}`)

  this.contract = this.web3.eth.contract(config.erc20ABI).at(config.tokenAddress)
  this.allEvents = this.contract.allEvents({fromBlock: config.exportStartBlock, toBlock: 'latest'})
  this.newEvents = this.contract.allEvents()

  this.newEvents.watch((err, log) => {
    if (err) { return console.log(`Error receiving new log: ${err}`) }
    console.log('New log received:', log)

    this.processLog(log, (err) => {
      if (err) { return console.log(`Error processing new log: ${err}`) }
      console.log('New log processed')
    })

    if (log.event.toLowerCase() === 'transfer') {
      this.exportBalance(log.args._from)
      this.exportBalance(log.args._to)
    }

    if (log.event.toLowerCase() === 'approval') {
      this.exportBalance(log.args._owner)
      this.exportBalance(log.args._spender)
    }
  })

  this.allEvents.get((err, logs) => {
    console.log('Historical events received')
    if (err) { return console.log('Error receiving historical events:', err) }

    const accounts = {}

    logs.forEach((log) => {
      if (log.event.toLowerCase() === 'transfer') {
        accounts[log.args._from] = log.args._from
        accounts[log.args._to] = log.args._to
      }

      if (log.event.toLowerCase() === 'approval') {
        accounts[log.args._owner] = log.args._owner
        accounts[log.args._spender] = log.args._spender
      }
    })

    async.eachSeries(logs, this.processLog, (err) => {
      console.log('All historical logs processed')

      async.eachSeries(
        accounts,
        (item, callback) => { this.exportBalance(item, callback) },
        (err) => { console.log('All historical balances updated') }
      )
    })
  })

  this.processLog = (log, cb) => {
    log._id = `${log.blockNumber}_${log.transactionIndex}_${log.logIndex}`

    console.log(`Exporting log:', log._id`)

    this.db.insert(log, (err, newLogs) => {
      if (err) {
        if (err.message.indexOf('unique') !== -1) {
          return console.log(`The log: ${log._id} was already exported!`)
        }

        console.log(`Error inserting log: ${err}`)
      }

      cb && cb()
    })
  }

  this.exportBalance = (address, cb) => {
    console.log(`Exporting balance of ${address}`)

    this.contract.balanceOf(address, (err, balance) => {
      const doc = { _id: address, balance: balance.toNumber() }

      this.db.update({ _id: doc._id }, doc, { upsert: true }, (err, numReplaced) => {
        if (err) {
          return console.log(`Error updating balance: ${err}`)
        }

        console.log('Balance export completed')
        cb && cb()
      })
    })
  }

  console.log('Exporter initialized, waiting for historical events...')
}

export default new Exporter(config, db)

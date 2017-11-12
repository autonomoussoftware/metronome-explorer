import async from 'async'
import Web3 from 'web3'

import db from './db'
import config from './config'

const Exporter = function (config, db) {
  const self = this
  self.config = config
  self.db = db

  self.web3 = new Web3()
  self.web3.setProvider(config.provider)

  console.log('Getting Info for ', config.tokenAddress)

  self.contract = self.web3.eth.contract(config.erc20ABI).at(config.tokenAddress)
  self.allEvents = self.contract.allEvents({fromBlock: config.exportStartBlock, toBlock: 'latest'})
  self.newEvents = self.contract.allEvents()

  self.newEvents.watch(function(err, log) { // eslint-disable-line
    if (err) {
      console.log('Error receiving new log:', err)
      return
    }
    console.log('New log received:', log)

    self.processLog(log, function(err) { // eslint-disable-line
      console.log('New log processed')
    })

    if (log.event === 'Transfer') {
      self.exportBalance(log.args._from)
      self.exportBalance(log.args._to)
    }
    if (log.event === 'Approval') {
      self.exportBalance(log.args._owner)
      self.exportBalance(log.args._spender)
    }
  })

  // Retrieves historical events and processed them
  self.allEvents.get(function(err, logs) { // eslint-disable-line
    console.log(logs)
    console.log('Historical events received')
    if (err) {
      console.log('Error receiving historical events:', err)
      return
    }
    const accounts = {}

    logs.forEach(function(log) { // eslint-disable-line
      if (log.event === 'Transfer') {
        accounts[log.args._from] = log.args._from
        accounts[log.args._to] = log.args._to
      }

      if (log.event === 'Approval') {
        accounts[log.args._owner] = log.args._owner
        accounts[log.args._spender] = log.args._spender
      }
    })

    async.eachSeries(logs, self.processLog, function(err) { // eslint-disable-line
      console.log('All historical logs processed')
      self.exportBatchAccounts(accounts)
    })
  })

  self.exportBatchAccounts = function(accounts) { // eslint-disable-line
    async.eachSeries(accounts, function(item, callback) { // eslint-disable-line
      self.exportBalance(item, callback)
    }, function(err) { // eslint-disable-line
      console.log('All historical balances updated')
    })
  }

  self.processLog = function(log, callback) { // eslint-disable-line
    log._id = log.blockNumber + '_' + log.transactionIndex + '_' + log.logIndex

    console.log('Exporting log:', log._id)

    self.web3.eth.getBlock(log.blockNumber, false, function(err, block) { // eslint-disable-line
      if (err) {
        console.log('Error retrieving block information for log:', err)
        callback()
        return
      }

      log.timestamp = block.timestamp

      if (log.args && log.args._value) {
        log.args._value = log.args._value.toNumber()
      }

      self.db.insert(log, function(err, newLogs) { // eslint-disable-line
        if (err) {
          if (err.message.indexOf('unique') !== -1) {
            console.log(log._id, 'already exported!')
          } else {
            console.log('Error inserting log:', err)
          }
        }
        callback()
      })
    })
  }

  self.exportBalance = function(address, callback) { // eslint-disable-line
    console.log('Exporting balance of', address)
    self.contract.balanceOf(address, function(err, balance) { // eslint-disable-line
      const doc = { _id: address, balance: balance.toNumber() }
      self.db.update({ _id: doc._id }, doc, { upsert: true }, function(err, numReplaced) { //eslint-disable-line
        if (err) {
          console.log('Error updating balance:', err)
        } else {
          console.log('Balance export completed')
        }

        if (callback) { callback() }
      })
    })
  }

  console.log('Exporter initialized, waiting for historical events...')
}

export default new Exporter(config, db)

import Vue from 'vue'
import BigNumber from 'bignumber.js'

const getNumber = function (value, prefix) {
  const ret = new BigNumber(value.toString())
  const divisor = (new BigNumber(10)).toPower(18)
  return `${ret.dividedBy(divisor)} ${prefix}`
}

const ethFilter = {
  install (Vue) {
    Vue.filter('eth', function (value) {
      return getNumber(value, 'ETH')
    })
  }
}

const mtnFilter = {
  install (Vue) {
    Vue.filter('mtn', function (value) {
      return getNumber(value, 'MTN')
    })
  }
}

Vue.use(ethFilter)
Vue.use(mtnFilter)

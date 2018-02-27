import Vue from 'vue'
import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: 1e+9,
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3
  }
})

const getNumber = function (value, prefix) {
  if (!value) { return 0 }
  const ret = new BigNumber(value.toString())
  const divisor = (new BigNumber(10)).toPower(18)
  return `${ret.dividedBy(divisor).toFormat()} ${prefix}`
}

const mtnFilter = {
  install (Vue) {
    Vue.filter('mtn', function (value) {
      return getNumber(value, 'MET')
    })
  }
}

const ethFilter = {
  install (Vue) {
    Vue.filter('eth', function (value) {
      return getNumber(value, 'ETH')
    })
  }
}

Vue.use(mtnFilter)
Vue.use(ethFilter)

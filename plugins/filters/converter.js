import Vue from 'vue'

const getNumber = function (value, prefix) {
  if (!value) { return '' }

  return value === process.env.converterAddress ? 'CONVERTER' : value
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

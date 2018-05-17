import Vue from 'vue'
import accountService from '~/services/account'

const getNumber = function (value) {
  if (!value) { return '' }

  return accountService.isConverter(value) ? 'CONVERTER' : value
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

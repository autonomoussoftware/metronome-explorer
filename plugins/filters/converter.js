import Vue from 'vue'
import Metronome from '~/services/metronomejs'

const getNumber = function (value, prefix) {
  if (!value) { return '' }

  return value === Metronome.AUTONOMOUS_CONVERTER_ADDRESS ? 'CONVERTER' : value
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

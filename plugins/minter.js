import Vue from 'vue'

const minterFilter = {
  install (Vue) {
    Vue.filter('eth', function (value) {
      return value === '0x0000000000000000000000000000000000000000'
        ? 'minter' : value
    })
  }
}

Vue.use(minterFilter)

import Vue from 'vue'

const minterFilter = {
  install (Vue) {
    Vue.filter('minter', function (value) {
      return value === '0x0000000000000000000000000000000000000000'
        ? 'MINTER' : value
    })
  }
}

Vue.use(minterFilter)

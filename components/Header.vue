<template lang="pug">
  header
      
    nav.navbar.navbar-expand-xl.navbar-light.fixed-top
      nuxt-link.navbar-brand(to="/")
        img(src="../assets/img/logo-purple.png", alt="Metronome")
      
      .collapse.navbar-collapse
        ul.navbar-nav.mr-auto
          li.nav-item.active
            a.nav-link(href="#") Events
          li.nav-item
            a.nav-link(href="#") Accounts
        form.form-inline.my-2.my-lg-0
          input.form-control.mr-sm-2(type="search", placeholder='Search Accounts')
          button.btn.btn-outline-success.my-2.my-sm-0(type='submit') Search
</template>

<style lang="scss" scoped>
  header {
    // nav {
    //   background: #fff !important;
    // }
  }
</style>

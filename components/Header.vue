<template lang="pug">
  header

    nav.navbar.navbar-expand-xl.navbar-light.fixed-top
      nuxt-link.navbar-brand(to="/")
        img(src="../assets/img/logo-purple.png", alt="Metronome")

      .collapse.navbar-collapse

        ul.navbar-nav.mr-auto
          li.nav-item.active
            nuxt-link.nav-link(to="/") Events
          li.nav-item
            nuxt-link.nav-link(to="/account") Accounts

        form.form-inline.my-2.my-lg-0
          input.form-control.mr-sm-2(type="search", placeholder='Search Accounts')
          button.btn.btn-outline-success.my-2.my-sm-0(type='submit') Search
</template>
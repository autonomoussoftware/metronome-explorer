<template lang="pug">
  header

    nav.navbar.navbar-expand-xl.navbar-light.fixed-top
      nuxt-link.navbar-brand(to="/")
        img(src="../assets/img/logo.png", alt="Metronome")

      .collapse.navbar-collapse

        ul.navbar-nav.mr-auto
          li.nav-item.active
            nuxt-link.nav-link(to="/") Events
          li.nav-item
            nuxt-link.nav-link(to="/account") Accounts

        form.form-inline
          .input-group.input-search
            input.form-control(type="text", placeholder='Search Accounts')
            button.btn.btn-outline-success.input-group-btn(type='submit') Search
</template>

<style lang="scss" scoped>
  .navbar-brand {
    margin-left: 80px;
  }

  .collapse.navbar-collapse{
    margin-left: 40px;
  }

  .input-search {
    width: 400px;
  }
</style>

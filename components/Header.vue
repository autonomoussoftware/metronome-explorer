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

        form.form-inline(@submit.prevent="goToAccount")
          .input-group.input-search
            input.form-control(type="text", v-model="address" placeholder="Search an account")
            button.btn.input-group-btn(type="submit") Search
</template>

<script>
export default {
  name: 'Header',

  data () {
    return {
      address: ''
    }
  },

  methods: {
    goToAccount () {
      if (!this.address) { return }
      this.$router.push({ name: 'account-address', params: { address: this.address } })
      this.address = ''
    }
  }
}
</script>


<style lang="scss" scoped>
  header {
    height: 7vh;
  }

  nav {
    border-bottom: 3px solid #7e61f8;
  }

  .navbar-brand {
    margin: 0;
    margin-left: 80px;
  }

  .collapse.navbar-collapse{
    margin-left: 40px;
  }

  .form-inline {
    margin-right: 65px;

    .input-search {
      width: 400px;

      input: {
        color: #fff;
      }

      input:focus {
        color: #fff;
        background: transparent;
        border-color: #7e61f8;
      }

      button {
        font-weight: 200;
      }
    }
  }
</style>

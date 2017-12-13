<template lang="pug">
  header
    nav.navbar.navbar-expand-md.navbar-light.fixed-top
      nuxt-link.navbar-brand(to="/")
        img(src="../assets/img/logo.png", alt="Metronome")

      button.navbar-toggler
        span.navbar-toggler-icon(@click="toggleCollapse")

      .collapse.navbar-collapse(:class="{ 'show': showCollapse }")

        ul.navbar-nav.mr-auto
          li.nav-item.active
            nuxt-link.nav-link(to="/") Events
          li.nav-item
            nuxt-link.nav-link(to="/account") Accounts

        form.form-inline(@submit.prevent="goToAccount")
          .input-group.input-search
            input.form-control(type="search", v-model="address" placeholder="Search an account")
            button.btn.input-group-btn(type="submit") Search
</template>

<script>
export default {
  data () {
    return {
      address: '',
      showCollapse: false
    }
  },

  methods: {
    goToAccount () {
      if (!this.address) { return }
      this.$router.push({ name: 'account-address', params: { address: this.address } })
      this.address = ''
    },

    toggleCollapse () {
      this.showCollapse = !this.showCollapse
    }
  }
}
</script>


<style lang="scss" scoped>
  header {
    height: 80px;
  }

  .navbar {
    background: #282828;
    border-bottom: 3px solid #7e61f8;
  }

  .collapse.navbar-collapse{
    margin-left: 40px;
  }

  .navbar-brand {
    margin: 0;
  }

  .navbar-toggler.collapsed:focus {
    outline: 0
  }

  .navbar-nav {
    padding-top: 25px
  }

  .navbar-brand img {
    max-width: 253px
  }

  .navbar .nav-link.nuxt-link-exact-active,.navbar .nav-link:hover {
    color: #7e61f8!important;
    border-bottom: 2px solid;
    border-color: #7e61f8;
    transition: border-color .5s ease-out
  }

  .navbar-toggler {
    background: #fff;
    border: 3px solid #ccc;
  }

  .form-inline {
    margin-right: 65px;

    .input-search {
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

  @media (min-width: 992px) {
    .navbar-brand {
      margin-left: 80px;
    }

    .input-search {
      width: 400px;
    }
  }

  @media (min-width: 1200px) {
    .navbar {
        background-color:#282828;
        transition: background-color .25s ease-out
    }

    .navbar.top {
      background-color: transparent
    }
  }

  .navbar .container {
    position: relative
  }

  .navbar .nav-link {
    margin: 10px 3px;
    padding-right: 0!important;
    padding-left: 0!important;
    border-bottom: 2px solid;
    border-color: transparent;
    color: #fff!important;
    font-size:16px;
    font-weight: 100;
    margin: 5px 10px
  }
</style>

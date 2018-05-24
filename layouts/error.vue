<template lang="pug">
  main
    h5 {{ error.statusCode }} ERROR
    h3 {{ error.message }}

    div(v-if="error.statusCode === 404")
      h6 Try one of these links:
      ul
        li
          nuxt-link.button(to="/") Events
        li
          nuxt-link.button(to="/accounts") Accounts
</template>

<script>
export default {
  props: {
    error: { type: [Object, Error] }
  }
}
</script>

<style lang="scss" scoped>
  .main-container {
    padding: 50px 80px 100px 80px;

    h5, h6 {
      color: #525252;
      margin-bottom: 20px;
    }

    h3 {
      margin-bottom: 30px;
      text-transform: capitalize;
    }

    ul {
      list-style-type: none;

      li {
        margin-bottom: 10px;
      }
    }
  }
</style>

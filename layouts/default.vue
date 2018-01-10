<template lang="pug">
  main
    mtn-header

    mtn-status

    .main-container
      nuxt.app

    mtn-footer
</template>

<script>
import MtnFooter from '~/components/Footer.vue'
import MtnHeader from '~/components/Header.vue'
import MtnStatus from '~/components/Status.vue'

export default {
  components: { MtnFooter, MtnHeader, MtnStatus }
}
</script>

<style lang="scss">
  .main-container {
    overflow: auto;
    background: #fff;
  }

  .app {
    padding-bottom: 100px;
    background: #fff !important;
    padding-top: 50px;

    .title-container {
      margin-bottom: 15px;
      h4 {
        margin-top: 10px;
      }
    }

    thead {
      th {
        border-top: 2px solid #7e61f8;
        border-bottom: 2px solid #7e61f8;
      }
    }

    td {
      padding: 15px 25px 15px 5px;
      font-size: 0.7em;
    }
  }

  @media (min-width: 992px) {
    .app {
      padding-left: 80px;
      padding-right: 80px;
    }
  }

  body {
    position: relative;
    font-family: Muli,sans-serif;
    font-size: 15px;
    letter-spacing: .05rem;
    max-width: 100%;
    overflow-x: hidden;
    color: #525252;
    background: #282828
  }

  *,:after,:before {
    box-sizing: border-box
  }

  a,a:visited {
    color: #7e61f8
  }

  h1,h2,h3,h4,h5,h6 {
    color: #7e61f8
  }

  h1 {
    color: #7e61f8;
    font-weight: 300;
    font-size: 40px
  }

  h2 {
    font-size: 35px;
    font-weight: 800
  }

  img {
    max-width: 100%;
    height: auto
  }

  ol,ul {
    margin: 0;
    padding: 0
  }

  ol li {
    list-style-position: inside
  }

  input[type=email],input[type=text],input[type=search] {
    display: inline-block;
    margin: 0;
    border: 3px solid #7e61f8;
    background: transparent;
    color: #fff;
    padding: 10px 6px;
    font-size: 13px;
    line-height: 12px;
    box-sizing: border-box;
    vertical-align: middle;
    border-radius: 0;
    pointer-events: auto
  }

  input::-webkit-input-placeholder {
    color: #fff
  }

  input:-ms-input-placeholder {
    color: #fff
  }

  input::placeholder {
    color: #fff
  }

  .btn {
    display: inline-block;
    background-color: #7e61f8;
    border-radius: 0;
    border: 3px solid #7e61f8;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .1rem;
    padding: 10px;
    box-sizing: border-box;
    vertical-align: middle;
    cursor: pointer;
    text-transform: uppercase
  }

  @media (min-width: 768px) {
    .btn {
        padding:10px 30px
    }
  }

  .btn:visited {
    color: #fff
  }

  .btn:hover {
    color: #fff;
    background-color: #5742b0;
    border: 3px solid #5742b0
  }
</style>

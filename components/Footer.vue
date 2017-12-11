<template lang="pug">
  footer.container
    p Copyright &copy; {{ new Date().getFullYear() }} Bloq, Inc. All Rights Reseverd
      br
      | Metronome was build by &nbsp;
      a(href="https://bloq.com") BloqLabs.
</template>

<style lang="scss" scoped>
  footer {
    height: 80px;
    padding: 22px 0;
    text-align: center;
    color: #4D4D4D;

    p {
      font-size: 0.9em;
      margin-bottom: 5px;
      margin-top: 0;
    }
  }
</style>

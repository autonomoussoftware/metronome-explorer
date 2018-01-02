<template lang="pug">
  .input-group
    input.form-control(type="text", :value="filter", @input="updateFilter", placeholder="Filter by account...")
    span.clear(@click="clearFilter") &times;
</template>

<script>
export default {
  props: {
    filter: { type: String, required: true }
  },

  methods: {
    clearFilter () {
      this.$emit('clear')
    },

    updateFilter (e) {
      this.$emit('update:filter', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  input.form-control, input.form-control:focus {
    border: none;
    border-bottom: 2px solid #525252;
    color: #000;
    box-shadow: none;
  }
</style>

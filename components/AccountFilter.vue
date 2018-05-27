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
      this.$emit('update:filter', '')
    },

    updateFilter (e) {
      this.$emit('update:filter', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  input.form-control,
  input.form-control:focus {
    border: none;
    border-bottom: 2px solid #525252;
    color: #000;
    box-shadow: none;
  }

  .clear {
    margin-left: 0;
    border-bottom: 2px solid #525252;
    cursor: pointer;
    font-size: 1.5em;
  }
</style>

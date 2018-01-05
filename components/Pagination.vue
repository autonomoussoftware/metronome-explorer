<template lang="pug">
  .row.d-flex
      .col-sm-10.d-flex.justify-content-start
        nav(v-if="totalCount")
          ul.pagination
            li.page-item
              a.btn(@click="previousPage", :class="{ disabled: hasEnded }")
                span(aria-hidden="true") Previous
            li.page-item
              a.btn( @click="nextPage", :class="{ disabled: skip === 0 }")
                span(aria-hidden="true") Next
      .col-sm-2.text-right
        small(v-if="totalCount")
          | Showing&nbsp;
          b {{ skip + 1 }}
          | -
          b {{ pageCount < limit ? pageCount + skip : limit + skip }}
          | &nbsp;of&nbsp;
          b {{ totalCount }}
</template>

<script>
export default {
  props: {
    skip: { type: Number, required: true },
    limit: { type: Number, required: true },
    hasEnded: { type: Boolean, required: true },
    totalCount: { type: Number, defult: 0 },
    pageCount: { type: Number, defult: 0 }
  },

  methods: {
    previousPage () {
      this.$emit('previous-page')
    },

    nextPage () {
      this.$emit('next-page')
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  .btn {
    background: #EDEDED;
    margin-left: 5px;
    border: none;
    padding: 5px 15px;
    color: #7e61f8;
    text-transform: none;
    font-weight: 700;
  }
}
</style>


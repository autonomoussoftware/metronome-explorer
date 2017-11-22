<template lang="pug">
  img(:src="`~/assets/svg/${id}.svg`")
</template>

<script>
export default {
  props: {
    id: { type: String }
  }
}
</script>


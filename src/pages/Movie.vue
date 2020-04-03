<template>
  <div>{{ movie }}</div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>

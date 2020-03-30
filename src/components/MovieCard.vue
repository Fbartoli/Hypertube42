<template>
  <div>
    <h4>{{ title }}</h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Movie title"
    };
  }
};
</script>

<style lang="scss" scoped>
h4 {
  color: green;
}
</style>

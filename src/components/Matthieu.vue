<template>
  <p>test</p>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      token: 'App/storeUsername',
    }),
  },
}
</script>

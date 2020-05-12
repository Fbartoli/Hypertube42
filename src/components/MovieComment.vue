<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select :value="value" @submit.prevent="sendCom" v-bind="$attrs"> </select>
    <label v-if="label">{{ label }}</label>
    <input :type="type" :value="value" @input="updateValue" v-bind="$attrs" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import { mapActions } from 'vuex'

export default {
  props: {
    username: {
      type: String,
      // required: true
      // for test purposes:
      required: false,
      default: 'component_default_username',
    },
    token: {
      type: String,
      required: false,
      default: 'component_default_token',
    },
  },
  methods: {
    sendCom(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>

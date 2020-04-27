<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div class="headline">This is {{ userInfo.username }}</div>
        <span class="red--text">desription</span>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn>text</v-btn>
      <v-btn color="primary">text</v-btn>
      <v-spacer></v-spacer>
      <v-btn> </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text>
        hidden text
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
    username: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>

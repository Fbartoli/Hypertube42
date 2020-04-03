<template>
  <div>
    <form @submit.prevent="register">
      <BaseInput
        label="Name"
        type="password"
        placeholder="Name"
        v-model="name"
      />

      <label for="email">
        Email:
      </label>
      <input v-model="email" type="email" name="email" value />

      <label for="password">
        Password:
      </label>
      <input v-model="password" type="password" name value />

      <button type="submit" name="button">
        Register
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      name: "",
      email: ""
    };
  }
};
</script>

<style lang="scss" scoped></style>

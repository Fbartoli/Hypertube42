<template>
  <v-form class="center">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="username"
            outlined
            clearable
            color="red"
            label="Username"
            type="text"
          >
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ $t("username") }}
              </v-tooltip>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            outlined
            clearable
            color="red"
            label="Password"
            type="Password"
          >
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ $t("Password") }}
              </v-tooltip>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <template>
        <v-btn
          @click="setEmail('email')"
          :to="{ name: 'register', params: { email } }"
          x-large
          color="red"
          style="top: -18px"
          >{{ $t("register") }}</v-btn
        >
      </template>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  }
};
</script>

<style scoped></style>

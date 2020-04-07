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
                {{ $t("password") }}
              </v-tooltip>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <template>
        <v-btn
          @click="login({ username, password })"
          x-large
          color="red"
          style="top: -18px"
          >{{ $t("login") }}</v-btn
        >
      </template>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      token: ""
    };
  },
  methods: { ...mapActions("App", ["login"]) }
};
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "username": "Username",
    "password": "Password",
    "login":"Log in"
  },
  "fr": {
    "username": "Nom d'utilisateur",
    "password": "Mot de passe",
    "login":"Connexion"
  }
}
</i18n>

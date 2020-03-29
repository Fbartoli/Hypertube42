<template>
  <v-form class="center">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field outlined clearable label="Email" type="text">
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ $t("email") }}
              </v-tooltip>
            </template>
            <template v-slot:append-outer>
              <v-btn x-large color="primary" style="top: -18px">{{
                $t("register")
              }}</v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState({
      langs: state => state.App.langs,
      email: state => state.App.userInfo.email
    })
  }
};
</script>
<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
<i18n>
{
  "en": {
    "email": "Email address",
    "register": "Register now !"
  },
  "fr": {
    "email": "Adresse email",
    "register": "Inscris toi !"
  }
}
</i18n>
